export interface CourseProgress {
  visited: string[];
  last?: { m: number; l: number };
}

const key = (courseId: string) => `apuntes:${courseId}`;

export function loadProgress(courseId: string): CourseProgress {
  try {
    const raw = globalThis.localStorage?.getItem(key(courseId));
    if (!raw) return { visited: [] };
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return {
      visited: Array.isArray(parsed.visited) ? parsed.visited.filter((v): v is string => typeof v === 'string') : [],
      last: parsed.last && Number.isInteger(parsed.last.m) && Number.isInteger(parsed.last.l) ? parsed.last : undefined,
    };
  } catch {
    return { visited: [] };
  }
}

export function saveProgress(courseId: string, progress: CourseProgress): void {
  try {
    globalThis.localStorage?.setItem(key(courseId), JSON.stringify(progress));
  } catch {
    return;
  }
}
