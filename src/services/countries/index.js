import { get } from 'services/http';

const PATH = 'v1/countries';
const getCountries = get;

export const getRandomHq = (ipp = 1) => {
  return getCountries(`${PATH}/?specials=HQ&ipp=${ipp}`);
};

export const getRandomAllies = (ipp) => {
  return getCountries(`${PATH}/?specials=Ally&ipp=${ipp}`);
};

export const search = (keyword) => {
  return getCountries(`${PATH}/search?keyword=${keyword}&field=Name`).then(countries => {
    return countries.map(country => ({
      ...country,
      Specials: undefined
    }));
  });
};

window.getRandomAllies = getRandomAllies;