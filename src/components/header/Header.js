import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import GoogleButton from './google-button/GoogleButton';

import './Header.scss';

const Header = () => {
  return (
    <header className='main-header'>
      <span className='logo'>
        <Logo fill='#fff' />
        <h1>Rello</h1>
      </span>
      <GoogleButton />
    </header>
  );
};

export default Header;
