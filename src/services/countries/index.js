import { get } from 'services/http';

const PORT = '8080';
const BASE_URL = '/country';
const getCountries = get(PORT);

export const getRandomHq = (ipp = 1) => {
  return getCountries(`${BASE_URL}/?specials=HQ&ipp=${ipp}`);
};

export const getRandomAllies = (ipp) => {
  return getCountries(`${BASE_URL}/?specials=Ally&ipp=${ipp}`);
};

export const search = (keyword) => {
  return getCountries(`${BASE_URL}/search?keyword=${keyword}&field=Name`).then(countries => {
    return countries.map(country => ({
      ...country,
      Specials: undefined
    }));
  });
};

window.getRandomAllies = getRandomAllies;