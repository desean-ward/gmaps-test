import React, { useEffect, useState } from "react";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const GMap = ({ coords, address }) => {
  const apiKey = process.env.REACT_APP_MAPS_API_KEY;
  const mapId = process.env.REACT_APP_MAP_ID;

  const [showInfoWindow, setShowInfoWindow] = useState(false);

  return (
    <APIProvider apiKey={apiKey}>
      <div id='map-container' style={{ height: "100svh" }}>
        {/* Map component */}
        <Map zoom={12} center={coords} mapId={mapId}>
          {/* Marker component */}
          <AdvancedMarker
            position={coords}
            onClick={() => setShowInfoWindow(true)}
          >
            {/* Pin component */}
            <Pin />
          </AdvancedMarker>

          {/* InfoWindow component */}
          {showInfoWindow && (
            <InfoWindow
              position={coords}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div>
                <p>{address}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default GMap;
