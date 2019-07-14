import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import './Header.scss';

const Header = () => {
  return (
    <header className='main-header'>
      <Logo className='logo' fill='#fff' />
      <h1>Rello</h1>
    </header>
  );
};

export default Header;
