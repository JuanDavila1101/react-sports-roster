import React, { useState } from 'react';
import {
  FormGroup, Form, Label, Input, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addPlayer, updatePlayer } from '../helpers/data/playersData';

const PlayerForm = ({
  formTitle,
  setPlayers,
  playerID,
  imageURL,
  firstName,
  lastName,
  position,
  uid,
  user,
}) => {
  const [player, setPlayer] = useState({
    playerID: playerID || null,
    imageURL: imageURL || '',
    first_name: firstName || '',
    last_name: lastName || '',
    position: position || '',
    uid: uid || user ? user.uid : ''
  });

  const handleInputChange = (e) => {
    setPlayer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      uid: user ? user.uid : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.playerID) {
      updatePlayer(player, uid).then((response) => setPlayers(response));
    } else {
      addPlayer(player, user.uid).then((response) => setPlayers(response));

      setPlayer({
        imageURL: '',
        first_name: '',
        last_name: '',
        position: '',
        playerID: null,
        uid: ''
      });
    }
  };

  return (
    <>
    <div className='player-form'>
      <Form id='addPlayerForm' autoComplete='off' onSubmit={handleSubmit}>
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label>Player&#39;s First Name:</Label>
          <Input
            name='first_name'
            id='first_name'
            type='text'
            placeholder='Enter a Player&#39;s First Name'
            value={player.first_name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Player&#39;s Last Name:</Label>
          <Input
            name='last_name'
            id='last_name'
            type='text'
            placeholder='Enter a Player&#39;s First Name'
            value={player.last_name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Image URL:</Label>
          <Input
            name='imageURL'
            id='imageURL'
            type='text'
            placeholder='Enter a Player&#39;s image URL'
            value={player.imageURL}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Position:</Label>
          <Input
            name='position'
            id='position'
            type='text'
            placeholder='Enter a Player&#39;s Position'
            value={player.position}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
    </>
  );
};

PlayerForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPlayers: PropTypes.func,
  playerID: PropTypes.string,
  imageURL: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  position: PropTypes.string,
  uid: PropTypes.string,
  user: PropTypes.any
};

export default PlayerForm;
