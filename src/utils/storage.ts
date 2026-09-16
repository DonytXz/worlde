/**
 * Resilient localStorage helper functions with safe fallbacks.
 */

export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Graceful degradation when localStorage is blocked or quota exceeded
  }
}

export function getStorageString(key: string, defaultValue: string): string {
  try {
    return localStorage.getItem(key) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageString(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Graceful degradation
  }
}
