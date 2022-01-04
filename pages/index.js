import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    // TODO: replace margins with flex items
    return (
        <>
            <div className="flex items-center justify-center h-96 flex-col">
                <h1 className="text-5xl font-bold text-primary">How's the water?</h1>
                <p className="mt-2 font-bold opacity-50">
                    Get real time water data using the <a href="https://USGS.gov" className="underline">USGS</a> API
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-3xl mt-5"
                        onClick={() => router.push('/map')}>
                    Get Started
                </button>
            </div>
        </>
    )
}