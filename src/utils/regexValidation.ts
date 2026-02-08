export const validateAmount = (amount: string) => {
  let pattern = /^[0-9]+(\.[0-9]+)?$/;
  if (!pattern.test(amount)) {
    return true;
  }
  return false;
};
