import React from 'react';
import {useRouter} from 'next/router';
import USGSMap from '../../components/USGSMap';

export default function StateMap() {
    const router = useRouter();
    const { state } = router.query;

    return (
        router.isReady ? <USGSMap state={state} /> : null
    )
}