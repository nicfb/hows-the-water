import React from "react";
import {Marker} from "react-map-gl";

export default function CustomMarker({idx, site, openPopup}) {
    const markerIcon = 'm 10 35 l 15 30 l 15 -30 A 20 20 180 1 0 10 35 z'
    return (
        <Marker key={idx}
                latitude={site.lat}
                longitude={site.lng}>
            <svg viewBox="-8 0 55 65" height="20" onClick={() => openPopup(site.num)}>
              <path d={markerIcon} fill="white" />
            </svg>
        </Marker>
    )
}