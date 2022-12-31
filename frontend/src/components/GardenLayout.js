import React, { useState, useEffect } from 'react';
import GardenGrid from './GardenGrid';
import GardenSetup from './GardenSetup'
import '../styles/GardenLayout.css'
  
function GardenLayout () {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch("http://localhost:9000/gro/api/users/user2")
        .then(res => res.json())
        .then(res => setUserInfo(res[0]))
        .catch(err => err);
    }, [])

    if (userInfo.layout?.length > 0) {
        return (
            <div id='gardenLayout-wrapper'>
                <GardenGrid />
            </div>
        )
    } else {
        return (
            <div id='gardenSetup-wrapper'>
            <GardenSetup />
        </div>
        )
    }

}
  
export default GardenLayout;