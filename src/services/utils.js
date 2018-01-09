import * as _ from 'underscore';

export const get = (obj, key) => {
  let keys = key.toString().replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.');
  let properties = _.chain(keys).reverse().map(_.property).value();

  return _.isEmpty(properties) ? obj : _.compose.apply(null, properties)(obj);
};

export const set = (obj, key, value) => {
  let keys = key.toString().replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.');
  let properties = _.chain(keys).initial().reverse().map(_.property).value();
  let base = _.isEmpty(properties) ? obj : _.compose.apply(null, properties)(obj);

  if (base) {
    base[_.last(keys)] = value;
  }
};

export const wrappedPromise = () => {
  var wrappedPromise = {},
    promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
};

export const isEmpty = (object) => {
  return Object.getOwnPropertyNames(object).length === 0;
};

export const random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const randomArray = (array) => {
  const out = [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const index = random(0, array.length - 1);
    out.push(array[index]);
    array.splice(index, 1);
  }
  return out;
};