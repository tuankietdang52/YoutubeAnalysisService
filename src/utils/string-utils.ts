export const sanitizeFileName = (fileName: string, replace: string): string => {
  const invalidFileNameCharacter = /[\\/:*?"<>|]/g;
  return fileName.replace(invalidFileNameCharacter, replace);
}