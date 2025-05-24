function sumSalary(salaries) {
  let result = 0;
  for (let item in salaries) {
    if (isFinite(salaries[item])) {
      result += salaries[item];
    }
  }
  return result;
}
