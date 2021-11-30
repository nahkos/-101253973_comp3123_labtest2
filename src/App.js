import React, {useState} from "react";

const api = {
  key: "a9532f8629a81849864561fdc43e6ee6",
  base: "https://api.openweathermap.org/data/2.5/"  
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      });
    }

    
  }

  

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app hot' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type='text'
            className='search-bar'
            placeholder="Enter name of city"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />          
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className='location-box'>
          <div className='location'>{weather.name}, {weather.sys.country}</div>
          <div className='location'>type: {weather.sys.type}, id: {weather.sys.id}</div>
          <div className='location'>sunrise: {weather.sys.sunrise}, sunset: {weather.sys.sunset}</div>
          <div className='location'>lon: {weather.coord.lon} <br /> lat: {weather.coord.lat}</div>
          <div className='location'>timezone: {weather.timezone}, id: {weather.id}, cod: {weather.cod}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-box'>
          <div className='temp'>{Math.round(weather.main.temp)}°c</div>
          <div className='weather'>id: {weather.weather[0].id}</div>
          <div className='weather'>{weather.weather[0].main}</div>
          <div className='weather'>{weather.weather[0].description}</div>          
          <div className='weather'><img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather status icon"             
            /></div>       
          <div className='weather'>feels like: {Math.round(weather.main.feels_like)}°c</div>  
          <div className='weather'>min: {Math.round(weather.main.temp_min)}°c</div>  
          <div className='weather'>max: {Math.round(weather.main.temp_max)}°c</div>  
          <div className='weather'>pressure: {Math.round(weather.main.pressure)}kPa</div>  
          <div className='weather'>humidity: {Math.round(weather.main.humidity)}%</div>  
          <div className='weather'>sea level: {Math.round(weather.main.sea_level)}ft</div>  
          <div className='weather'>ground level: {Math.round(weather.main.grnd_level)}ft</div>  
          <div className='weather'>visibility: {Math.round(weather.visibility)}km</div>  
          <div className='weather'>wind speed: {Math.round(weather.wind.speed)}km/h</div>  
          <div className='weather'>wind deg: {Math.round(weather.wind.deg)}°</div>  
          <div className='weather'>clouds all: {Math.round(weather.clouds.all)}</div>  
          <div className='weather'>dt: {Math.round(weather.dt)}</div>  
          
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
