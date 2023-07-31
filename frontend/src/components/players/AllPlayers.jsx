import React, { useState, useEffect } from 'react';
import Loading from '../Utility/Loading';

const PlayerCard = ({ player }) => (

    <div className="w-fit bg-col-bg-dark p-5 drop-shadow-xl flex flex-col rounded-2xl hover:scale-110 duration-300 cursor-pointer">
        <h2 className="sm:text-2xl text-lg font-heading bg-col-bg-dark">{player.fname}&nbsp; {player.lname}</h2>
        <ul className="font-text mt-2 bg-col-bg-dark">
            <li className="bg-col-bg-dark">Age := {player.age}</li>
            <li className="bg-col-bg-dark">Contact := {player.contact}</li>
            <li className="bg-col-bg-dark">Email := {player.email}</li>
            <li className="bg-col-bg-dark">Teams := {player.teams_joined && player.teams_joined.map((team) => team.name+" | ")}</li>
        </ul>
    </div>
);

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://backend-crickfix.onrender.com/players/all-players')
      .then(response => response.json())
      .then(data => {
        setPlayers(data);
        setLoading(false)

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
    loading ? <Loading /> 
    :
    <div className="mt-28 grid grid-cols-12 gap-4">
      <div className="col-start-2 col-span-10 flex flex-col justify-center items-center font-text gap-8">
        <h1 className='my-7 sm:text-5xl text-2xl font-heading tracking-wider'>Players</h1>
          <input
            type="text"
            className="bg-transparent border-4 border-transparent border-b-col-btn  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
            placeholder="Search players"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        <div className="flex flex-wrap gap-10 justify-center mt-5">
          {filteredPlayers.map(player => (
            <PlayerCard key={player._id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersList;