import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import { MultiSelect } from "react-multi-select-component";

// const options = [
//   { label: "Grapes 🍇", value: "grapes" },
//   { label: "Mango 🥭", value: "mango" },
//   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
// ];

const ChoosePlayers = () => {
  const params = useParams();

  const [selected, setSelected] = useState([]);
  const [overs, setOvers] = useState(2);
  const [team1data,setTeam1] = useState({})
  const [team2data,setTeam2] = useState({})
  const [feasible,setfeasible] = useState(0)

  const {team1,team2} = params

  // console.log(team1,team2)

  const fetchTeam1 = async () => {
    try {
      const res = await fetch('/teams/'+team1, {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          credentials: "include"
      })

      const data = await res.json();
      if(res.status === 200 && data){
          setTeam1(data);
          if(data.players.length < 4) setfeasible(1)
      }
      else{
        window.alert(data.msg)
      }

    } catch (error) {
        window.alert(error.msg)
    }
  }

  const fetchTeam2 = async () => {
    try {
      const res = await fetch('/teams/'+team2, {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          credentials: "include"
      })

      const data = await res.json();
      if(res.status === 200 && data){
          setTeam2(data);
          if(team2data.players.length < 4) setfeasible(1)
      }
      else{
        window.alert(data.msg)
      }

    } catch (error) {
        window.alert(error.msg)
    }
  }

  useEffect(() => {
    fetchTeam1();
    fetchTeam2();
}, []);


const options = team1data.players ? [team1data.players.map((player) => ({label : player.fname+" "+player.lname, value : player}))] : []

    const handlesubmit = () => {
        console.log(team1data)
    }

  return (
    <div>
      {feasible  ? <div>Not enough players</div> : 
        <div>
            <h3>Select Players in order of their batting</h3>
            <MultiSelect
                options={options}
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