import React, { useState, useEffect } from 'react';
import GardenGrid from './components/GardenGrid';
import GardenSetup from './components/GardenSetup'
import './styles/GardenLayout.css'
  
function GardenLayout () {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch("http://localhost:9000/gro/api/users/user2")
        .then(res => res.json())
        .then(res => setUserInfo(res[0]))
        .catch(err => err);
    }, [])

    const renderGarden = () => {
      if (userInfo.layout?.length > 0) {
        return <GardenGrid userInfo={userInfo} />
      } else {
        return <GardenSetup />
      }
    }

    return (
      <div className='garden-container'>
        {renderGarden()}
      </div>
    )
}
  
export default GardenLayout;