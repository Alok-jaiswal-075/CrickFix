import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Team from '../teams/Team'
import Loading from "../Utility/Loading";

const About = (props) => {
    let yourTeamsTemp = 1;
    let joinedTeamsTemp = 1;
    const navigate = useNavigate();

    const [player, setPlayerData] = useState({})
    const [playerCount, setPlayerCount] = useState(0)
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

            const countRes = await fetch('/players/all-players', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const players = await countRes.json()
            setPlayerCount(players.length)

            const data = await res.json();
            setPlayerData(data)
            // console.log(player.captainOf)
            // console.log(player.joined_teams)
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
        let opt = window.confirm('Are you sure you want to delete this account?')
        if (opt) {
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
    }


    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div className="m-4 flex flex-col items-center gap-20 sm:gap-24">

                <h1 className="text-center text-4xl sm:text-5xl my-6">Hi, {player.fname}!</h1>

                {/* User Info Section */}
                <div className="w-full flex flex-col items-center sm:flex-row sm:items-start sm:justify-center gap-16 sm:gap-10 ">

                    {/* User Info Card */}
                    <div className="bg-col-bg-dark drop-shadow-lg inline-block w-full sm:w-2/5 p-4 px-8 rounded-xl relative">

                        {/* User image */}
                        <div className=" w-full flex justify-center sm:justify-normal -translate-y-1/2 -mb-10 sm:-mb-14">
                            {/* Find 'big-smile' in the img src and replace it with the names of different styles from below link to change avatar style */}

                            {/* https://www.dicebear.com/styles/bottts */}
                            
                            <img className="rounded-full w-1/2 sm:w-1/3" src={`https://api.dicebear.com/6.x/big-smile/svg?seed=${player.fname}&backgroundColor=b6e3f4,c0aede,d1d4f9&scale=90&accessoriesProbability=50&backgroundType=gradientLinear,solid`} alt="User" />
                        </div>

                        <div className="flex items-center justify-between gap-0">
                            <h3 className="text-xl sm:text-3xl mb-4">Personal Information</h3>
                            <div className="flex flex-row items-center justify-center gap-4">
                                <button onClick={gotoEditPage}><img className="w-8 sm:w-10" src="./img/edit-icon.png" alt="Edit" /></button>
                                <button onClick={handleDelete}><img className="w-7 sm:w-8" src="./img/delete.png" alt="Edit" /></button>
                            </div>
                        </div>

                        <ul className="list-none text-sm sm:text-base">
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

                    {/* Player Stats Card */}
                    <div className="bg-col-bg-dark drop-shadow-lg inline-block w-full sm:w-2/5 p-4 px-8 rounded-xl relative">
                        <h3 className="text-xl sm:text-3xl mb-4">Player Statistics</h3>
                        <div className="flex flex-row w-full items-center justify-between gap-5">
                        <ul className="list-none text-sm sm:text-base">
                            <li className="my-2">Half Centuries: {player.centuries}</li>
                            <li className="my-2">Centuries:  {player.centuries}</li>
                            <li className="my-2">Total Score:  {player.total_score}</li>
                            <li className="my-2">Highest Score: {player.highest_score}</li>
                            <li className="my-2">Tournaments played: {player.tournaments_played}</li>
                        </ul>
                        <div className="flex text-lg sm:text-2xl flex-col items-start justify-center gap-2 mr-4">
                            <span>Rank :</span>
                            <p><span className="text-6xl sm:text-8xl">{player.ranking}</span>/{playerCount}</p>
                        </div>
                        </div>
                    </div>

                </div>


                {/* Display teams with user as captain */}
                <div className=" w-4/5 lg:w-2/3">
                    <h2 className="text-center text-3xl sm:text-4xl">Your Teams</h2>
                    {player.captainOf && <div className="flex flex-row p-8 items-end gap-6 overflow-x-scroll w-[90%]">
                        {player.captainOf.map((team) => <Team key={yourTeamsTemp++} team={team} isCaptain={1} />)}
                    </div>}
                </div>

                {/* Display teams with user in them */}
                {/* <div className=" w-4/5 lg:w-2/3">
                    <h2 className="text-center text-3xl sm:text-4xl">Your Teams</h2>
                    <div className="flex flex-row p-8 items-end gap-6 overflow-x-scroll w-[90%]">
                        {player.teams_joined.map((team) => <Team key={yourTeamsTemp++} team={team} isCaptain={0} />)}
                    </div>
                </div> */}
            </div>
        )
    }
}

export default About