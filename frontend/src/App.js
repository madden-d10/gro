import React, { useEffect, useState } from 'react';
import GardenGrid from './components/GardenGrid';
import GardenSetup from './components/GardenSetup';
import Login from './components/Login'
import './styles/App.css'

const username =sessionStorage.getItem('username')

function App () {
  const [userInfo, setUserInfo] = useState({})
  const [isUserEditing, setIsUserEditing] = useState(false)
 
  useEffect(() => {

    fetch(`http://localhost:9000/gro/api/users/${username}`)
    .then(response => response.json())
    .then(response => setUserInfo(response[0]))
  }, [])

  const renderGarden = () => {
    console.log(userInfo.layout?.length)
    if ((!isUserEditing && userInfo.layout?.length === 0) || (isUserEditing && userInfo.layout?.length > 0)) {
      return <GardenSetup 
      username={username} 
      isUserEditing={isUserEditing}
      userInfo={userInfo}
      />
    } else {
      return <GardenGrid userInfo={userInfo} setUserInfo={setUserInfo} />
    }
  }

  const handleEditRequest = async () => {
    await setIsUserEditing(true);
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