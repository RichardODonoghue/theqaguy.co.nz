/**
 * @description Truncates a string to a specified maximum length, adding an ellipsis if truncation occurs.
 * @param text - The string to be truncated.
 * @param maxLength - The maximum allowed length of the string.
 * @returns An object containing a boolean indicating if truncation occurred and the resulting string.
 */
export const truncateString = (text: string, maxLength: number) => {
  if (text.length >= maxLength) {
    return { isTruncated: true, text: text.slice(0, maxLength - 3) + '...' };
  }

  return { isTruncated: false, text };
};
