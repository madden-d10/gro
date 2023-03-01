import React, { useEffect, useState } from 'react';
import GardenGrid from './components/GardenGrid';
import GardenSetup from './components/GardenSetup';
import Login from './components/Login'
import './styles/App.css'

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

  const handleLogoutRequest = () => {
    sessionStorage.removeItem('username')
    window.location.reload()
  }

  const renderApp = () => {
    if (username?.length > 0) {
      return (
        <div className='garden-container'>
          {renderGarden()}
          <button onClick={handleLogoutRequest}>Logout</button>
        </div>
      )
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