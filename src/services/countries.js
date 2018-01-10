import { get } from './http';
import { randomArray } from './utils';

export const getRandom = (amount) => {
  return get('/hqs').then(items => {
    const indexes = Array.from(Array(items.length), (_, i) => i);
    const randomIndexes = randomArray(indexes).slice(0, amount);
    return items.filter((item, index) => randomIndexes.indexOf(index) > -1);
  });
};
