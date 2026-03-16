function WeatherCard({ icon, title, value }) {

return (

<div className="card">

<div className="icon">{icon}</div>

<h4>{title}</h4>

<p>{value}</p>

</div>

);

}

export default WeatherCard;