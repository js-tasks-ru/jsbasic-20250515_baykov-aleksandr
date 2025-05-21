function checkSpam(str) {
  let lowerString = str.toLowerCase();
  let parameter1 = '1xBet'.toLowerCase();
  let parameter2 = 'XXX'.toLowerCase();
  return lowerString.includes(parameter1) || lowerString.includes(parameter2);
}

