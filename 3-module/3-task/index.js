function camelize(str) {

  let result = str.split('-');
  for (let i = 1; i < result.length; i++) {
    let firstLetter = result[i];
    result[i] = firstLetter[0].toUpperCase() + firstLetter.slice(1);
  }
  return result.join('');
  
}
