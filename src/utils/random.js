export const random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const randomArray = (array) => {
  const out = [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const index = random(0, array.length - 1);
    out.push(array[index]);
    array.splice(index, 1);
  }
  return out;
};

export default {
  random,
  randomArray
};