import { post } from "../http";

export const fetchNextBattle = () => {
  return post('v1/games/5bca4fb6a43e99281a1f65d5/battles/');
};