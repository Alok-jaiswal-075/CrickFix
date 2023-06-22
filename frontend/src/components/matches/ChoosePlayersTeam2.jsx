import React, { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import { MultiSelect } from "react-multi-select-component";

const ChoosePlayersTeam2 = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [team2data,setTeam2] = useState({})
  const [feasible,setfeasible] = useState(1)

  const {matchId} = params

  const fetchMatchDetails = async () => {
    const res = await fetch('/matches/'+matchId, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    })

    const data = await res.json();
    if(res.status === 200){
        setTeam2(data.Team2)
        if(team2data) setfeasible(0)
    }
    // console.log(team1data)
    // console.log(team2data)
  }


  useEffect(() => {
    fetchMatchDetails();
}, []);



    const handlesubmit = async () => {
        // team1data.players = selected
        let players = []
        if(selected) players = selected.map(player => player.value)
        try {
          const res = await fetch('/matches/match_request_accept/'+matchId, {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(
                    {players : players}
                )
              })
  
              const data = await res.json();
              if(data) window.alert(data.msg)
              navigate('/team/matchRequests/'+team2data._id)
                  
          } catch (error) {
              console.log(error)
          }

    }


    

  return (
    <div>
      {feasible  ? <div>Not enough players</div> : 
        <div>
            <h3>Select Players in order of their batting</h3>
            <MultiSelect
                options={team2data.players ? team2data.players.map((player) => ({label : player.fname+" "+player.lname, value : player})) : []}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
            />

            {/* {props.requesting && <h3>Select number of overs</h3>}
            {props.requesting && <input type="number" name="overs" value={overs} onChange={(e) => {setOvers(e.target.value)}}/>} */}

            <button className="btn btn-success" onClick={handlesubmit}>Accept</button>
        </div>}
    </div>
    
  );
};

export default ChoosePlayersTeam2;