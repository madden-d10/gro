import React from 'react';
import '../styles/Login.css'
  
function Login () {
  const handleLoginRequest = (response) => {
    if (response.message) {
      document.querySelector(`#username`).classList.add('error')
      document.querySelector(`#password`).classList.add('error')
      document.querySelector(`.error-text`).classList.remove('hide')
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
      <h1><img src='/largeLogo.jpg' alt='application logo'></img>Gro</h1>
      <h2 className='login-title'>Login</h2>
        <form id="login-form" onSubmit={submitLoginForm}>
          <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            <br />
          <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"/>
            <p className='error-text hide' ><i>Username or password is incorrect</i></p>
          <input type="submit" value="Login"></input>
        </form>
      </div>
    )
}
  
export default Login;