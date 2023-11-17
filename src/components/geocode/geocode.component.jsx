import React, { useState, useEffect } from "react";

import { setDefaults, fromAddress, fromLatLng } from "react-geocode";

import "./geocode.css";

const GeoCode = ({ setCoords, setAddress }) => {
  const apiKey = process.env.REACT_APP_MAPS_API_KEY;

  const [addr, setAddr] = useState("");
  const [pos, setPos] = useState({});
  const [showAddr, setShowAddr] = useState(false);
  const [formFields, setFormFields] = useState({
    address: "",
    coords: "",
  });

  const getAddress = (lat, lng) => {
    formFields.coords && setShowAddr(true);
    // Get address from latitude & longitude.
    fromLatLng(lat, lng)
      .then(({ results }) => {
        setAddr(results[0].formatted_address);
        setAddress(results[0].formatted_address);

        // console.log(results[1].formatted_address);
        // console.log(results[3].formatted_address);
      })
      .catch(console.error);
  };

  const getCoords = (address) => {
    // Get latitude & longitude from address.
    fromAddress(address)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setCoords({ lat: lat, lng: lng });
        setPos({ lat: lat, lng: lng });

        // To update marker address position on map
        getAddress(lat, lng);
      })
      .catch(console.error);
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    // Set default response language and region
    setDefaults({
      key: apiKey, // Your API key here.
      language: "en", // Default language for responses.
      region: "us", // Default region for responses.
    });
  }, []);

  return (
    <div id='geocode-container'>
      <section className='field'>
        <button onClick={() => getCoords(formFields.address)}>
          Get Coordinates
        </button>
        <input
          id='address'
          type='text'
          placeholder='Enter Address...'
          value={formFields.address}
          onChange={handleChange}
        />
        <span class='title'>Coordinates:</span>
        {pos && pos.lat && pos.lng && (
          <section className='pos'>
            <span class='value'>
              {pos.lat}, {pos.lng}
            </span>
            <span>
              <button
                onClick={() =>
                  setFormFields({
                    ...formFields,
                    coords: `${pos.lat}, ${pos.lng}`,
                  })
                }
              >
                Copy Coords
              </button>
            </span>
          </section>
        )}
      </section>

      <section className='field'>
        <button
          onClick={() =>
            getAddress(
              formFields.coords.split(",")[0],
              formFields.coords.split(",")[1]
            )
          }
        >
          Get Address
        </button>
        <input
          id='coords'
          type='text'
          placeholder='Enter Coordinates...'
          value={formFields.coords}
          onChange={handleChange}
        />

        <span className='title'>Address:</span>
        {addr && showAddr && <span class='value'>{addr}</span>}
      </section>
    </div>
  );
};

export default GeoCode;
