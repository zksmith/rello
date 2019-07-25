import React from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './GoogleButton.scss';

const GoogleButton = () => (
  <button className='loginBtn loginBtn--google' onClick={signInWithGoogle}>
    Login with Google
  </button>
);

export default GoogleButton;
