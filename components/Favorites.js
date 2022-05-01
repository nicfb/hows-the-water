import React, { useContext } from 'react';
import { FavoritesContext } from './Context';
import { useRouter } from 'next/router';

export default function Favorites() {
    const router = useRouter();
    const { favoriteSites } = useContext(FavoritesContext);
    
    return (
        <>
            <div className='flex items-center flex-col pt-10'>
                <h1 className='underline font-bold pb-8'>Favorite Sites</h1>
                {
                    !favoriteSites
                    ?
                    (
                        <div>No favorite sites</div>
                    )
                    :
                    favoriteSites.map(site => (
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md text-white font-semibold m-2 p-2"
                                    onClick={() => {router.push(`/details/${site.num}`)}}>
                                {site.name}
                            </button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}