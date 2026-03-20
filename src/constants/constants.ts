export const TRANSACTION_TYPE = {
  EXPENSE: "expense",
  INCOME: "income",
} as const;

export const TRANSACTION_FILTERS = {
  ALL: "all",
  ...TRANSACTION_TYPE,
} as const;

export const WEEKDAY_ABBREVIATIONS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
