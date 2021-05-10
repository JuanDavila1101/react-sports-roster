import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Players from '../../views/Players';
import AddPlayer from '../../views/AddPlayers';
import Home from '../../views/Home';
import SinglePlayer from '../../views/SinglePlayer';

export default function Routes({ players, setPlayers, user }) {
  return (
    <div>
      <Switch>
        <Route
          exact path='/' component={Home}
         />
        <Route
          exact
          path='/players'
          component={() => (<Players
                              players={players}
                              setPlayers={setPlayers}
                              user={user}
                             />)}
         />
        <Route
          path='/players/:playerID'
          component={SinglePlayer}
          user={user}
         />
        <Route
          exact
          path='/add-player'
          component={() => (<AddPlayer
                              setPlayers={setPlayers}
                              user={user}
                             />)}
         />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired
};
