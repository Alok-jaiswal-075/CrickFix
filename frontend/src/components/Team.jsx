import React from 'react'
import { useNavigate } from "react-router-dom";

const Team = (props) => {
    const navigate = useNavigate();

    const gotoEditPage = () =>{
        navigate('/team/'+props.team._id);
    }

    const handleDelete = async () => {
        try {
            const res = await fetch('/teams/'+props.team._id,{
                method : "DELETE",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json();
            if(data){
                window.alert(data.msg)
            }
                
        } catch (error) {
            window.alert(error.msg)
        }
    }


    return(
        <div className="m-auto d-flex justify-content-center">
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

            <button type="button" className="btn btn-success btn-sm m-2" onClick={gotoEditPage}>Edit</button>
            <button type="button" className="btn btn-danger btn-sm m-2" onClick={handleDelete}>Delete</button>

            </div>
        </div>
        </div>
    )
}

export default Team