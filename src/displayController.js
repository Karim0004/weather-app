import parseWeather from './parseWeather';
import wind from './assets/wind.svg';
import temp from './assets/temp.svg';
import searchIcon from './assets/search.svg';

const displayController = (function display() {
  document.querySelector('.temperature>img').src = temp;
  document.querySelector('.wind>img').src = wind;

  const input = document.getElementById('input-city');
  const submit = document.getElementById('submit-button');
  submit.src = searchIcon;
  let lastSearch = input.value;

  // fires on form submission
  async function getWeather() {
    // check if the input value has changed
    if (input.value === lastSearch) return;

    lastSearch = input.value;
    const weatherData = await parseWeather(lastSearch);
    console.log(weatherData);
  }

  // binding form submission to get weather data
  submit.onclick = getWeather;
  input.onkeydown = (e) => {
    if (e.key === 'Enter') getWeather();
  };
}());

export default displayController;
