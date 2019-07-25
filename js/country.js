var country = [];
var countryDescription = document.getElementById('country-description');
var flag = document.getElementById('flag');

function getACountry(name) {
  fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    country = data[0];
    generateCountryDOM(country)
    
  }).
  catch(error=> {
    // showToaster('Something went wrong', error)
  })
}

function generateCountryDOM(country) {
  flag.innerHTML = `<img src="${country.flag}"></img>`
  const dom = `<div class="name"><label>Country</label>${country.name}</div>
  <div class="name"><label>Currencies</label>${country.currencies[0].code} + ${country.currencies[0].symbol}</div>
  <div class="name"><label>Native Name</label>${country.nativeName}</div>
  <div class="name"><label>Timezones</label>${country.timezones}</div>
 `
  countryDescription.innerHTML= dom;
}

var urlParams = new URLSearchParams(window.location.search);

 const countryName = urlParams.get('country')
    getACountry(countryName);