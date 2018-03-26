import { get } from './http';

const PORT = '49160';
const BASE_URL = '/country';
const getCountries = get(PORT);

export const getRandomHq = () => {
  return getCountries(`${BASE_URL}/?specials=HQ&ipp=1`);
};

export const getRandomAllies = () => {
  return getCountries(`${BASE_URL}/?specials=Ally&ipp=5`);
};

export const search = (keyword) => {
  return getCountries(`${BASE_URL}/search?keyword=${keyword}&field=Name`);
};
