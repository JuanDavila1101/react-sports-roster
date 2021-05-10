import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import PlayerForm from '../components/playerForms';

function AddPlayer({ setPlayers }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0]
        };
        setUser(userInfoObject);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
     <PlayerForm
       formTitle='Add a Player'
       setPlayers={setPlayers}
       user={user}
     />
    <hr/>
    </>
  );
}

AddPlayer.propTypes = {
  setPlayers: PropTypes.func.isRequired
};

export default AddPlayer;
