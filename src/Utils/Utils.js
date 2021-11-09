export const displayPounds = (num) => {
  return `£${((num*100)/100).toFixed(2)}`;
}

export const formatURL = (name) => {
 return name.toLowerCase().replace(/ /g, '-');
}

