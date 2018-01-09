const URL = 'http://localhost:8000';

export const get = (path) => {
  return fetch(URL + path).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
    throw err;
  });
};