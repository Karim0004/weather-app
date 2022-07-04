async function fetchWeather(city) {
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=
  ${city}&appid=bcf394b251e97583c0f7eecdee701c26`;
  const data = await fetch(apiCall, { mode: 'cors' });
  return data.json();
}

const unitHandler = (() => {
  let unit = 'C';

  function toCelcius(kelvin) {
    return (Math.round(kelvin - 273.15));
  }
  function toFahrenheit(kelvin) {
    return (Math.round((toCelcius(kelvin) * (9 / 5)) + 32));
  }

  function set(u) {
    switch (u) {
      case 'c':
      case 'C':
        unit = 'C';
        break;

      case 'F':
      case 'f':
        unit = 'F';
        break;

      default:
        unit = 'C';
        break;
    }
  }

  function convert(kelvin) {
    if (unit === 'F') {
      return toFahrenheit(kelvin);
    }
    return toCelcius(kelvin);
  }

  return { set, convert };
})();

async function parseWeather(city) {
  try {
    const data = await fetchWeather(String(city));
    if (data.cod !== 200) return data.message;

    return {
      name: data.name,
      humidity: data.main.humidity,
      feelsLike: unitHandler.convert(data.main.feels_like),
      temp: unitHandler.convert(data.main.temp),
      state: data.weather[0].main,
      stateDesc: data.weather[0].description,
      country: data.sys.country,
      wind: {
        speed: data.wind.speed,
        deg: data.wind.deg,
      },
    };
  } catch (e) {
    return 'Something went wrong, unable to recieve data';
  }
}

export { parseWeather, unitHandler };
