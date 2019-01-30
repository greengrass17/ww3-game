import kefir from 'kefir';
import { getRandomHq, getRandomAllies } from 'services/countries';
import { addAllies } from 'services/teams/countries';
import { getTeams } from 'services/teams/teams';
import { addCards } from 'services/teams/cards';
import { get } from 'http';
import { post } from 'services/http';

const BASE_URL = '/api/v1/games/';
const getGame = get;

export const gamePhaseStream = kefir.pool();

export const start = () => {
  getHqs().then(teams => {
    console.log(teams);
  });
  getCards();
};

const getCards = () => {
  return getTeams().then(teams => {
    return Promise.all(teams.map(team => {
      return addCards(team._id, 'advantage', 5);
    }));
  });
};

const getHqs = () => {
  return getTeams().then(teams => {
    return getRandomHq(2).then(hqs => {
      return Promise.all(teams.map(({ _id }, i) => addCountries(_id, hqs[i])));
    });
  });
};

// const getHqs = () => {
//   localStorage.removeItem('countries');
//   const teams = getTeams();
//   getRandomHq(2).then(hqs => {
//     hqs.forEach((hq, index) => {
//       setHq(teams[index]._id, hq);
//     });
//   });
// };

export const getAllies = () => {
  const teams = getTeams();
  getRandomAllies(10).then(countries => {
    teams.forEach((team, index) => {
      addAllies(team._id, countries.slice(index * 5, index * 5 + 5));
    });
  });
};

export const getGameSingle = () => {
  return getGame(`${BASE_URL}/5bca4fb6a43e99281a1f65d5`);
};

export const addCountries = (teamId, countries) => {
  return post(`${BASE_URL}/teams/${teamId}/countries`, countries);
};
