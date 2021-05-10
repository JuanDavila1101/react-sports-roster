import React from 'react';
import PropTypes from 'prop-types';
import PlayersCard from '../components/playersCards';

function Players({ players, setPlayers, user }) {
  return (
    <>
    <div className="card-container">
    {players.map((playerInformation) => (
      <PlayersCard
          key={playerInformation.playerID}
          playerID={playerInformation.playerID}
          firstName={playerInformation.first_name}
          lastName={playerInformation.last_name}
          imageURL={playerInformation.imageURL}
          position={playerInformation.position}
          uid={playerInformation.uid}
          setPlayers={setPlayers}
          user={user}
      />
    ))}
    </div>
    </>
  );
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired
};

export default Players;
