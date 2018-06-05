import * as countries from './countries';
import * as cards from './cards';
import * as teams from './teams';

export default {
  ...teams,
  countries: {
    ...countries
  },
  cards: {
    ...cards
  }
};
