import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, Card, CardText, CardTitle, CardBody, CardSubtitle
} from 'reactstrap';
import { GetSinglePlayer } from '../helpers/data/playersData';

export default function SinglePlayer() {
  // Distructoring useParams to the PlayerID dynamically from the URL
  // playerID needs to match the Router
  const { playerID } = useParams();
  const [singlePlayer, setSinglePlayers] = useState({});
  const history = useHistory();

  useEffect(() => {
    GetSinglePlayer(playerID).then(setSinglePlayers);
  }, []);

  const handleClick = () => {
    history.push('/players/');
  };

  return (
    <>
    <Card style={{ width: '18rem' }}>
        <CardBody>
          <CardTitle tag="h5">Player: {singlePlayer.first_name} {singlePlayer.last_name}</CardTitle>
        </CardBody>
        <img width="100%" src={singlePlayer.imageURL} alt="player image" />
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{singlePlayer.position}</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card content.</CardText>
          <Button color="info" onClick={() => handleClick()}>back to Players</Button>
        </CardBody>
    </Card>
    </>
  );
}
