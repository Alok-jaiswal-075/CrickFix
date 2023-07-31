import React, { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import { MultiSelect } from "react-multi-select-component";

// const options = [
//   { label: "Grapes 🍇", value: "grapes" },
//   { label: "Mango 🥭", value: "mango" },
//   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
// ];

const ChoosePlayers = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [overs, setOvers] = useState(2);
  const [team1data,setTeam1] = useState({})
  const [team2data,setTeam2] = useState({})
  const [feasible,setfeasible] = useState(1)
  let options = []

  const {team1,team2} = params

  // console.log(team1,team2)

  const fetchTeam1 = async () => {
      const res = await fetch('/teams/'+team1, {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          credentials: "include"
      })

      const data = await res.json();
      setTeam1(data);
      if(team1data) setfeasible(0)
      // console.log(data)

  }

  const fetchTeam2 = async () => {
      const res = await fetch('/teams/'+team2, {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          credentials: "include"
      })

      const data = await res.json();
      setTeam2(data);
      if(team2data) setfeasible(0)
      // console.log(data)

  }


  useEffect(() => {
    fetchTeam1();
    fetchTeam2();
}, []);


// const options = team1data.players && !feasible ? [team1data.players.map((player) => ({label : player.fname+" "+player.lname, value : player}))] : []


    const handlesubmit = async () => {
        // team1data.players = selected
        let players = []
        if(selected) players = selected.map(player => player.value)
        try {
          const res = await fetch('/matches/request/'+team1+"/"+team2, {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(
                    {players : players, overs:overs}
                )
              })
  
              const data = await res.json();
              if(data) window.alert(data.msg)
              navigate('/team/matchRequests/'+team1)
                  
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
                options={team1data.players ? team1data.players.map((player) => ({label : player.fname+" "+player.lname, value : player})) : []}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
            />

            {/* {props.requesting && <h3>Select number of overs</h3>}
            {props.requesting && <input type="number" name="overs" value={overs} onChange={(e) => {setOvers(e.target.value)}}/>} */}
            <h3>Select number of overs</h3>
            <input type="number" name="overs" value={overs} onChange={(e) => {setOvers(e.target.value)}}/>

            <button className="btn btn-success" onClick={handlesubmit}>Submit</button>
        </div>}
    </div>
    
  );
};

export default ChoosePlayers;