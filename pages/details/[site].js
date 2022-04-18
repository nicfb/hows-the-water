import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import {
    Line,
    LineChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer
  } from 'recharts'
import ParameterCodeDropDown from '../../components/ParameterCodeDropDown';
import PeriodDropDown from '../../components/PeriodDropDown';
import { PropagateLoader } from 'react-spinners';

//TODO: set api endpoint higher up somewhere
export default function SiteDetails() {
    const router = useRouter();
    const { site } = router.query;

    const [param, setParam] = useState('');
    const [paramCode, setParamCode] = useState('');
    const [period, setPeriod] = useState('');
    const [data, setData] = useState([]);
    const [siteName, setSiteName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        //set page title with site information
        fetch(`https://waterservices.usgs.gov/nwis/iv/?sites=${site}&format=json`)
        .then(response => response.json())
        .then(json => {
            if (json.value.timeSeries.length > 0) {
                setSiteName(json.value.timeSeries[0].sourceInfo.siteName);
            } else {
                setSiteName('');
            }
            setIsLoading(false);
        });
    }, [site])

    const handlePeriodChange = (e) => {
        let period = e.target.value;
        setPeriod(period);
        
        if (paramCode) {
            setIsLoading(true);
            fetch(`https://waterservices.usgs.gov/nwis/iv/?sites=${site}&period=${period}&parameterCd=${paramCode}&format=json`)
            .then(response => response.json())
            .then(json => {
                if (json.value.timeSeries.length > 0) {
                    setData(json.value.timeSeries[0].values[0].value);
                } else {
                    setData([]);
                }
                setIsLoading(false);
            });
        }
    }

    const handleParameterCodeChange = (e) => {
        let param = e.target.value;
        setParamCode(param);
        setParam(e.target.options[e.target.selectedIndex].text);
        
        if (period) {
            setIsLoading(true);
            fetch(`https://waterservices.usgs.gov/nwis/iv/?sites=${site}&period=${period}&parameterCd=${param}&format=json`)
            .then(response => response.json())
            .then(json => {
                if (json.value.timeSeries.length > 0) {
                    setData(json.value.timeSeries[0].values[0].value);
                } else {
                    setData([]);
                }
                setIsLoading(false);
            });
        }
    }

    const processData = (readings) => {
        //parse reading into struct for graph
        return readings.map(v => ({
            time: moment(v.dateTime).format("MMM DD HH:mm"),
            value: v.value
        }));
    }

    const findDomain = (data) => {
        const minY = 0;
        const maxY = 0;
        
        //find min/max y value to center graph
        if (data.length > 0) {
            const numData = data.map(v => parseInt(v.value));
            maxY = numData.reduce(function(prev, current) {
                return (prev > current ? prev : current);
            });
    
            minY = numData.reduce(function(prev, current) {
                return (prev < current ? prev : current);
            });
        }

        return [minY, maxY];
    }

    const paramCodeEnabled = (period !== "");
    const readings = processData(data);
    const domain = findDomain(data);
    
    return (
        <>
            <h2 className='flex justify-center text-center mt-5 font-mono font-bold'>{siteName}</h2>
            <div className='m-8 flex justify-center'>
                <div className='flex flex-col'>
                    <PeriodDropDown handlePeriodChange={handlePeriodChange}
                                    selectedValue={period} />
                    {
                        paramCodeEnabled
                        ?
                        <ParameterCodeDropDown site={site}
                                               handleParameterCodeChange={handleParameterCodeChange}
                                               selectedValue={paramCode} />
                        :
                        null
                    }
                </div>
            </div>
            {
                data.length != 0 && paramCode
                ?
                <div className="flex justify-center">
                    <ResponsiveContainer width="95%" height={550}>
                        <LineChart data={readings}>
                            <XAxis dataKey="time" />
                            <YAxis dataKey="value" domain={domain} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" name={param} stroke="#00A1E0" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                :
                data.length == 0 && paramCode && !isLoading
                ?
                <div className="flex justify-center">No data available.</div>
                :
                null
            }
            {
                isLoading
                ?
                <div className='flex justify-center mt-10 mb-10'>
                    <PropagateLoader />
                </div>
                :
                null
            }
        </>
    )
}
