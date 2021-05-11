import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  // console.warn('all players', `${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`);
  // debugger;
  axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// ADD PLAYER
const addPlayer = (playerObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, playerObject)
    .then((response) => {
      const body = { playerID: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, body)
        .then(() => {
          getPlayers(uid).then((playersArray) => resolve(playersArray));
        });
    }).catch((error) => reject(error));
});

const deletePlayer = (playerID, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${playerID}.json`)
    .then(() => getPlayers(uid).then((playersArray) => resolve(playersArray)))
    .catch((error) => reject(error));
});

const updatePlayer = (playerObject, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/players/${playerObject.playerID}.json`, playerObject)
    .then(() => getPlayers(uid).then((playersArray) => resolve(playersArray)))
    .catch((error) => reject(error));
});

const GetSinglePlayer = (playerID) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players/${playerID}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  addPlayer, getPlayers, deletePlayer, updatePlayer, GetSinglePlayer
};
