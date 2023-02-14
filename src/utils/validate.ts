export const isValidEmail = (email: string): boolean => {
  // Use a regular expression to validate email format
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
