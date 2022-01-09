import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';

export default function USGSMap({state}) {
    const [sites, setSites] = useState([]);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState(0);

    //TODO: improve map dragging performance
    //TODO: use async/await
    useEffect(() => {
        //find center of all markers to center viewport
        const getCenter = (sites) => {
            if (sites === null) {
                return [0, 0];
            }
            if (sites.length === 1) {
                return [sites[0].lat, sites[0].lng];
            }
    
            let x = 0;
            let y = 0;
            let z = 0;
    
            for (let i = 0; i < sites.length; i++) {
                let lati = sites[i].lat * Math.PI / 180;
                let long = sites[i].lng * Math.PI / 180;
    
                x += Math.cos(lati) * Math.cos(long);
                y += Math.cos(lati) * Math.sin(long);
                z += Math.sin(lati);
            }
    
            x /= sites.length;
            y /= sites.length;
            z /= sites.length;
    
            let centerLong = Math.atan2(y, x);
            let centerSqrt = Math.sqrt(x * x + y * y);
            let centerLat = Math.atan2(z, centerSqrt);
    
            centerLong = centerLong * 180 / Math.PI;
            centerLat = centerLat * 180 / Math.PI;
            
            return [centerLat, centerLong];
        }

        fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&period=P1D&modifiedSince=PT2H&stateCd=${state}`)
        .then(response => response.json())
        .then(json => {
            const sites = []
            json.value.timeSeries.forEach(site => {
                var s = {
                    "num": site.sourceInfo.siteCode[0].value,
                    "name": site.sourceInfo.siteName,
                    "lat": site.sourceInfo.geoLocation.geogLocation.latitude,
                    "lng": site.sourceInfo.geoLocation.geogLocation.longitude
                }
                sites.push(s);
            });
            setSites(sites);
            let center = getCenter(sites);
            setLat(center[0]);
            setLng(center[1]);
        });
    }, [state]);
    
    return (
        <MapContainer lat={lat} lng={lng} markers={sites} />
    )
}
