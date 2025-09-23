export const sanitizeFileName = (fileName: string, replace: string): string => {
  const invalidFileNameCharacters = /[\/\\:*?"<>|\0-\x1F]/g;
  return fileName.replace(invalidFileNameCharacters, replace)
                 .replace(/\s+/g, replace) // replace space char
                 .trim();
}