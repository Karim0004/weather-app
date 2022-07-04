import Dropdown from '@karim04/dropdown-menu';
import parseWeather from './parseWeather';
import windIcon from './assets/wind.svg';
import tempIcon from './assets/temp.svg';
import searchIcon from './assets/search.svg';

const displayController = (function display() {
  document.querySelector('.temperature>img').src = tempIcon;
  document.querySelector('.wind>img').src = windIcon;

  const alertBox = document.getElementById('alert-box');
  const speed = document.getElementById('speed');
  const deg = document.getElementById('deg');
  const temp = document.getElementById('temp');
  const feelsLike = document.getElementById('feels-like');
  const city = document.getElementById('city');
  const country = document.getElementById('country');
  const state = document.getElementById('state-main');
  const stateDesc = document.getElementById('state-desc');
  const humidity = document.getElementById('humidity');

  const unitChanger = document.getElementById('unit');
  const unitChangerLabel = document.querySelector('#unit>span');

  const unitMenu = Dropdown.create(unitChanger);
  unitMenu.menu.style.top = '';
  unitMenu.menu.style.bottom = '120%';
  unitMenu.menu.style.transformOrigin = 'bottom';

  unitMenu.add('Celsius', () => {
    unitChangerLabel.innerText = '°C';
  });
  unitMenu.add('Fahrenheit', () => {
    unitChangerLabel.innerText = '°F';
  });

  function popup(text) {
    if (alertBox.classList.contains('visible-box')) return;

    alertBox.innerText = text;
    alertBox.classList.add('visible-box');
    setTimeout(() => {
      alertBox.classList.remove('visible-box');
    }, 3000);
  }

  function displayWeather(weatherData) {
    // if theres an error display it
    if (typeof weatherData === 'string') {
      popup(weatherData);
      return;
    }
    speed.innerText = weatherData.wind.speed;
    deg.innerText = weatherData.wind.deg;
    temp.innerText = weatherData.temp;
    feelsLike.innerText = weatherData.feelsLike;
    state.innerText = weatherData.state;
    country.innerText = weatherData.country;
    city.innerText = weatherData.name;
    stateDesc.innerText = weatherData.stateDesc;
    humidity.innerText = weatherData.humidity;
  }

  const input = document.getElementById('input-city');
  const submit = document.getElementById('submit-button');
  submit.src = searchIcon;
  let lastSearch = input.value;

  // fires on form submission
  async function getWeather() {
    // check if the input value has changed
    if (input.value === lastSearch) return;

    lastSearch = input.value;
    const weatherObject = await parseWeather(lastSearch);

    displayWeather(weatherObject);
  }

  // binding form submission to get weather data
  submit.onclick = getWeather;
  input.onkeydown = (e) => {
    if (e.key === 'Enter') getWeather();
  };
}());

export default displayController;
