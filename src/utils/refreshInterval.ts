export const READING_SPEED_WPM = 220; // Average words a person can read per minute.
export const MIN_REFRESH_INTERVAL = 10000; // Shortest allowed interval, in milliseconds.

const MS_PER_MINUTE = 60 * 1000;

export const countWords = (value: unknown): number => {
  if (typeof value === "string") {
    return value.split(/\s+/u).filter(Boolean).length;
  }
  if (Array.isArray(value)) {
    return value.reduce<number>((sum, item) => sum + countWords(item), 0);
  }
  if (value instanceof Object) {
    return Object.values(value).reduce<number>(
      (sum, item) => sum + countWords(item),
      0,
    );
  }
  return 0;
};

// Interval between refreshes: the time a reader needs to read the payload.
export const getRefreshInterval = (payload: unknown): number =>
  Math.max(
    MIN_REFRESH_INTERVAL,
    (countWords(payload) / READING_SPEED_WPM) * MS_PER_MINUTE,
  );
