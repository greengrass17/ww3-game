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

export const getTeams = () => teams;

export const getTeam = (id) => teams.find(team => team._id === id);
