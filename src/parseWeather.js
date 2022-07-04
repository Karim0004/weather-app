async function fetchWeather(city) {
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=
  ${city}&appid=bcf394b251e97583c0f7eecdee701c26`;
  const data = await fetch(apiCall, { mode: 'cors' });
  return data.json();
}

export default async function parseWeather(city) {
  try {
    const data = await fetchWeather(String(city));

    return {
      name: data.name,
      humidity: data.main.humidity,
      feelsLike: data.main.feels_like,
      temp: data.main.temp,
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
