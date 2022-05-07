import React, { useContext } from 'react';
import { FavoritesContext } from './Context';
import { useRouter } from 'next/router';

export default function Favorites() {
    const router = useRouter();
    const { favoriteSites, setFavoriteSites } = useContext(FavoritesContext);

    const deleteSite = (site) => {
        const index = favoriteSites.map(s => s.num).indexOf(site.num);
        setFavoriteSites(favoriteSites.filter((_, i) => i != index));
    }
    
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
                        <div key={site.num} className="flex align-middle">
                            <button className="bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md text-white font-semibold m-2 p-2"
                                    onClick={() => {router.push(`/details/${site.num}`)}}>
                                {site.name}
                            </button>
                            <button className="bg-white rounded-lg shadow-md border-2 border-red-600 w-10 h-10 mt-2"
                                    onClick={() => {deleteSite(site)}}>
                                <svg fill="red"
                                     viewBox="0 0 16 16"
                                     height="24"
                                     width="24"
                                     className="ml-1.5">
                                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}