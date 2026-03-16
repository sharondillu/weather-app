function ForecastCard({ date, temp, weather }) {

return (

<div className="forecast-card">

<p>{date}</p>

<p>{temp}°C</p>

<p>{weather}</p>

</div>

);

}

export default ForecastCard;