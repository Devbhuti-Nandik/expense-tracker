export const isValidAmount = (amount: string): boolean => {
  const pattern = /^[0-9]+(\.[0-9]+)?$/;
  return pattern.test(amount);
};
