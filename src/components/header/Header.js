import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import GoogleButton from './google-button/GoogleButton';

import './Header.scss';

const Header = ({ user }) => {
  return (
    <header className='main-header'>
      <span className='logo'>
        <Logo fill='#fff' />
        <h1>Rello</h1>
      </span>
      {user ? (
        <span style={{ position: 'fixed', right: '0', padding: '10px' }}>
          {user.displayName}, Sign Out
        </span>
      ) : (
        <GoogleButton />
      )}
    </header>
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Header);
