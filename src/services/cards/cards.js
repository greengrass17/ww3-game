import { get } from 'services/http';

const PATH = 'v1/games/5bca4fb6a43e99281a1f65d5/cards';
const fetchCard = get;

export const getAdvantageCards = noOfCards => {
  return fetchCard(`${PATH}/?ipp=${noOfCards}`);
};

export const getEventCards = noOfCards => {
  return fetchCard(`${PATH}/event?ipp=${noOfCards}`);
};

export const fetchCards = (type, ipp) => {
  return fetchCard(`${PATH}/?ipp=${ipp}`);
};