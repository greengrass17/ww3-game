const URL = 'http://174.138.10.57:49160';

export const get = (path) => {
  return fetch(URL + path).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
    throw err;
  });
};