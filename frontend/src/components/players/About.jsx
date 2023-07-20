import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Team from '../teams/Team'
import Loading from "../Utility/Loading";

const About = (props) => {
    let temp = 1;
    const navigate = useNavigate();

    const [player, setPlayerData] = useState({})
    const [loading, setLoading] = useState(true)

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
            setLoading(false)

        } catch (error) {
            window.alert(error.msg)
        }

    }

    useEffect(() => {
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


    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div className="m-4 flex flex-col items-center gap-20 sm:gap-24">

                <h1 className="text-center text-4xl sm:text-5xl my-6">Hi, {player.fname}</h1>

                <div className="w-full flex flex-col items-center sm:flex-row sm:items-start sm:justify-center gap-16 sm:gap-28">

                    {/* User Info Card */}
                    <div className="bg-col-bg-dark drop-shadow-lg inline-block w-11/12 sm:w-2/5 p-4 rounded-xl relative">

                        <div className=" w-full flex justify-center sm:justify-normal -translate-y-1/2">
                            <img className="rounded-full w-1/2 sm:w-1/3" src="./img/sample-user.jpg" alt="User" />
                        </div>

                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl sm:text-3xl">Personal Information</h3>
                            <button><img className="w-8 sm:w-12" src="./img/edit-icon.png" alt="Edit" /></button>
                        </div>

                        <ul className="list-none">
                            <li className="my-2">Age: {player.age}</li>
                            <li className="my-2">Email: {player.email}</li>
                            <li className="my-2">Contact: {player.contact}</li>
                        </ul>

                        {/* <div className="card-body">
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

                        </div> */}
                        
                    </div>

                    {/* User Info Card */}
                    <div className="bg-col-bg-dark drop-shadow-lg inline-block w-11/12 sm:w-2/5 p-4 rounded-xl relative">
                    <h3 className="text-2xl sm:text-3xl">Personal Information</h3>
                        <ul className="list-none">
                            <li className="my-2">Ranking: {player.ranking}</li>
                            <li className="my-2">Half Centuries: {player.centuries}</li>
                            <li className="my-2">Centuries:  {player.centuries}</li>
                            <li className="my-2">Total Score:  {player.total_score}</li>
                            <li className="my-2">Highest Score: {player.highest_score}</li>
                            <li className="my-2">Tournaments played: {player.tournaments_played}</li>
                        </ul>
                        <div className="card-body">
                            <button type="button" className="btn btn-success btn-sm m-2" onClick={gotoEditPage}>Edit</button>
                            <button type="button" className="btn btn-danger btn-sm m-2" onClick={handleDelete}>Delete</button>

                        </div>
                        
                    </div>

                </div>


                {/* Display teams with user as captain */}
                <div className="">
                    {player.captainOf && <div className="flex flex-row p-8 items-center gap-4 overflow-x-scroll w-4/5">
                        {player.captainOf.map((team) => <Team className="w-24" key={temp++} team={team} isCaptain={1} />)}
                    </div>}
                </div>
            </div>
        )
    }
}

export default About