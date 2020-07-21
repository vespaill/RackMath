export const calcBgColor = input => {
  if (input % 6 === 0) return 'black';
  if (input % 5 === 0) return 'yellow';
  if (input % 4 === 0) return 'red';
  if (input % 3 === 0) return 'purple';
  if (input % 2 === 0) return 'green';
  return 'cyan';
};
