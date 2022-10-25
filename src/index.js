import './css/styles.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInput, 300));

function onInput(e) {
  return e.target.value.trim();
}
