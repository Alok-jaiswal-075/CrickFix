import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Team = (props) => {

    const navigate = useNavigate();
    
    const handleChoose = () => {
        navigate('/match/createMatch/'+props.team._id);
    }

    return (

        <button onClick={handleChoose} className="bg-col-bg-dark">
            <div className="bg-col-bg-dark p-5 drop-shadow-xl flex justify-start flex-col rounded-2xl hover:scale-110 duration-300">
                <h2 className="sm:text-2xl text-lg font-heading bg-col-bg-dark">{props.team.name}</h2>
                <ul className="font-text mt-2 bg-col-bg-dark">
                    <li className="bg-col-bg-dark">Location Based := {props.team.location_based}</li>
                    <li className="bg-col-bg-dark">Matches Played := {props.team.matches_played}</li>
                    <li className="bg-col-bg-dark">Matches Won := {props.team.matches_won}</li>
                    <li className="bg-col-bg-dark">Matches Lost := {props.team.matches_lost}</li>
                    <li className="bg-col-bg-dark">Matches Draw := {props.team.matches_draw}</li>
                </ul>
            </div>
        </button> 



        //  <div className="m-auto d-flex justify-content-center">
    //             <div className="card" style={{width: '18rem'}}>
    //             <div className="card-body">
    //             <h5 className="card-title">{props.team.name}</h5>
    //             </div>
                // <ul className="list-group list-group-flush">
                // <li className="list-group-item">Location Based: {props.team.location_based}</li>
                // <li className="list-group-item">Matches Played: {props.team.matches_played}</li>
                // <li className="list-group-item">Matches Won: {props.team.matches_won}</li>
                // <li className="list-group-item">Matches Lost: {props.team.matches_lost}</li>
                // <li className="list-group-item">Matches Draw: {props.team.matches_draw}</li>
                // <li className="list-group-item">Captain:  {props.team.captain.fname} {props.team.captain.lname}</li>
                // </ul>
    //             <div className="card-body">

    //             <button type="button" className="btn btn-success btn-sm m-2" >Choose</button>

    //             </div>
    //         </div>
    //     </div>
    )
}

const ChooseTeam = () => {
    let temp = 0;

    const [teams,setTeams] = useState([]);

    const fetchMyTeams = async () => {
            const res = await fetch('/teams/myteams', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            if(res.status === 200 && data){
                setTeams(data);
            }
            else window.alert("You don't have any team!!")
            // console.log(data)

        
    }

    useEffect(() => {
        fetchMyTeams();
    }, []);


    return (
        <div className="mt-28 grid grid-cols-12 gap-4">
            <div className=" flex justify-center col-start-2 col-span-10 font-text ">
                {teams && 
                    <div className='flex flex-wrap gap-10 justify-center'>
                        {teams && teams.map((team) => <Team key={temp++} team={team}/>)}
                    </div>
                }
            </div>
        </div>
    )
}

export default ChooseTeam