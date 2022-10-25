const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  fetch(
    `${BASE_URL}/name?fields=name.official,capital,population,flags.svg,languages`
  );
}
