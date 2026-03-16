import { FaSpinner } from "react-icons/fa";

function Loader() {
 return (
   <div className="loader">
     <FaSpinner className="spin" />
     <p>Loading weather...</p>
   </div>
 );
}

export default Loader;