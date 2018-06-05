import kefir from 'kefir';

import teams from 'services/teams';

export const getCountries = () => JSON.parse(localStorage.getItem('countries')) || [];

export const localSearch = (query = {}) => {
  const countries = getCountries();
  return countries.find(country => {
    const keys = Object.keys(query);
    return keys.reduce((match, key) => {
      return match && country[key] === query[key];
    }, true);
  });
};

const countriesPool = kefir.pool();
export const countriesStream = countriesPool.toProperty(() => getCountries());

export const setHq = (teamId, country) => {
  const countries = getCountries();
  countries.push({
    ...country,
    Specials: 'HQ',
    Team: teams.getTeam(teamId)
  });
  localStorage.setItem('countries', JSON.stringify(countries));
  countriesPool.plug(kefir.constant(countries));
};

export const getHq = (teamId) => {
  const countries = getCountries();
  return countries.find(({ Specials, Team }) => Specials === 'HQ' && Team._id === teamId);
};

export const addAllies = (teamId, allies) => {
  let countries = getCountries();
  countries = countries.concat(allies.map(ally => ({
    ...ally,
    Specials: 'Ally',
    Team: teams.getTeam(teamId)
  })));
  localStorage.setItem('countries', JSON.stringify(countries));
  countriesPool.plug(kefir.constant(countries));
};
