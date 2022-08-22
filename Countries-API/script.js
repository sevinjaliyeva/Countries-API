'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const selectCountries = document.querySelector('#selectCountries');

///////////////////////////////////////
const requestcountries = new XMLHttpRequest();
requestcountries.open('GET', 'https://restcountries.com/v3.1/all');
requestcountries.send();
requestcountries.addEventListener('load', function () {
  const dataCountries = JSON.parse(this.responseText);
  //   console.log(dataCountries);
  let html = ['<option selected value="Azerbaijan">Azerbaijan</option>'];
  let sorted = [];
  dataCountries.forEach((element, i) => {
    sorted.push(element.name.common);
    sorted.sort();
    // console.log(sorted);
  });
  sorted.forEach((country, i) => {
    html += `<option value="${country}">${country}</option>`;
    // console.log(html);
  });

  selectCountries.innerHTML = html;
});

document.querySelector('.selectedValue').addEventListener('click', () => {
  //   console.log(selectCountries.value);
  getCountry(selectCountries.value);
  countriesContainer.innerHTML = '';
});
///////////////////////////////////////
const renderData = function (data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} mln people </p>
            <p class="country__row"><span>🗣️</span>${
              !data.languages ? 'None' : Object.values(data.languages)
            }</p>
            <p class="country__row"><span>${
              data.currencies ? Object.values(data.currencies)[0].symbol : ''
            }</span>${
    data.currencies ? Object.values(data.currencies)[0].name : '💰'
  }</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderData(data);
    const neighbour1 = data.borders?.[0];
    const request1 = new XMLHttpRequest();
    request1.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour1}`);
    request1.send();
    request1.addEventListener('load', function () {
      const [data1] = JSON.parse(this.responseText);
      //   console.log(data1);
      renderData(data1, 'neighbour');
    });
    const neighbour2 = data.borders?.[1];
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour2}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      //   console.log(data2);
      renderData(data2, 'neighbour');
    });
    const neighbour3 = data.borders?.[2];
    const request3 = new XMLHttpRequest();
    request3.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour3}`);
    request3.send();
    request3.addEventListener('load', function () {
      const [data3] = JSON.parse(this.responseText);
      //   console.log(data3);
      renderData(data3, 'neighbour');
    });
    const neighbour4 = data.borders?.[4];
    const request4 = new XMLHttpRequest();
    request4.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour4}`);
    request4.send();
    request4.addEventListener('load', function () {
      const [data4] = JSON.parse(this.responseText);
      //   console.log(data4);
      renderData(data4, 'neighbour');
    });
  });
};

// getCountry(`${}`);
