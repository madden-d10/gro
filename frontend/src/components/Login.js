import React from 'react';
import '../styles/Login.css'
  
function Login () {
  const handleLoginRequest = (response) => {
    if (response.message) {
      alert(response.message)
    } else {
      sessionStorage.setItem('username', response[0].username)
      window.location.reload()
    }
  }

  const userLogin = (loginInfo) => {
    const loginRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo)
    };

    fetch('http://localhost:9000/gro/api/login', loginRequestOptions)
      .then(response => response.json())
      .then(response => handleLoginRequest(response))
  }

  const submitLoginForm = (event) => {
    event.preventDefault()
    const loginInfo = {}
    loginInfo.username = event.target.username.value
    loginInfo.password = event.target.password.value

    userLogin(loginInfo)
  }

    return (
      <div className='login-form-container'>
      <h1>Login</h1>
        <form id="login-form" onSubmit={submitLoginForm}>
          <label>Username
            <input type="text" name="username" id="username" />
          </label>
          <label>Password
            <input type="password" name="password" id="password"/>
          </label>
          <input type="submit" value="Login"></input>
        </form>
      </div>
    )
}
  
export default Login;