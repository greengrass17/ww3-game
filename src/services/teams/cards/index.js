import kefir from 'kefir';
import { fetchCards } from 'services/cards';
import enums from 'services/enums';
import teams from 'services/teams';

// CardName, CardText, CardEffect, CardCondition

export const getFromStorage = (key) => JSON.parse(localStorage.getItem(`cards.${key}`)) || [];

const pools = {};

pools['1.adv'] = kefir.pool();
pools['1.eve'] = kefir.pool();
pools['2.adv'] = kefir.pool();
pools['2.eve'] = kefir.pool();

export const streams = {};

streams['1.adv'] = pools['1.adv'].toProperty(() => getFromStorage('1.adv'));
streams['1.eve'] = pools['1.eve'].toProperty(() => getFromStorage('1.eve'));
streams['2.adv'] = pools['2.adv'].toProperty(() => getFromStorage('2.adv'));
streams['2.eve'] = pools['2.eve'].toProperty(() => getFromStorage('2.eve'));

export const addCards = (teamId, type, noOfCards) => {
  const key = enums[`card.${type}.key`];
  const cardsPool = pools[`${teamId}.${key}`];
  return fetchCards(type, noOfCards).then(rawCards => {
    let cards = getFromStorage(`${teamId}.${key}`);
    cards = cards.concat(rawCards.map(card => {
      return {
        ...card,
        Type: type,
        Team: teams.getTeam(teamId)
      };
    }));
    localStorage.setItem(`cards.${teamId}.${key}`, JSON.stringify(cards));
    cardsPool.plug(kefir.constant(cards));
  });
};

window.addCards = addCards;