import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Team from '../teams/Team'
import Loading from "../Utility/Loading";

const About = (props) => {
    let yourTeamsTemp = 1;
    const navigate = useNavigate();

    const [player, setPlayerData] = useState({})
    // const [playerCount, setPlayerCount] = useState(0)
    // const [teamList, setTeamList] = useState([])
    // const [loading, setLoading] = useState(true)

    const [aboutState, setAboutState] = useState({
        player: {},
        playerCount: 0,
        teamList: [],
        loading: true
    })

    const callPlayerPage = async () => {
        try {
            // fetching player data
            const res = await fetch('https://backend-crickfix.onrender.com/players', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const playerData = await res.json();
            console.log(playerData)
            setPlayerData(playerData)

        //     // fetching number of players
        //     const countRes = await fetch('https://backend-crickfix.onrender.com/players/all-players', {
        //         method: "GET",
        //         headers: {
        //             "Accept": "application/json",
        //             "Content-Type": "application/json"
        //         },
        //         credentials: "include"
        //     })
        //     const players = await countRes.json()
        //     // setPlayerCount(players.length)

        //     // fetching all teams the player is in
        //     // const teamRes = await fetch('https://backend-crickfix.onrender.com/teams',{
        //     //     method : "GET",
        //     //     headers : {
        //     //         "Accept" : "application/json",
        //     //         "Content-Type" : "application/json"
        //     //     },
        //     //     credentials: "include"
        //     // })

        //     // const teams = await teamRes.json()
        //     let tempTeamList = []
        //     // playerData.captainOf.forEach((team) => {
        //     //     tempTeamList.push(team)
        //     // })
        //     // teams.forEach(team => {
        //     //     if (!tempTeamList.includes(team) && team.players.includes(playerData)) {
        //     //         tempTeamList.push(team)
        //     //     }
        //     // })
        //     // setTeamList(tempTeamList)

        //     // console.log(aboutState.player.captainOf)
        //     // console.log(aboutState.player.joined_teams)
        //     // setLoading(false)

        //     setAboutState({
        //         player: playerData,
        //         playerCount: players.length,
        //         teamList: tempTeamList,
        //         loading: false
        //     })

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
                const res = await fetch('https://backend-crickfix.onrender.com/players', {
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


    if (aboutState.loading) {
        return (
            <Loading />
        )
    } else {
        return (
        <div className="">{player.fname}</div>
    //         <div className="m-4 flex flex-col items-center gap-20 sm:gap-24">

    //             <h1 className="text-center text-4xl sm:text-5xl my-6">Hi, {aboutState.player.fname}!</h1>

    //             {/* User Info Section */}
    //             <div className="w-full flex flex-col items-center sm:flex-row sm:items-start sm:justify-center gap-16 sm:gap-10 ">

    //                 {/* User Info Card */}
    //                 <div className="bg-col-bg-dark drop-shadow-lg inline-block w-full sm:w-2/5 p-4 px-8 rounded-xl relative">

    //                     {/* User image */}
    //                     <div className=" w-full flex justify-center sm:justify-normal -translate-y-1/2 -mb-10 sm:-mb-14">
    //                         {/* Find 'big-smile' in the img src and replace it with the names of different styles from below link to change avatar style */}

    //                         {/* https://www.dicebear.com/styles/bottts */}

    //                         <img className="rounded-full w-1/2 sm:w-1/3" src={`https://api.dicebear.com/6.x/big-smile/svg?seed=${aboutState.player.fname}&backgroundColor=b6e3f4,c0aede,d1d4f9&scale=90&accessoriesProbability=50&backgroundType=gradientLinear,solid`} alt="User" />
    //                     </div>

    //                     <div className="flex items-center justify-between gap-0">
    //                         <h3 className="text-xl sm:text-3xl mb-4">Personal Information</h3>
    //                         <div className="flex flex-row items-center justify-center gap-4">
    //                             <button onClick={gotoEditPage}><img className="w-8 sm:w-10" src="./img/edit-icon.png" alt="Edit" /></button>
    //                             <button onClick={handleDelete}><img className="w-7 sm:w-8" src="./img/delete.png" alt="Edit" /></button>
    //                         </div>
    //                     </div>

    //                     <ul className="list-none text-sm sm:text-base">
    //                         <li className="my-2">Age: {aboutState.player.age}</li>
    //                         <li className="my-2">Email: {aboutState.player.email}</li>
    //                         <li className="my-2">Contact: {aboutState.player.contact}</li>
    //                     </ul>

    //                     {/* <div className="card-body">
    //                         <h5 className="card-title">{aboutState.player.fname} {aboutState.player.lname}</h5>
    //                     </div>
    //                     <ul className="list-group list-group-flush">
    //                         <li className="list-group-item">Age: {aboutState.player.age}</li>
    //                         <li className="list-group-item">Email: {aboutState.player.email}</li>
    //                         <li className="list-group-item">Contact: {aboutState.player.contact}</li>
    //                         <li className="list-group-item">Ranking: {aboutState.player.ranking}</li>
    //                         <li className="list-group-item">Half Centuries: {aboutState.player.centuries}</li>
    //                         <li className="list-group-item">Centuries:  {aboutState.player.centuries}</li>
    //                         <li className="list-group-item">Total Score:  {aboutState.player.total_score}</li>
    //                         <li className="list-group-item">Highest Score: {aboutState.player.highest_score}</li>
    //                         <li className="list-group-item">Tournaments played: {aboutState.player.tournaments_played}</li>
    //                     </ul>
    //                     <div className="card-body">
    //                         <button type="button" className="btn btn-success btn-sm m-2" onClick={gotoEditPage}>Edit</button>
    //                         <button type="button" className="btn btn-danger btn-sm m-2" onClick={handleDelete}>Delete</button>

    //                     </div> */}

    //                 </div>

    //                 {/* Player Stats Card */}
    //                 <div className="bg-col-bg-dark drop-shadow-lg inline-block w-full sm:w-2/5 p-4 px-8 rounded-xl relative">
    //                     <div className="flex flex-row w-full items-center justify-between gap-5">
    //                         <div>
    //                             <h3 className="text-xl sm:text-3xl mb-4">Player Statistics</h3>
    //                             <ul className="list-none text-sm sm:text-base">
    //                                 <li className="my-2">Half Centuries: {aboutState.player.centuries}</li>
    //                                 <li className="my-2">Centuries:  {aboutState.player.centuries}</li>
    //                                 <li className="my-2">Total Score:  {aboutState.player.total_score}</li>
    //                                 <li className="my-2">Highest Score: {aboutState.player.highest_score}</li>
    //                                 <li className="my-2">Tournaments played: {aboutState.player.tournaments_played}</li>
    //                             </ul>
    //                         </div>

    //                         <div className="flex text-lg sm:text-2xl flex-col items-start justify-center gap-2 mr-4">
    //                             <span>Rank :</span>
    //                             <p><span className="text-6xl sm:text-8xl">{aboutState.player.ranking}</span>/{aboutState.playerCount}</p>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>


    //             {/* Display teams with user as captain */}
    //             <div className=" w-full lg:w-2/3">
    //                 <h2 className="text-center text-3xl sm:text-4xl">Your Teams</h2>
    //                 {aboutState.player.captainOf && <div className="flex flex-row p-8 items-end gap-6 overflow-x-scroll w-[90%]">
    //                     {aboutState.player.captainOf.map((team) => <Team key={yourTeamsTemp++} team={team} isCaptain={1} />)}
    //                 </div>}
    //                 <p className="text-center my-4"><a className="text-col-bg-dark bg-col-btn px-4 py-2 rounded-3xl border border-col-btn hover:bg-transparent hover:text-col-btn transition-all duration-200" href="/newTeam">New Team</a></p>
    //             </div>

    //             {/* Display teams with user in them */}
    //             <div className=" w-4/5 lg:w-2/3">
    //                 <h2 className="text-center text-3xl sm:text-4xl">Joined Teams</h2>
    //                 <div className="flex flex-row p-8 items-end gap-6 overflow-x-scroll w-[90%]">
    //                     {aboutState.teamList.map((team) => <Team key={yourTeamsTemp++} team={team} isCaptain={0} />)}
    //                 </div>
    //             </div>
    //         </div>
        )
    }
}

export default About