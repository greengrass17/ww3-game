const URL = 'http://www.ww3ga.me';

export const get = port => path => {
  return fetch(URL + ':' + port + path).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
    throw err;
  });
};