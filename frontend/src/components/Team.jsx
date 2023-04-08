import React from 'react'

const Team = (props) => {

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

            </div>
        </div>
        </div>
    )
}

export default Team