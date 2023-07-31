import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Team = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleChoose = () => {
        navigate(location.pathname+"/"+props.team._id);
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
    )
}

const ChooseOpponent = () => {
    let temp = 0;

    const [teams,setTeams] = useState([]);

    const fetchOtherTeams = async () => {
        try {
            const res = await fetch('https://backend-crickfix.onrender.com/teams/otherTeams', {
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
        fetchOtherTeams();
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

export default ChooseOpponent