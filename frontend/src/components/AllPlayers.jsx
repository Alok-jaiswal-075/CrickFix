import React, { useState, useEffect } from 'react';

const PlayerCard = ({ player }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{player.fname}&nbsp; {player.lname}</h5>
      <p className="card-text">Age: {player.age}</p>
      <p className="card-text">Contact: {player.contact}</p>
      <p className="card-text">Email: {player.email}</p>
    </div>
  </div>
);

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/players/all-players')
      .then(response => response.json())
      .then(data => {
        setPlayers(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filteredPlayers = players.filter(player => {
    const name = `${player.fname} ${player.lname}`.toLowerCase();
    return name.includes(searchQuery.toLowerCase());
    
  });

  return (
    <div className="container">
      <h1>Players List</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search players"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="card-deck d-flex flex-wrap">
        {filteredPlayers.map(player => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayersList;
