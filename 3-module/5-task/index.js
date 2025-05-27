function getMinMax(str) {
  let arrayOfNumbers = str.split(" ").filter(number => isFinite(number));
  let result = {
    min: Math.min(...arrayOfNumbers),
    max: Math.max(...arrayOfNumbers),
  };
  return result;
}
