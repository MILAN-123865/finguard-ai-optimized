import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from './data/courses';
import { 
  ArrowLeft, CheckCircle2, Award, Download, BookOpen, 
  ExternalLink, RefreshCw, FileText, Play, ChevronRight, ChevronLeft,
  ChevronDown, Sparkles, Home, Layers, Clock, Menu, X, Check,
  AlertTriangle, ShieldAlert, MonitorPlay, Loader2
} from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { getAcademyProgress, toggleLessonCompletion, saveAcademyProgress } from './utils/progressStorage';
import { ThumbnailImage, extractYouTubeId } from './utils/thumbnailUtils';

export const CourseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'notes' | 'overview'>('notes');
  const [isBreadcrumbDropdownOpen, setIsBreadcrumbDropdownOpen] = useState(false);
  const [isMobileSyllabusOpen, setIsMobileSyllabusOpen] = useState(false);

  // Video playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const course = courses.find(c => c.id === id);

  // Close breadcrumb dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBreadcrumbDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load saved progress on mount or course change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (course) {
      const progressMap = getAcademyProgress();
      const saved = progressMap[course.id];
      if (saved?.completedLessonIds) {
        setCompletedLessonIds(saved.completedLessonIds);
      }
      if (saved?.quizPassed) {
        setShowCertificate(true);
      }
    }
  }, [id, course]);

  // Reset playback and fallback state when changing lesson
  useEffect(() => {
    setUseFallback(false);
    setIsPlaying(false);
    setIsIframeLoading(false);
    setHasPlaybackError(false);
  }, [activeLesson]);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
        <p className="text-sm text-[#bac9cc] mb-6">The requested cybersecurity course could not be located.</p>
        <button 
          onClick={() => navigate('/learning')} 
          className="px-6 py-2.5 rounded-xl bg-[#00daf3] text-[#00363d] font-bold text-xs hover:brightness-110 transition-all"
        >
          Return to Academy
        </button>
      </div>
    );
  }

  const currentLesson = course.lessons[activeLesson] || course.lessons[0];

  // Format clean embed URL
  const formatEmbedUrl = (rawUrl: string, autoPlay: boolean = false) => {
    if (!rawUrl) return '';
    const videoId = extractYouTubeId(rawUrl);
    const autoPlayParam = autoPlay ? '1' : '0';
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1&autoplay=${autoPlayParam}`;
  };

  const currentRawVideoUrl = useFallback && currentLesson.fallbackVideoUrl 
    ? currentLesson.fallbackVideoUrl 
    : currentLesson.videoUrl;

  const currentVideoEmbedUrl = formatEmbedUrl(currentRawVideoUrl, true);

  const getWatchOnYouTubeUrl = (url: string) => {
    const videoId = extractYouTubeId(url);
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  const handleStartPlay = () => {
    setIsPlaying(true);
    setIsIframeLoading(true);
    setHasPlaybackError(false);
  };

  const handleSwitchStream = () => {
    const nextFallback = !useFallback;
    setUseFallback(nextFallback);
    setIsPlaying(true);
    setIsIframeLoading(true);
    setHasPlaybackError(false);
  };

  const isCurrentLessonCompleted = completedLessonIds.includes(currentLesson.id);

  const handleToggleLessonComplete = () => {
    const { isCompleted } = toggleLessonCompletion(course.id, currentLesson.id);
    if (isCompleted) {
      setCompletedLessonIds(prev => Array.from(new Set([...prev, currentLesson.id])));
    } else {
      setCompletedLessonIds(prev => prev.filter(lId => lId !== currentLesson.id));
    }
  };

  const handleQuizSubmit = () => {
    const allCorrect = course.quiz.every(q => quizAnswers[q.id] === q.correctAnswerIndex);
    if (allCorrect) {
      saveAcademyProgress(course.id, { quizPassed: true });
      setShowCertificate(true);
    } else {
      alert("Some answers are incorrect. Please review the lesson notes and try again!");
    }
  };

  const courseProgressPercentage = Math.min(
    100, 
    Math.round((completedLessonIds.length / course.lessons.length) * 100)
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20 relative">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#00daf3] origin-left z-50 shadow-[0_0_10px_#00daf3]" 
        style={{ scaleX }} 
      />

      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb Navigation" className="mb-6 bg-[#0a0d1c] p-3 sm:p-4 rounded-2xl border border-white/10 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono overflow-x-auto custom-scrollbar py-0.5">
          <button 
            onClick={() => navigate('/learning')}
            className="flex items-center gap-1.5 text-[#bac9cc] hover:text-[#00daf3] transition-colors shrink-0 font-medium hover:bg-white/5 px-2 py-1 rounded-lg"
            title="Return to Academy Catalog"
          >
            <Home size={14} className="text-[#00daf3]" />
            <span>Academy</span>
          </button>
          
          <ChevronRight size={14} className="text-white/30 shrink-0" />
          
          <span className="text-[#bac9cc] shrink-0 font-medium hidden sm:inline px-1">
            {course.category}
          </span>
          
          <ChevronRight size={14} className="text-white/30 shrink-0 hidden sm:inline" />
          
          <span className="text-white font-bold shrink-0 max-w-[140px] sm:max-w-[200px] lg:max-w-[260px] truncate">
            {course.title}
          </span>
          
          <ChevronRight size={14} className="text-[#00daf3] shrink-0" />

          {/* Breadcrumb Lesson Selector Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsBreadcrumbDropdownOpen(!isBreadcrumbDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#00daf3]/10 hover:bg-[#00daf3]/20 border border-[#00daf3]/40 text-[#00daf3] px-2.5 py-1 rounded-lg font-bold text-xs transition-all shadow-[0_0_10px_rgba(0,218,243,0.15)]"
              aria-expanded={isBreadcrumbDropdownOpen}
              title="Click to jump to another lesson"
            >
              <span className="truncate max-w-[130px] sm:max-w-[200px]">
                Lesson {activeLesson + 1}: {currentLesson.title}
              </span>
              <ChevronDown size={14} className={`transition-transform duration-200 shrink-0 ${isBreadcrumbDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isBreadcrumbDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 sm:w-80 bg-[#0c1024] border border-[#00daf3]/30 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 p-2 overflow-hidden backdrop-blur-xl"
                >
                  <div className="p-2 border-b border-white/10 flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono font-bold text-[#00daf3] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={13} /> Switch Lesson
                    </span>
                    <span className="text-[10px] text-[#bac9cc] font-mono">
                      {completedLessonIds.length}/{course.lessons.length} Completed
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1 custom-scrollbar pr-1">
                    {course.lessons.map((lesson, idx) => {
                      const isActive = activeLesson === idx;
                      const isCompleted = completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveLesson(idx);
                            setIsBreadcrumbDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                            isActive
                              ? 'bg-[#00daf3]/20 border border-[#00daf3]/50 text-white font-bold'
                              : 'hover:bg-white/5 text-[#bac9cc] border border-transparent'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                            isCompleted 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                              : isActive 
                                ? 'bg-[#00daf3] text-[#0a0d1a]' 
                                : 'bg-white/10 text-white/60'
                          }`}>
                            {isCompleted ? <Check size={12} /> : idx + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`text-xs truncate ${isActive ? 'text-white font-bold' : 'text-[#bac9cc]'}`}>
                              {lesson.title}
                            </p>
                            <p className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                              <Clock size={10} /> {lesson.duration}
                            </p>
                          </div>

                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] shrink-0 animate-ping" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Prev / Next Buttons & Mobile Syllabus Toggle in Navigation Bar */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveLesson(prev => Math.max(0, prev - 1))}
              disabled={activeLesson === 0}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#bac9cc] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Previous Lesson"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono font-bold text-white px-2">
              {activeLesson + 1} / {course.lessons.length}
            </span>
            <button
              onClick={() => setActiveLesson(prev => Math.min(course.lessons.length - 1, prev + 1))}
              disabled={activeLesson === course.lessons.length - 1}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#bac9cc] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Next Lesson"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Mobile Syllabus Toggle Drawer Button */}
          <button
            onClick={() => setIsMobileSyllabusOpen(!isMobileSyllabusOpen)}
            className="lg:hidden flex items-center gap-1.5 bg-[#00daf3]/10 hover:bg-[#00daf3]/20 border border-[#00daf3]/30 text-[#00daf3] px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all"
          >
            <Menu size={16} />
            <span>Syllabus</span>
          </button>
        </div>
      </nav>

      {/* Mobile Syllabus Drawer Overlay */}
      <AnimatePresence>
        {isMobileSyllabusOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] lg:hidden flex justify-end"
            onClick={() => setIsMobileSyllabusOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-sm bg-[#0a0d1c] border-l border-[#00daf3]/30 h-full p-6 overflow-y-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen size={20} className="text-[#00daf3]" />
                    <h3 className="font-bold text-white text-base">Course Syllabus</h3>
                  </div>
                  <button
                    onClick={() => setIsMobileSyllabusOpen(false)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs text-[#bac9cc] font-mono mb-2 uppercase">
                    <span>Course Progress</span>
                    <span className="text-[#00daf3] font-bold">{courseProgressPercentage}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00daf3] to-[#6001d1] rounded-full transition-all duration-300" 
                      style={{ width: `${courseProgressPercentage}%` }} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {course.lessons.map((lesson, idx) => {
                    const isActive = activeLesson === idx;
                    const isCompleted = completedLessonIds.includes(lesson.id);

                    return (
                      <button 
                        key={lesson.id}
                        onClick={() => {
                          setActiveLesson(idx);
                          setIsMobileSyllabusOpen(false);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center gap-3 border ${
                          isActive 
                            ? 'bg-[#00daf3]/15 border-[#00daf3]/50 shadow-[0_0_12px_rgba(0,218,243,0.15)] text-white' 
                            : 'bg-white/5 border-transparent hover:bg-white/10 text-[#bac9cc]'
                        }`}
                      >
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border text-xs font-bold ${
                            isCompleted 
                              ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                              : isActive 
                                ? 'bg-[#00daf3] border-[#00daf3] text-[#0a0d1a]' 
                                : 'bg-transparent border-white/20 text-[#bac9cc]'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${isActive || isCompleted ? 'text-white' : 'text-[#bac9cc]'}`}>
                            {lesson.title}
                          </p>
                          <p className="text-[10px] text-[#bac9cc] font-mono mt-0.5">{lesson.duration}</p>
                        </div>

                        {isActive && <ChevronRight size={16} className="text-[#00daf3] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <button
                  onClick={() => {
                    setIsMobileSyllabusOpen(false);
                    navigate('/learning');
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} /> Return to Academy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area (Video Player & Lesson Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Embedded YouTube Video Container */}
          <div className="w-full aspect-video rounded-3xl bg-[#0a0d1a] border border-white/10 relative overflow-hidden shadow-2xl flex flex-col group">
            
            {!isPlaying ? (
              /* Pre-play Thumbnail State with Play Overlay */
              <div 
                onClick={handleStartPlay}
                className="w-full h-full relative cursor-pointer group flex items-center justify-center overflow-hidden"
              >
                <ThumbnailImage
                  videoUrl={currentRawVideoUrl}
                  thumbnailUrl={course.thumbnail}
                  alt={currentLesson.title}
                  fallbackCategory={course.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1a] via-black/40 to-black/20 group-hover:via-black/20 transition-all" />

                {/* Animated Play Button */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-[#00daf3] text-[#0a0d1a] flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_40px_rgba(0,218,243,0.8)] border-4 border-white/20">
                    <Play size={36} className="fill-[#0a0d1a] stroke-none ml-1.5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-black/60 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-lg flex items-center gap-2">
                    <MonitorPlay size={14} className="text-[#00daf3]" /> Click to Watch Lesson ({currentLesson.duration})
                  </span>
                </div>

                {/* Lesson Title & Duration Overlay at Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10 pointer-events-none">
                  <div>
                    <span className="px-2.5 py-1 rounded-md bg-[#00daf3]/20 border border-[#00daf3]/40 text-[#00daf3] font-mono text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                      Lesson {activeLesson + 1}
                    </span>
                    <h2 className="text-lg font-bold text-white drop-shadow-md truncate max-w-lg">
                      {currentLesson.title}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              /* Active Embedded YouTube Player */
              <div className="w-full h-full relative bg-black">
                
                {/* Skeleton Loader while Iframe is Initializing */}
                {isIframeLoading && (
                  <div className="absolute inset-0 z-20 bg-[#0a0d1a] flex flex-col items-center justify-center gap-3 animate-pulse">
                    <Loader2 size={36} className="text-[#00daf3] animate-spin" />
                    <span className="text-xs font-mono text-[#bac9cc]">Initializing HD Security Stream...</span>
                  </div>
                )}

                {hasPlaybackError ? (
                  /* Fallback Error Recovery Panel */
                  <div className="w-full h-full bg-[#0a0d1a] p-8 flex flex-col items-center justify-center text-center gap-4 border border-amber-500/30">
                    <AlertTriangle size={48} className="text-amber-400" />
                    <div>
                      <h3 className="text-base font-bold text-white">Playback Error Detected</h3>
                      <p className="text-xs text-[#bac9cc] mt-1 max-w-md">
                        The primary YouTube stream encountered a restriction. Click below to automatically switch to our verified backup video server.
                      </p>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={handleSwitchStream}
                        className="px-5 py-2.5 rounded-xl bg-[#00daf3] text-[#00363d] font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,218,243,0.3)]"
                      >
                        <RefreshCw size={14} /> Switch to Backup Video Stream
                      </button>
                      <a
                        href={getWatchOnYouTubeUrl(currentRawVideoUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-all flex items-center gap-2"
                      >
                        <ExternalLink size={14} /> Open in YouTube
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    key={`${currentLesson.id}-${useFallback ? 'fallback' : 'primary'}`}
                    src={currentVideoEmbedUrl}
                    title={currentLesson.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => setIsIframeLoading(false)}
                    onError={() => setHasPlaybackError(true)}
                  />
                )}
              </div>
            )}

          </div>

          {/* Video Player Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0d1c] p-3 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleLessonComplete}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isCurrentLessonCompleted
                    ? 'bg-green-500/20 border-green-500/40 text-green-400'
                    : 'bg-[#00daf3]/20 border-[#00daf3]/40 text-[#00daf3] hover:bg-[#00daf3]/30'
                }`}
              >
                <CheckCircle2 size={16} />
                <span>{isCurrentLessonCompleted ? 'Completed' : 'Mark as Complete'}</span>
              </button>

              <button
                onClick={handleSwitchStream}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
                  useFallback
                    ? 'bg-[#00daf3]/20 border-[#00daf3]/50 text-[#00daf3] font-bold'
                    : 'bg-white/5 border-white/10 text-[#bac9cc] hover:text-white hover:bg-white/10'
                }`}
                title="Switch to backup video server if video fails to play"
              >
                <RefreshCw size={14} className={useFallback ? 'text-[#00daf3] animate-spin' : ''} />
                <span>{useFallback ? 'Using Backup Stream' : 'Switch Stream'}</span>
              </button>
            </div>

            <a
              href={getWatchOnYouTubeUrl(currentRawVideoUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all ml-auto"
            >
              <span>Watch on YouTube</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Active Lesson Header & Details */}
          <div className="bg-[#0f1321] p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-[#00daf3]/10 text-[#00daf3] font-mono text-[10px] uppercase font-bold tracking-wider mr-2">
                  {course.category}
                </span>
                <span className="text-xs text-[#bac9cc] font-mono">
                  Instructor: <span className="text-white font-medium">{course.instructor}</span>
                </span>
              </div>
              <div className="text-xs text-[#bac9cc] font-mono flex items-center gap-1.5">
                <Clock size={14} className="text-[#00daf3]" />
                Duration: <span className="text-white font-bold">{currentLesson.duration}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-[240px]">
                <span className="text-xs font-mono text-[#00daf3] uppercase tracking-wider font-bold block mb-1">
                  Lesson {activeLesson + 1} of {course.lessons.length}
                </span>
                <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
                  {currentLesson.title}
                </h1>
              </div>

              {/* Prev / Next Lesson Navigation Buttons */}
              <div className="flex items-center gap-2 shrink-0 bg-white/5 p-1.5 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveLesson(prev => Math.max(0, prev - 1))}
                  disabled={activeLesson === 0}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#00daf3]/20 hover:border-[#00daf3]/40 border border-white/10 text-xs font-bold text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Previous Lesson"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  onClick={() => setActiveLesson(prev => Math.min(course.lessons.length - 1, prev + 1))}
                  disabled={activeLesson === course.lessons.length - 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#00daf3]/20 hover:border-[#00daf3]/40 border border-white/10 text-xs font-bold text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Next Lesson"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-[#bac9cc] leading-relaxed">
              {currentLesson.description}
            </p>

            {/* Navigation Tabs for Lesson Content */}
            <div className="flex gap-2 border-t border-white/10 pt-4">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeTab === 'notes'
                    ? 'bg-[#00daf3]/20 border-[#00daf3]/40 text-[#00daf3]'
                    : 'bg-white/5 border-white/10 text-[#bac9cc] hover:text-white'
                }`}
              >
                <FileText size={14} /> Study Notes & Key Takeaways
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeTab === 'overview'
                    ? 'bg-[#00daf3]/20 border-[#00daf3]/40 text-[#00daf3]'
                    : 'bg-white/5 border-white/10 text-[#bac9cc] hover:text-white'
                }`}
              >
                <BookOpen size={14} /> Course Overview
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'notes' ? (
              <div className="bg-[#0a0d1a] p-5 rounded-2xl border border-white/5 space-y-3">
                <h3 className="text-xs font-bold font-mono text-[#00daf3] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} /> Essential Study Notes
                </h3>
                <div className="text-xs text-[#bac9cc] space-y-2 whitespace-pre-line leading-relaxed font-sans">
                  {currentLesson.notes}
                </div>
              </div>
            ) : (
              <div className="bg-[#0a0d1a] p-5 rounded-2xl border border-white/5 space-y-2">
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">About {course.title}</h3>
                <p className="text-xs text-[#bac9cc] leading-relaxed">{course.description}</p>
              </div>
            )}
          </div>

          {/* Interactive Quiz Trigger */}
          {!showCertificate && (
            <div className="p-6 rounded-3xl bg-[#00daf3]/5 border border-[#00daf3]/20 text-center">
              <BookOpen size={32} className="text-[#00daf3] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Ready to test your knowledge?</h3>
              <p className="text-xs text-[#bac9cc] mb-4">Complete the module quiz to earn your official certificate.</p>
              <button 
                onClick={() => setShowQuiz(!showQuiz)}
                className="px-6 py-2.5 rounded-xl bg-[#00daf3] text-[#00363d] font-bold text-xs hover:brightness-110 transition-colors shadow-[0_0_15px_rgba(0,218,243,0.3)]"
              >
                {showQuiz ? 'Hide Quiz' : 'Start Module Quiz'}
              </button>
            </div>
          )}

          {/* Quiz Section */}
          <AnimatePresence>
            {showQuiz && !showCertificate && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 pt-2"
              >
                {course.quiz.map((q, i) => (
                  <div key={q.id} className="p-6 rounded-2xl bg-[#0a0d1c] border border-white/10">
                    <h4 className="font-bold text-white mb-4 text-sm">{i + 1}. {q.question}</h4>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <label 
                          key={oIdx} 
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                            quizAnswers[q.id] === oIdx ? 'bg-[#00daf3]/10 border-[#00daf3]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name={q.id} 
                            checked={quizAnswers[q.id] === oIdx} 
                            onChange={() => setQuizAnswers(prev => ({...prev, [q.id]: oIdx}))}
                            className="hidden" 
                          />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${quizAnswers[q.id] === oIdx ? 'border-[#00daf3]' : 'border-white/30'}`}>
                            {quizAnswers[q.id] === oIdx && <div className="w-2 h-2 rounded-full bg-[#00daf3]" />}
                          </div>
                          <span className="text-xs text-[#bac9cc]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < course.quiz.length}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00daf3] to-[#00b4d8] text-[#00363d] font-bold text-xs hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,218,243,0.2)]"
                >
                  Submit Quiz Answers
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Certificate UI (Unlocked upon passing) */}
          <AnimatePresence>
            {showCertificate && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#0f1321] to-[#1a1f36] border-2 border-amber-400/30 relative overflow-hidden text-center shadow-[0_0_50px_rgba(251,191,36,0.15)]"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
                
                <motion.div 
                  initial={{ rotate: -180, scale: 0 }} 
                  animate={{ rotate: 0, scale: 1 }} 
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 mx-auto bg-amber-400/20 rounded-full border border-amber-400/50 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                >
                  <Award size={40} />
                </motion.div>
                
                <h2 className="text-2xl font-black text-white tracking-tight mb-2 uppercase">Certificate of Completion</h2>
                <p className="text-xs text-[#bac9cc] mb-4">This certifies that you have successfully mastered the module:</p>
                <h3 className="text-lg font-bold text-amber-400 mb-6">"{course.title}"</h3>
                
                <button 
                  onClick={() => alert("Certificate generated successfully! (PDF Download Triggered)")}
                  className="mx-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-amber-950 font-bold hover:bg-amber-300 transition-colors text-xs"
                >
                  <Download size={16} /> Download Certificate (PDF)
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Sidebar (Syllabus & Lesson Navigation with Thumbnails) */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10 sticky top-24 bg-[#0a0d1c]">
            <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>Course Syllabus</span>
              <span className="text-xs text-[#bac9cc] font-mono">{course.lessons.length} Lessons</span>
            </h3>
            
            <div className="mb-6">
              <div className="flex justify-between text-[10px] text-[#bac9cc] font-mono mb-2 uppercase">
                <span>Course Progress</span>
                <span className="text-[#00daf3] font-bold">{courseProgressPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00daf3] to-[#6001d1] rounded-full transition-all duration-300" 
                  style={{ width: `${courseProgressPercentage}%` }} 
                />
              </div>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
              {course.lessons.map((lesson, idx) => {
                const isActive = activeLesson === idx;
                const isCompleted = completedLessonIds.includes(lesson.id);
                const lessonVideoUrl = lesson.videoUrl;
                
                return (
                  <button 
                    key={lesson.id}
                    onClick={() => setActiveLesson(idx)}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-center gap-3 border group ${
                      isActive 
                        ? 'bg-[#00daf3]/15 border-[#00daf3]/50 shadow-[0_0_12px_rgba(0,218,243,0.15)] text-white' 
                        : 'bg-white/5 border-transparent hover:bg-white/10 text-[#bac9cc]'
                    }`}
                  >
                    {/* Lesson Thumbnail Preview */}
                    <div className="w-16 h-11 rounded-lg bg-[#0a0d1a] border border-white/10 relative overflow-hidden shrink-0">
                      <ThumbnailImage
                        videoUrl={lessonVideoUrl}
                        alt={lesson.title}
                        fallbackCategory={course.category}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className={`absolute inset-0 flex items-center justify-center ${isActive ? 'text-[#00daf3]' : 'text-white/80'}`}>
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-green-400 bg-black/60 rounded-full" />
                        ) : (
                          <Play size={12} className="fill-current stroke-none ml-0.5" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isActive || isCompleted ? 'text-white' : 'text-[#bac9cc]'}`}>
                        {idx + 1}. {lesson.title}
                      </p>
                      <p className="text-[10px] text-[#bac9cc] font-mono mt-0.5">{lesson.duration}</p>
                    </div>

                    {isActive && <ChevronRight size={16} className="text-[#00daf3] shrink-0 animate-pulse" />}
                  </button>
                );
              })}
            </div>
            
            {/* Up Next Button / Preview */}
            {activeLesson < course.lessons.length - 1 && (
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-[#bac9cc] font-mono uppercase">Up Next</span>
                <button
                  onClick={() => setActiveLesson(activeLesson + 1)}
                  className="flex items-center gap-1 text-xs text-[#00daf3] hover:underline font-bold"
                >
                  <span>Lesson {activeLesson + 2}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
