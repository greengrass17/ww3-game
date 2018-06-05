import { get } from 'services/http';

const PORT = '8081';
const BASE_URL = '/card';
const fetchCard = get(PORT);

export const getAdvantageCards = noOfCards => {
  return fetchCard(`${BASE_URL}/advantage?ipp=${noOfCards}`);
};

export const getEventCards = noOfCards => {
  return fetchCard(`${BASE_URL}/event?ipp=${noOfCards}`);
};

export const fetchCards = (type, ipp) => {
  return fetchCard(`${BASE_URL}/${type}?ipp=${ipp}`);
};