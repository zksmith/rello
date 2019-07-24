import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/actions/userActions';

import './App.css';
import Header from './components/header/Header';
import Board from './components/board/Board';

const App = ({ setCurrentUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    return unsubscribeFromAuth;
  }, [setCurrentUser]);

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
