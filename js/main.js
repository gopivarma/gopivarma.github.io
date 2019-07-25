var countries = [];
var countryNames = [];
var searchBar = document.getElementById('search-bar');
var searchInput = document.getElementById('search-input');
var tableContent =  document.getElementById('table-content');
var searchResults = document.getElementById('search-results');
var logo = document.getElementById('company-logo')
var countriesList = document.getElementById('countries-list');
var closeInput = document.getElementById('close-input');

function getAllCountries() {
  fetch('https://restcountries.eu/rest/v2/all')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    countries = data;
    countryNames = countries.map(country => country.name);
    generateCountriesTable()
    
  }).
  catch(error=> {
    showToaster('Something went wrong', error)
  })
}

function generateCountriesTable() {
  countriesDOM = '';
  searchResultsDOM = ''
  countries.forEach(country => {
    const html = `<tr onclick="showCountry('${country.name}')" data-country=${country.name}>
    <td>${country.name}</td>
    <td><img class="country-flag" src=${country.flag}></td>
    <td>${country.capital}</td>
    <td>${country.population}</td>
    </tr>`
    countriesDOM +=html;
    const searchHTML = `<li data-country=${country.name} onclick="showCountry('${country.name}')">
    <div class="flag"><img class="country-flag" src=${country.flag}></div>
    <div class="name">${country.name}</div>
    </li>`
    searchResultsDOM += searchHTML;
  });
  tableContent.innerHTML = countriesDOM;
  countriesList.innerHTML = searchResultsDOM;
}

function showToaster(message, status) {
  document.getElementById('toaster').classList.add(status);
  document.getElementById('message').textContent = message;
}

function filterCountry(value) {
const  list = countriesList.getElementsByTagName("li");
for(let i=0; i<list.length; i++) {
  const row = list[i];
  if(!row.getAttribute('data-country').toLowerCase().includes(value.toLowerCase())) {
    row.style.display = 'none';
  } else {
    row.style.display = 'block';
  }
}
 
}

function getACountry(name) {
  fetch('https://restcountries.eu/rest/v2/name/{name}?fullText=true')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    countries = data;
    countryNames = countries.map(country => country.name);
    generateCountriesTable()
    
  }).
  catch(error=> {
    showToaster('Something went wrong', error)
  })
}

function showCountry(country) {
  //getACountry(country);
  window.location.href=window.location.hostname+ 'country.html?country='+country;
}



searchInput.addEventListener('input', function(event) {
  filterCountry(event.target.value);
});

searchInput.addEventListener('focus', function(event) {
  toggleSearchBarAndResults();
  closeInput.classList.add('show');
  logo.classList.add('hide');
});

closeInput.addEventListener('click', function(event) {
  toggleSearchBarAndResults();
  searchInput.value='';
    closeInput.classList.remove('show');
    logo.classList.remove('hide');
});

// searchInput.addEventListener('blur', function(event) {
//   toggleSearchBarAndResults();
//   closeInput.classList.remove('show');
//   logo.classList.remove('hide');
// });

function toggleSearchBarAndResults() {
  document.body.classList.toggle('overflow-hidden');
  searchBar.classList.toggle('expand-bar');
  searchResults.classList.toggle('show');
}

// Function invoking
getAllCountries();