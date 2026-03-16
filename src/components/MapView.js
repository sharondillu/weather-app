import React from "react";

function MapView({ city }) {

 const mapUrl = `https://maps.google.com/maps?q=${city}&t=&z=10&ie=UTF8&iwloc=&output=embed`;

 return (
   <div className="map-container">

     <h3>Location Map</h3>

     <iframe
       title="map"
       src={mapUrl}
       loading="lazy"
       allowFullScreen> </iframe>

    </div>
 );
}

export default MapView;