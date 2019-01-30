const BASE_URL =
  window.location.protocol + '//' + window.location.host + ':8080/api/';

export const get = path => {
  return fetch(BASE_URL + path)
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const post = (path, data) => {
  return fetch(BASE_URL + path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset0utf-8'
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
};
