import { get } from './http';

const baseUrl = '/country';

export const getRandomHq = () => {
  return get(`${baseUrl}/?specials=HQ&ipp=1`);
};

export const getRandomAllies = () => {
  return get(`${baseUrl}/?specials=Ally&ipp=5`);
};

export const search = (keyword) => {
  return get(`${baseUrl}/search?keyword=${keyword}&field=Name`);
};
