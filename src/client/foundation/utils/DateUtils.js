export const isBefore = (dateLeft, dateRight) => {
  const left = new Date(dateLeft).getTime();
  const right = new Date(dateRight).getTime();
  return left < right;
};

export const isAfter = (dateLeft, dateRight) => {
  const left = new Date(dateLeft).getTime();
  const right = new Date(dateRight).getTime();
  return left > right;
};

/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dl, dr) => {
  const dateLeft = new Date(dl);
  const dateRight = new Date(dr);
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth() &&
    dateLeft.getDate() === dateRight.getDate()
  );
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const date = new Date(ts);
  const h = date.getHours();
  const mm = `${date.getMinutes()}`.padStart(2, "0");
  return `${h}:${mm}`;
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  if (isBefore(closeAt, now)) {
    return "投票締切";
  }

  const nowAdded2hours = new Date(now).setHours(now.getHours() + 2);
  if (isAfter(closeAt, nowAdded2hours)) {
    return "投票受付中";
  }

  const timeDiff = new Date(closeAt).getTime() - now.getTime();
  const minutes = Math.round(timeDiff / (1000 * 60));
  return `締切${minutes}分前`;
};
