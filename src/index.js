import Notiflix from 'notiflix';
import markupList from './templates/markupList.hbs';
// import markupCard from './templates/markupCard.hbs';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  resetResult();
  const formData = e.target.value.trim();

  fetchCountries(formData)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length >= 2) {
        refs.list.innerHTML = markupList(data);
      } else {
        refs.card.innerHTML = markupCard(data);
      }
    })
    .catch(err =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function resetResult() {
  refs.list.innerHTML = '';
  refs.card.innerHTML = '';
}

function markupCard(data) {
  return data
    .map(
      item => `<div class = "wrapper"><img src='${
        item.flags.svg
      }' alt='flag of ${name.official}' />
  <h2 class='country-name card'>${item.name.official}</h2></div>
  <p><span>Capital:</span> ${item.capital}</p>
  <p><span>Population:</span> ${item.population}</p>
  <p><span>Languages:</span>
   ${Object.values(item.languages).join(', ')}
  </p>`
    )
    .join('');
}
