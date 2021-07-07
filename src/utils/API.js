import config from '../config';

const { API_URL, fetch_options } = config;

const get = url =>
  fetch(API_URL + url, fetch_options)
    .then(res => res.json())
    .catch(err => err);

export { get };
