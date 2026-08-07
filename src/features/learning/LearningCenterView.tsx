import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, PlayCircle, Play, Award, Shield, Medal, CheckCircle2, BookOpen, Clock } from 'lucide-react';
import { courses } from './data/courses';
import { getAcademyProgress } from './utils/progressStorage';
import { ThumbnailImage, extractYouTubeId } from './utils/thumbnailUtils';

export const LearningCenterView: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [progressMap, setProgressMap] = useState<Record<string, { completedLessonIds: string[]; quizPassed?: boolean }>>({});
  const [failedCourseIds, setFailedCourseIds] = useState<Set<string>>(new Set());

  const handleThumbnailError = useCallback((courseId: string) => {
    setFailedCourseIds(prev => {
      if (prev.has(courseId)) return prev;
      const next = new Set(prev);
      next.add(courseId);
      return next;
    });
  }, []);

  useEffect(() => {
    const p = getAcademyProgress();
    setProgressMap(p);
  }, []);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(courses.map(c => c.category)))];
  }, []);

  const coursesWithProgress = useMemo(() => {
    return courses
      .filter(course => {
        const hasValidThumbnailStr = Boolean(course.thumbnail && typeof course.thumbnail === 'string' && course.thumbnail.trim().length > 0);
        const primaryVidUrl = course.lessons[0]?.videoUrl || course.videoUrl || '';
        const videoId = extractYouTubeId(primaryVidUrl);
        const hasValidVideo = Boolean(videoId && videoId.length === 11);
        return hasValidThumbnailStr || hasValidVideo;
      })
      .map(course => {
        const saved = progressMap[course.id];
        const completedCount = saved?.completedLessonIds?.length || 0;
        const calculatedProgress = course.lessons.length > 0 
          ? Math.min(100, Math.round((completedCount / course.lessons.length) * 100))
          : 0;
        
        const primaryVideoUrl = course.lessons[0]?.videoUrl || course.videoUrl || '';

        return {
          ...course,
          primaryVideoUrl,
          progress: calculatedProgress,
          isContinueLearning: calculatedProgress > 0 && calculatedProgress < 100,
          completedCount
        };
      });
  }, [progressMap]);

  const filteredCourses = useMemo(() => {
    let result = coursesWithProgress.filter(c => !failedCourseIds.has(c.id));

    if (activeCategory !== 'All') {
      result = result.filter(c => c.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(c => {
        const titleMatch = c.title.toLowerCase().includes(q);
        const descMatch = c.description.toLowerCase().includes(q);
        const categoryMatch = c.category.toLowerCase().includes(q);
        return titleMatch || descMatch || categoryMatch;
      });
    }

    return result;
  }, [searchQuery, activeCategory, coursesWithProgress, failedCourseIds]);

  const continueLearningCourses = useMemo(() => {
    return coursesWithProgress.filter(c => c.progress > 0 && c.progress < 100 && !failedCourseIds.has(c.id));
  }, [coursesWithProgress, failedCourseIds]);

  const completedCountTotal = useMemo(() => {
    return coursesWithProgress.filter(c => c.progress === 100 && !failedCourseIds.has(c.id)).length;
  }, [coursesWithProgress, failedCourseIds]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Badges */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] text-xs font-bold mb-2">
            <GraduationCap size={14} />
            <span>FinGuard Academy</span>
          </div>
          <h1 className="text-3xl font-bold text-[#111827] tracking-tight">Security Learning Center</h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Master digital defense mechanisms through video lessons and interactive quizzes.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-[16px] bg-white border border-[#E4E7E5] shadow-xs flex items-center gap-2">
            <Medal size={20} className="text-[#F59E0B]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-[#64748B] font-bold">Level</span>
              <span className="text-sm font-bold text-[#111827]">
                {completedCountTotal >= 5 ? 'Security Expert' : completedCountTotal >= 2 ? 'Defender' : 'Novice'}
              </span>
            </div>
          </div>
          <div className="px-4 py-2 rounded-[16px] bg-white border border-[#E4E7E5] shadow-xs flex items-center gap-2">
            <Award size={20} className="text-[#11875D]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-[#64748B] font-bold">Certificates</span>
              <span className="text-sm font-bold text-[#111827]">{completedCountTotal} Earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      {continueLearningCourses.length > 0 && !searchQuery && activeCategory === 'All' && (
        <div>
          <h2 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-[#11875D]" /> Continue Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueLearningCourses.map(course => (
              <div 
                key={course.id}
                onClick={() => navigate(`/learning/${course.id}`)}
                className="bg-white rounded-[20px] p-4 border border-[#E4E7E5] hover:shadow-md transition-shadow cursor-pointer flex gap-4 items-center group shadow-xs"
              >
                <div className="w-28 aspect-video rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5] flex items-center justify-center shrink-0 relative overflow-hidden">
                  <ThumbnailImage
                    videoUrl={course.primaryVideoUrl}
                    thumbnailUrl={course.thumbnail}
                    alt={course.title}
                    fallbackCategory={course.category}
                    className="w-full h-full object-cover"
                    onErrorAll={() => handleThumbnailError(course.id)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#111827] truncate group-hover:text-[#11875D] transition-colors">{course.title}</h3>
                  <p className="text-xs text-[#64748B] mb-2">{course.progress}% Complete ({course.completedCount}/{course.lessons.length} lessons)</p>
                  <div className="h-1.5 w-full bg-[#F8FAFC] rounded-full overflow-hidden border border-[#E4E7E5]">
                    <div className="h-full bg-[#11875D] rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Categories */}
      <div className="flex flex-col xl:flex-row gap-4 bg-white p-4 rounded-[20px] border border-[#E4E7E5] shadow-xs">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3.5 top-3.5 text-[#64748B] w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, lessons, topics..."
            className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[16px] py-2.5 pl-10 pr-10 text-xs text-[#111827] placeholder-[#64748B] focus:border-[#11875D] focus:outline-none transition-colors"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-[12px] text-xs font-bold transition-all border cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-[#11875D] border-[#11875D] text-white shadow-2xs' 
                  : 'bg-[#F8FAFC] border-[#E4E7E5] text-[#64748B] hover:text-[#111827] hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-lg font-bold text-[#111827] border-b border-[#E4E7E5] pb-2 flex items-center justify-between">
        <span>Recommended Courses</span>
        <span className="text-xs text-[#64748B]">Showing {filteredCourses.length} courses</span>
      </h2>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-[20px] p-12 flex flex-col items-center justify-center text-center border border-[#E4E7E5] shadow-xs">
          <Shield size={48} className="text-[#64748B] mb-4" />
          <h3 className="text-lg font-bold text-[#111827]">No courses found</h3>
          <p className="text-xs text-[#64748B] mt-1 max-w-md">
            We couldn't find any courses matching your search or active filters.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-4 px-5 py-2 rounded-[12px] bg-[#DDF2EA] text-[#11875D] text-xs font-bold transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              onClick={() => navigate(`/learning/${course.id}`)}
              className="bg-white rounded-[20px] overflow-hidden border border-[#E4E7E5] hover:shadow-md transition-shadow cursor-pointer group flex flex-col h-full shadow-xs"
            >
              {/* Media Thumbnail */}
              <div className="w-full aspect-video bg-[#F8FAFC] relative flex items-center justify-center overflow-hidden border-b border-[#E4E7E5] shrink-0">
                <ThumbnailImage
                  videoUrl={course.primaryVideoUrl}
                  thumbnailUrl={course.thumbnail}
                  alt={course.title}
                  fallbackCategory={course.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onErrorAll={() => handleThumbnailError(course.id)}
                />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[8px] bg-white/90 border border-[#E4E7E5] text-[#111827] text-[10px] uppercase font-bold tracking-wider">
                  {course.category}
                </div>

                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#11875D] text-white flex items-center justify-center shadow-xs">
                  <Play size={16} className="fill-white ml-0.5" />
                </div>

                {course.progress === 100 && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-[8px] bg-[#10B981] text-white text-[10px] uppercase font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Completed
                  </div>
                )}

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-[8px] bg-white/90 border border-[#E4E7E5] text-[#111827] text-[10px] font-bold flex items-center gap-1">
                  <Clock size={11} /> {course.duration}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#111827] group-hover:text-[#11875D] transition-colors mb-2 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-xs text-[#64748B] line-clamp-2 mb-4 leading-relaxed font-normal">
                    {course.description}
                  </p>
                </div>

                <div>
                  {course.progress > 0 ? (
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] text-[#64748B] font-bold mb-1">
                        <span>Progress</span>
                        <span className="text-[#11875D]">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#F8FAFC] rounded-full overflow-hidden border border-[#E4E7E5]">
                        <div className="h-full bg-[#11875D] rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  ) : null}
                  
                  <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-3 border-t border-[#E4E7E5]">
                    <span className="flex items-center gap-1.5 font-semibold text-[#11875D]">
                      <PlayCircle size={14} /> {course.lessons.length} Lessons
                    </span>
                    <span className="font-semibold text-[#111827]">{course.instructor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
