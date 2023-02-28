import React, { useEffect, useState } from 'react';
import GardenGrid from './components/GardenGrid';
import GardenSetup from './components/GardenSetup';
import Login from './components/Login'

let username;
  
function App () {
  const [userInfo, setUserInfo] = useState({})
 
  useEffect(() => {
    username = sessionStorage.getItem('username')

    fetch(`http://localhost:9000/gro/api/users/${username}`)
    .then(response => response.json())
    .then(response => setUserInfo(response[0]))
  }, [])

  const renderGarden = () => {
    if (userInfo.layout?.length > 0) {
      return <GardenGrid userInfo={userInfo} />
    } else {
      return <GardenSetup username={username}/>
    }
  }

  const renderApp = () => {
    if (username?.length > 0) {
      return renderGarden()
    } else {
      return <Login />
    }
  }

  return (
    <div className='garden-container'>
      {renderApp()}
    </div>
  )
}
  
export default App;