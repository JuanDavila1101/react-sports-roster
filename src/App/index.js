import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { getPlayers } from '../helpers/data/playersData';
import './App.scss';
import NavBar from '../components/NavBar';
import Routes from '../helpers/data/Routes';

function App() {
  const [players, setPlayers] = useState([]);
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
        // debugger;
        if (authed !== null) {
          getPlayers(authed.uid).then((resp) => setPlayers(resp));
        }
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   debugger;
  //   if (user !== null) {
  //     getPlayers(user.uid).then((resp) => setPlayers(resp));
  //   }
  // }, []);

  return (
     <>
       <Router>
       <NavBar user={user}/>
       <Routes
         players={players}
         setPlayers={setPlayers}
         user={user}
        />
       </Router>
     </>
  );
}

export default App;
