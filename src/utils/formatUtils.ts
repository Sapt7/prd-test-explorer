
export const formatDate = (date: Date): string => {
  // Return date in format like M/D/YYYY (e.g., 3/12/2025)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
