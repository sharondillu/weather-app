import { FiSearch } from "react-icons/fi";

function SearchBar({ city, setCity, getWeather }) {

return (

<div className="search-box">

<div className="search-input">

<FiSearch className="search-icon"/>

<input
type="text"
placeholder="Search city..."
value={city}
onChange={(e)=>setCity(e.target.value)}
onKeyDown={(e)=>{
    if(e.key==="Enter"){
        getWeather();
    }
}}
/>

</div>



</div>

);

}

export default SearchBar;