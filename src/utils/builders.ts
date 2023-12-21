export const error = (msg?: string): [boolean, string | undefined] => [
  true,
  msg,
];

export const noError = (): [boolean] => [false];
