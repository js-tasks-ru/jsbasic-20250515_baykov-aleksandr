function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  let i = 1;
  while (i <= n) {
    result *= i;
    i++;
  }
  return result;
}
