import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import './Header.css'

const Header = () => {

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    console.log(location)
  }, [location])

  const goToHome = () => {
    history.push('/')
  }

  const goToLogin = () => {
    history.push('/login')
  }

  return (
    <div id='header'>
      <p className='navigation' 
        style={{color: location.pathname == '/' ? '#800080' : ''}} 
        onClick={goToHome}
      >
        Home
      </p>
      <p 
        className='navigation' 
        style={{color: location.pathname == '/login' ? '#800080' : ''}} 
        onClick={goToLogin}>
        Login
      </p>
    </div>
  )
}

export default Header