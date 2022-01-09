import React, { useContext } from "react";
import { useRouter } from 'next/router';
import { Popup } from "react-map-gl";

export default function CustomPopup({idx, lat, lng, site, closePopup}) {
    const router = useRouter();

    const favorite = () => {
        console.log(`added ${site.name} (${site.num}) to favorites`);
        site.favorite = !site.favorite;
    };

    return (
        <Popup
            key={`popup-${idx}`}
            latitude={lat}
            longitude={lng}
            dynamicPosition={true}
            onClose={closePopup}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom">
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="h-6 w-6"
                 fill={site.favorite ? "red" : "white"}
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 onClick={favorite}>
                <path strokeLinecap="round"
                      color={site.favorite ? "red" : "black"}
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div className="p-3 mt-3">
                {site.name}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md text-white font-semibold m-2 p-2 float-right"
                    onClick={() => {router.push(`/details/${site.num}`)}}>
                Details
            </button>
        </Popup>
    )
}