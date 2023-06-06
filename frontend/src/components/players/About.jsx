import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Team from '../teams/Team'

const About = () => {
    let temp = 1;
    const navigate = useNavigate();

    const [player, setPlayerData] = useState({})
    const [requests, setRequests] = useState([]);

    // const callRequestsPage = async () => {
    //     try {
    //       const res = await fetch("/requests", {
    //         method: "GET",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //       });

    //       const data = await res.json();
    //       setRequests(data);
    //     } catch (error) {
    //       window.alert(error.msg);
    //     }
    //   };

    const callPlayerPage = async () => {
        try {
            const res = await fetch('/players', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            setPlayerData(data)
            // console.log(data)
        } catch (error) {
            window.alert(error.msg)
        }
    }

    useEffect(() => {
        // callRequestsPage();
        callPlayerPage();
    }, []);


    const gotoEditPage = () => {
        navigate('/editPlayer');
    }

    const handleDelete = async () => {
        try {
            const res = await fetch('/players', {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            if (data) {
                window.alert("Player deleted successfully")
            }
        } catch (error) {
            window.alert(error.msg)
        }
    }


    return (
        <div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{player.fname} {player.lname}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Age: {player.age}</li>
                            <li className="list-group-item">Email: {player.email}</li>
                            <li className="list-group-item">Contact: {player.contact}</li>
                            <li className="list-group-item">Ranking: {player.ranking}</li>
                            <li className="list-group-item">Half Centuries: {player.centuries}</li>
                            <li className="list-group-item">Centuries:  {player.centuries}</li>
                            <li className="list-group-item">Total Score:  {player.total_score}</li>
                            <li className="list-group-item">Highest Score: {player.highest_score}</li>
                            <li className="list-group-item">Tournaments played: {player.tournaments_played}</li>
                        </ul>
                        <div className="card-body">
                            <button type="button" className="btn btn-success btn-sm m-2" onClick={gotoEditPage}>Edit</button>
                            <button type="button" className="btn btn-danger btn-sm m-2" onClick={handleDelete}>Delete</button>

                        </div>


                    </div>
                </div>

                <div className="col-4">
                    {player.captainOf && <div className="d-flex">
                        {player.captainOf.map((team) => <Team key={temp++} team={team} isCaptain={1} />)}
                    </div>}
                </div>

                <div className="col-2"></div>
            </div>

        </div>

    )
}

export default About