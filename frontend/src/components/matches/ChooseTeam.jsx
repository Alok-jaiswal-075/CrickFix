import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Team = (props) => {

    const navigate = useNavigate();
    
    const handleChoose = () => {
        navigate('/match/createMatch/'+props.team._id);
    }

    return ( <div className="m-auto d-flex justify-content-center">
                <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                <h5 className="card-title">{props.team.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                <li className="list-group-item">Location Based: {props.team.location_based}</li>
                <li className="list-group-item">Matches Played: {props.team.matches_played}</li>
                <li className="list-group-item">Matches Won: {props.team.matches_won}</li>
                <li className="list-group-item">Matches Lost: {props.team.matches_lost}</li>
                <li className="list-group-item">Matches Draw: {props.team.matches_draw}</li>
                <li className="list-group-item">Captain:  {props.team.captain.fname} {props.team.captain.lname}</li>
                </ul>
                <div className="card-body">

                <button type="button" className="btn btn-success btn-sm m-2" onClick={handleChoose}>Choose</button>

                </div>
            </div>
        </div>
    )
}

const ChooseTeam = () => {

    const [teams,setTeams] = useState([]);

    const fetchMyTeams = async () => {
        try {
            const res = await fetch('/teams/myteams', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            if(data){
                setTeams(data);
            }
            else window.alert("You don't have any team!!")

        } catch (error) {
            window.alert(error.msg)
        }
    }

    useEffect(() => {
        fetchMyTeams();
    }, []);


    return (
        <div>
            {teams && <div className='d-flex flex-wrap'>
            {teams.map((team) => <Team key={temp++} team={team}/>)}
        </div>}
        </div>
    )
}

export default ChooseTeam