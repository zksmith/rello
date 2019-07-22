import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { auth } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/actions/userActions';

import './App.css';
import Header from './components/header/Header';
import Board from './components/board/Board';

const App = ({ setCurrentUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      console.log(user);
      setCurrentUser(user);
    });
    return unsubscribeFromAuth;
  }, []);

  return (
    <>
      <Header />
      <Board />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
