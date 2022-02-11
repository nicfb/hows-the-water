import React, {useState, useEffect, useCallback, useMemo} from "react";
import MapGL, {Marker, Popup} from "react-map-gl";
import CustomMarker from "./CustomMarker";
import CustomPopup from "./CustomPopup";

export default function MapContainer({latLng, markers, addMarker}) {
  const [selectedSite, setSelectedSite] = useState('');
  const [viewport, setViewport] = useState({});
  const [newMarker, setNewMarker]  = useState(null);
  const [newMarkerName, setNewMarkerName] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setViewport({
      latitude: latLng[0],
      longitude: latLng[1],
      zoom: 8
    })
  }, [latLng]);

  const closePopup = () => {
    setSelectedSite('');
  };

  const openPopup = (idx) => {
    setSelectedSite(idx);
  }

  const closeNewMarkerPopup = () => {
    setNewMarker(null);
  }

  const clearAllMarkers = () => {
    setSelectedSite('');
    setNewMarker(null);
  }

  const showAddMarkerPopup = (e) => {
    setNewMarker({
      lng: e.lngLat[0],
      lat: e.lngLat[1],
      name: ""
    });
  }

  const handleAddNewMarker = useCallback((name, lat, lng) => {
    addMarker(name, lat, lng);
  }, [addMarker])

  const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  
  const memoizedMarkers = useMemo(() => markers.filter(site => (
      site.name.includes(keyword) || site.num.includes(keyword))
    ).map((s, i) => (
      <CustomMarker
        key={`site-${i}`}
        idx={i}
        site={s}
        openPopup={openPopup} />
  )), [markers, keyword]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value.toUpperCase());
  }
  
  return (
    <>
      <input value={keyword} onChange={handleSearchChange} placeholder='Search Markers' />
      <MapGL
        {...viewport}
        width="100vw"
        height="90vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_API_KEY}
        onClick={clearAllMarkers}
        onDblClick={showAddMarkerPopup}
        doubleClickZoom={false}
      >
        {
          memoizedMarkers
        }
        {
          selectedSite !== '' &&
          <CustomPopup
            idx={selectedSite}
            lat={markers[selectedSite].lat}
            lng={markers[selectedSite].lng}
            site={markers[selectedSite]}
            closePopup={closePopup} />
        }
        {
          newMarker ? (
            <>
              <Marker
                latitude={newMarker.lat}
                longitude={newMarker.lng}>
                <svg viewBox="-8 0 55 65" height="20">
                  <path d="m 10 35 l 15 30 l 15 -30 A 20 20 180 1 0 10 35 z" fill="blue" />
                </svg>
              </Marker>
              <Popup
                latitude={newMarker.lat}
                longitude={newMarker.lng}
                onClose={closeNewMarkerPopup}
                closeButton={true}
                closeOnClick={false}
              >
                <div className="p-3">
                  <h1>Add a New Marker</h1>
                  <input type="text"
                    className="form-control border-2 border-black rounded"
                    name="Title"
                    value={newMarkerName}
                    onChange={e => setNewMarkerName(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md text-white font-semibold m-2 p-2"
                    onClick={handleAddNewMarker(newMarkerName, newMarker.lat, newMarker.lng)}
                  >
                    Save
                  </button>
                </div>
              </Popup>
            </>
          )
          : null
        }
      </MapGL>
    </>
  );
}
