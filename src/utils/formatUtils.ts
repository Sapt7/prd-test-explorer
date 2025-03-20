
export const formatDate = (date: Date): string => {
  // Return date in format like M/D/YYYY (e.g., 3/12/2025)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '-';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
