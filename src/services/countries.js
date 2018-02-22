import { get } from './http';

export const getRandomHq = () => {
  return get('/hqs/r');
};

export const search = (keyword) => {
  console.log(keyword);
  return get(`/?q=${keyword}`);
};
