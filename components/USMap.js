import React from 'react';
import { useRouter } from 'next/router';
import USAMap from 'react-usa-map';

export default function Map() {
    const router = useRouter();
    const mapHandler = (event) => {
        router.push('/map/' + event.target.dataset.name.toLowerCase());
    };

    return (
        <>
            <div className="flex justify-center">
                <USAMap onClick={mapHandler} />
            </div>
        </>
    );
}