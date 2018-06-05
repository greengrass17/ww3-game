import kefir from 'kefir';
import { getRandomHq, getRandomAllies } from "services/countries";
import { setHq, addAllies } from "services/teams/countries";
import { getTeams } from "services/teams/teams";
import { addCards } from 'services/teams/cards';

export const gamePhaseStream = kefir.pool();

export const start = () => {
  getHqs();
  getCards();
};

const getCards = () => {
  const teams = getTeams();
  teams.forEach(team => {
    addCards(team._id, 'advantage', 5);
    addCards(team._id, 'event', 5);
  });
};

const getHqs = () => {
  localStorage.removeItem('countries');
  const teams = getTeams();
  getRandomHq(2).then(hqs => {
    hqs.forEach((hq, index) => {
      setHq(teams[index]._id, hq);
    });
  });
};

export const getAllies = () => {
  const teams = getTeams();
  getRandomAllies(10).then(countries => {
    teams.forEach((team, index) => {
      addAllies(team._id, countries.slice(index * 5, index * 5 + 5));
    });
  });
};