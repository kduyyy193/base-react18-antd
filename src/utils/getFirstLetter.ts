const getFirstLetter = (text: string, numberLetter = 1) => {
  text = text.trim();
  if (text.split(' ').length === 1) {
    return text.substring(0, numberLetter);
  } else {
    let letter = '';
    text.split(' ').map((item, index) => {
      if (index < numberLetter) {
        letter += item.charAt(0);
      }
      return item;
    });
    return letter;
  }
};
export default getFirstLetter;
