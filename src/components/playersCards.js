import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Card, CardText, CardTitle, CardBody, CardSubtitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deletePlayer } from '../helpers/data/playersData';
import PlayerForm from './playerForms';

const PlayersCard = ({
  playerID,
  firstName,
  lastName,
  imageURL,
  position,
  setPlayers,
  uid,
  user,
}) => {
  const [editing, setEditing] = useState(false);
  const history = useHistory();
  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        // debugger;
        deletePlayer(playerID, user.uid).then((playersArray) => setPlayers(playersArray));
        break;
      case 'edit':
        debugger;
        setEditing((prevState) => !prevState);
        break;
      case 'view':
        history.push(`/players/${playerID}`);
        break;
      default:
        console.warn('default');
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
        <CardBody>
          <CardTitle tag="h5">Player: {firstName} {lastName}</CardTitle>
        </CardBody>
        <img width="100%" src={imageURL} alt="player image" />
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{position}</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card content.</CardText>
          <Button color="info" onClick={() => handleClick('view')}>View Player</Button>
          <Button color="success" onClick={() => handleClick('edit')}>
            {editing ? 'Close Form' : 'Edit Student' }
          </Button>
          <hr />
          <Button color="danger" onClick={() => handleClick('delete')}>Delete Player</Button>
          {editing && <PlayerForm
             formTitle='Edit player'
             setPlayers={setPlayers}
             playerID={playerID}
             firstName={firstName}
             lastName={lastName}
             imageURL={imageURL}
             position={position}
             uid={uid}
             user={user}
            />}
        </CardBody>
    </Card>
  );
};

PlayersCard.propTypes = {
  playerID: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  uid: PropTypes.string,
  setPlayers: PropTypes.func,
  user: PropTypes.any
};

export default PlayersCard;
