import React from 'react';
import '../styles/globals.css';
import Link from 'next/link';
import 'mapbox-gl/dist/mapbox-gl.css';

//TODO: add formatting action in git
function HowsTheWater({ Component, pageProps }) {
    const linkStyle = "mr-6 cursor-pointer font-bold text-blue-500 hover:text-blue-700";

    return (
    <>
        <div className="App">
            <div className="flex justify-center space-x-4">
                <nav className="p-6 border-b border-gray-300 text-white">
                    <Link href="/">
                        <span className={linkStyle}>Home</span>
                    </Link>
                    <Link href="/map">
                        <span className={linkStyle}>How's the Water?</span>
                    </Link>
                </nav>
            </div>
        </div>
        <Component {...pageProps} />
    </>
  )
}

export default HowsTheWater