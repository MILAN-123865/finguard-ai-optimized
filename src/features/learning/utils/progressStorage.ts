const ACADEMY_PROGRESS_KEY = 'finguard_academy_progress_v2';

export interface CourseProgressData {
  completedLessonIds: string[];
  quizPassed?: boolean;
}

export const getAcademyProgress = (): Record<string, CourseProgressData> => {
  try {
    const saved = localStorage.getItem(ACADEMY_PROGRESS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse academy progress', e);
  }
  // Default seed for continue learning items if empty
  return {
    'cyber-awareness': { completedLessonIds: ['cyber-awareness-0', 'cyber-awareness-1'] },
    'senior-citizen-guide': { completedLessonIds: ['senior-citizen-guide-0', 'senior-citizen-guide-1', 'senior-citizen-guide-2'] }
  };
};

export const saveAcademyProgress = (courseId: string, data: Partial<CourseProgressData>) => {
  try {
    const current = getAcademyProgress();
    const existing = current[courseId] || { completedLessonIds: [] };
    current[courseId] = {
      ...existing,
      ...data,
      completedLessonIds: Array.from(new Set([...existing.completedLessonIds, ...(data.completedLessonIds || [])]))
    };
    localStorage.setItem(ACADEMY_PROGRESS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save academy progress', e);
  }
};

export const toggleLessonCompletion = (courseId: string, lessonId: string): { isCompleted: boolean; completedCount: number } => {
  try {
    const current = getAcademyProgress();
    const existing = current[courseId] || { completedLessonIds: [] };
    const set = new Set(existing.completedLessonIds);
    let isCompleted = false;
    
    if (set.has(lessonId)) {
      set.delete(lessonId);
      isCompleted = false;
    } else {
      set.add(lessonId);
      isCompleted = true;
    }
    
    const updatedList = Array.from(set);
    current[courseId] = {
      ...existing,
      completedLessonIds: updatedList
    };
    localStorage.setItem(ACADEMY_PROGRESS_KEY, JSON.stringify(current));
    return { isCompleted, completedCount: updatedList.length };
  } catch (e) {
    return { isCompleted: false, completedCount: 0 };
  }
};
