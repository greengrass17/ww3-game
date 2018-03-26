import { get } from './http';

const PORT = '8081';
const BASE_URL = '/card';
const getCards = get(PORT);

export const getAdvantageCards = noOfCards => {
  return getCards(`${BASE_URL}/advantage?ipp=${noOfCards}`);
};

export const getEventCards = noOfCards => {
  return getCards(`${BASE_URL}/event?ipp=${noOfCards}`);
};
