import React, { useState } from "react";
import GeoCode from "../geocode/geocode.component";
import GMap from "../google-maps/google-maps.component";

import "./search.css";
const Search = () => {
  const [coords, setCoords] = useState({ lat: 40.7127753, lng: -74.0059728 });
  const [address, setAddress] = useState("New York, NY, USA");

  return (
    <div id='search-container'>
      <GeoCode setCoords={setCoords} setAddress={setAddress} />
      <GMap coords={coords} address={address} />
    </div>
  );
};

export default Search;
