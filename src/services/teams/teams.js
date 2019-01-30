// import kefir from 'kefir';
import { get } from "services/http";

const BASE_URL = 'v1/games/5bca4fb6a43e99281a1f65d5';
const teams = [
  {
    "_id": "1",
    "Name": "Team 1",
    "Color": "#ff0000",
  },
  {
    "_id": "2",
    "Name": "Team 2",
    "Color": "#0000ff",
  }
];

// const teamsPool = kefir.pool();

export const getTeams = () => {
  return get(BASE_URL).then(game => game.teams);
};

export const getTeam = (id) => teams.find(team => team._id === id);
