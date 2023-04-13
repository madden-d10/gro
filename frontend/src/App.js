import React, { useEffect, useState } from 'react';
import GardenGrid from './components/GardenGrid';
import GardenSetup from './components/GardenSetup';
import Login from './components/Login'
import './styles/App.css'

let username;
  
function App () {
  const [userInfo, setUserInfo] = useState({})
  const [isUserEditing, setIsUserEditing] = useState(false)
 
  useEffect(() => {
    username = sessionStorage.getItem('username')

    fetch(`http://localhost:9000/gro/api/users/${username}`)
    .then(response => response.json())
    .then(response => setUserInfo(response[0]))
  }, [])

  const renderGarden = () => {
    if (!isUserEditing) {
      return <GardenGrid userInfo={userInfo} setUserInfo={setUserInfo} />
    } else {
      return <GardenSetup username={username} isUserEditing={isUserEditing} userLayout={userInfo.layout} setIsUserEditing={setIsUserEditing}/>
    }
  }

  const handleEditRequest = async () => {
    await setIsUserEditing(true);
    // window.location.reload()
  }

  const handleLogoutRequest = () => {
    sessionStorage.removeItem('username')
    window.location.reload()
  }

  const renderEditButton = () => {
    if (!isUserEditing) {
      return <button onClick={handleEditRequest}>Edit</button>
    }
  }

  const renderApp = () => {
    if (username?.length > 0) {
      return (
        <div className='garden-container'>
          {renderGarden()}
          {renderEditButton()}
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