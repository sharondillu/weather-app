import { useState ,useEffect} from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import Loader from "./components/Loader";
import MapView from "./components/MapView";

import { WiHumidity, WiBarometer } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";

import "./App.css";


const API_KEY = "fade7811b608f797f6e2bde40617c614";


function App() {

const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const [forecast, setForecast] = useState([]);
const [loading, setLoading] = useState(false);
//const [unit, setUnit] = useState("metric");
const [error, setError] = useState('');
const unit="metric";
useEffect(()=>{
  setCity("London");
  //getWeather("London");
},[]);
useEffect(()=>{
  if(city){
    getWeather();
  }
},[city]);

const getWeather = async () => {
  

if(!city) return;
setError('');

//setLoading(true);

try{

const weatherRes = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
);

const weatherData = await weatherRes.json();

const forecastRes = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
);

const forecastData = await forecastRes.json();

setWeather(weatherData);

const dailyForecast = forecastData.list.filter(item =>
item.dt_txt.includes("12:00:00")
);

setForecast(dailyForecast.slice(0,5));

}catch(err){

console.log("Error fetching weather");
//console.error("Error fetching data:", err); // Log error details
 setError('City not found or API not reachable'); 
 setWeather(null);

}

setLoading(false);

};


//const toggleUnit = () =>{

//setUnit(unit === "metric" ? "imperial" : "metric");

//};


const getBackground = () =>{

if(!weather) return "default";

const condition = weather.weather[0].main;

if(condition === "Clear") return "sunny";
if(condition === "Clouds") return "cloudy";
if(condition === "Rain") return "rainy";
if(condition === "Thunderstorm") return "storm";

return "default";

};

const weatherType = weather?.weather[0]?.main;
//const weatherClass=weatherType?.toLowerCase();
return(
  

<div className={`app ${getBackground()}`}>
  {weatherType === "Clouds" && 
  (
    <>
  <div className="cloud">☁️</div>
  <div className="cloud" style={{ top: '120px', animationDelay: '10s', fontSize: '80px' }}>☁️</div> {/* second cloud – delayed */}
      <div className="cloud" style={{ top: '50px', animationDelay: '25s', opacity: 0.15 }}>☁️ ☁️</div> {/* clustered */}
    </>
  )}
{weatherType === "Rain" && <div className="rain"></div>} 

<h1>Weather Dashboard</h1>

<SearchBar
city={city}
setCity={setCity}
getWeather={getWeather}
/>
{error && <p className="error">{error}</p>}




{loading && <Loader/>}


{weather && !loading && (




<div className="weather-container">
<h2>
  {weather.name}
  </h2>

<h1 className="temp">
{Math.round(weather.main.temp)}°C
</h1>

<p className="description">
{weather.weather[0].description}
</p>
<MapView city={weather.name} />

<h2 className="highlight-title">Today's Highlights</h2>
<div className="details">

<WeatherCard
icon={<WiHumidity size={40}/>}
title="Humidity"
value={`${weather.main.humidity}%`}
/>

<WeatherCard
icon={<FaWind size={30}/>}
title="Wind Speed"
value={`${weather.wind.speed} ${unit==="metric"?"m/s":"mph"}`}
/>

<WeatherCard
icon={<WiBarometer size={40}/>}
title="Pressure"
value={`${weather.main.pressure} hPa`}
/>

<WeatherCard
icon={<MdVisibility size={30}/>}
title="Visibility"
value={`${weather.visibility/1000} km`}
/>

</div>


<h2 className="title">5 Day Forecast</h2>
<div className="forecast-container">



{forecast.map((day,index)=>{

const date = new Date(day.dt_txt).toLocaleDateString();

return(

<ForecastCard
key={index}
date={date}
temp={Math.round(day.main.temp)}
weather={day.weather[0].main}
/>

);

})}

</div>
</div>



)}

</div>


);

}

export default App;