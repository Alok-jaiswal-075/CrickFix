import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AllPlayers from "../players/AllPlayers";
import Loading from '../Utility/Loading';
import Button from '../Utility/Button';
import TeamRequest from './Request'
// import Request from "./teams/Request";


const Card = ({ title, children }) => {
  return (
    <div className="cards">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
};



const Dashboard = (props) => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [team, setTeam] = useState({})
  const [loading, setLoading] = useState(true)

  const getTeamDetails = async () => {
    const url = `/api/teams/${id}`
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const teamData = await res.json()
      setTeam(teamData)
      console.log(teamData.requests)
      setLoading(false)
    }
    catch (err) {
      window.alert(err)
    }
  }

  const handleDelete = async () => {
    let opt = window.confirm(`Are you sure you want to delete ${team.name}?`)
    if (opt) {
      try {
        const res = await fetch('/api/teams/' + id, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        })

        const data = await res.json();
        if (data) {
          window.alert(data.msg)
          navigate('/about')
        }

      } catch (error) {
        window.alert(error.msg)
      }
    }
  }

  const goToEditTeam = () => {
    navigate('/team/' + id)
  }

  useEffect(() => {
    getTeamDetails(id)
  }, [])



  const ReceivedRequests = (props) => {
    // console.log(props)
    const navigate = useNavigate()

    const handleAccept = async () => {
      navigate("/match/match_request_accept/" + props.matchId);
      // console.log(props.team2)
      // console.log(props.team1)
    }

    const handleReject = async () => {
      // console.log('hello')
      const res = await fetch("/api/teams/match_request_reject/" + props.id + "/" + props.player._id, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        }
      })

      const data = await res.json()
      if (!data) {
        window.alert("Invalid data")
      }
      else {
        window.alert(data.msg)
        navigate('/teamRequests/' + props.id)
      }
    }

    return (
      <div>
        <div className="rounded-md bg-col-bg-primary m-3 shadow-md p-2 shadow-col-btn/20 hover:shadow:xl hover:shadow-col-btn/50 transition-all duration-200">
          <div className="card-body">
            <h5 className="card-title">{props.team1.name}</h5>
            <button className='text-col-btn mx-2' onClick={handleAccept}>Accept</button>
            <button className='text-col-btn mx-2' onClick={handleReject}>Reject</button>
          </div>
        </div>
      </div>
    )
  }

  const SentRequests = (props) => {
    return (
      <div>
        <div className="rounded-md bg-col-bg-primary m-3 shadow-md p-2 shadow-col-btn/20 hover:shadow:xl hover:shadow-col-btn/50 transition-all duration-200">
          <div className="card-body">
            <h5 className="card-title">{props.team.name}</h5>
          </div>
        </div>
      </div>
    )
  }

  const AcceptedRequests = (props) => {
    const navigate = useNavigate()

    const handleBatting = async () => {
      const res = await fetch('/api/matches/setbatting/' + props.matchId, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json();
      console.log(data)

      navigate('/match/scoreboard/' + props.matchId)
    }

    const handleBowling = async () => {
      console.log('hello')
      const res = await fetch('/api/matches/setbowling/' + props.matchId, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json();
      console.log(data)

      navigate('/match/scoreboard/' + props.matchId)
    }

    return (
      <div>
        <div className="rounded-md bg-col-bg-primary m-3 p-2 shadow-md shadow-col-btn/20 hover:shadow:xl hover:shadow-col-btn/50 transition-all duration-200">
          <div className="card-body">
            <h5 className="card-title">{props.team.name}</h5>
            <button className='text-col-btn mx-2' onClick={handleBatting}>Bat</button>
            <button className='text-col-btn mx-2' onClick={handleBowling}>Bowl</button>
          </div>
        </div>
      </div>
    )
  }

  let temp = 0;

  return (
    loading ?
      <Loading />
      :
      <div className='w-full p-4'>
        <h1 className="text-4xl sm:text-6xl text-center my-8">{team.name}</h1>
        <div className="flex flex-col gap-4 items-center justify-center">
          {/* Wins-Lose section */}
          <div className='w-full sm:w-4/5 bg-col-bg-dark flex items-center justify-between p-4 my-4 rounded-xl'>
            <div className="flex items-center justify-evenly w-2/3">
              <div className='inline-block text-center'>
                <span className='text-3xl sm:text-4xl'>{team.matches_won}</span>
                <br />
                <span className='text-base sm:text-lg'>Wins</span>
              </div>
              <div className='inline-block text-center'>
                <span className='text-3xl sm:text-4xl'>{team.matches_lost}</span>
                <br />
                <span className='text-base sm:text-lg'>Lose</span>
              </div>
              <div className='inline-block text-center'>
                <span className='text-3xl sm:text-4xl'>{team.matches_draw}</span>
                <br />
                <span className='text-base sm:text-lg'>Draw</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8">
              <button onClick={goToEditTeam} title='Edit Team'><img className="w-8 sm:w-10" src="/img/edit-icon.png" alt="Edit" /></button>
              <button onClick={handleDelete} title='Delete Team'><img className="w-7 sm:w-8" src="/img/delete.png" alt="Delete" /></button>
            </div>


            {/* <button className='bg-col-btn text-col-bg-dark rounded-md mx-2 border border-col-btn py-2 px-4' onClick={() => { handleDelete() }}>Delete</button>
            <button className='bg-col-btn text-col-bg-dark rounded-md mx-2 border border-col-btn py-2 px-4' onClick={() => { goToEditTeam() }}>Edit</button> */}
          </div>

          {/* Requests Section */}
          <div className="w-full sm:w-4/5 bg-col-bg-dark rounded-xl p-4">
            <h2 className='text-3xl text-center my-5'>Match Requests</h2>
            {/* Different Request Sections */}
            <div className='w-full flex flex-row items-start justify-between'>
              {/* Sent Requests */}
              <div className='w-1/3 text-center'>
                <h2 className='text-lg font-medium mb-2'>Sent</h2>
                <ul className='list-none'>
                  {/* {
                    team.sent_match_requests && team.sent_match_requests.map((match) => (
                      <li className=''>{match.Team2.name}</li>
                    ))
                  } */}
                  {team.sent_match_requests && team.sent_match_requests.map((request) => <SentRequests key={temp++} team={request.Team2} />)}
                </ul>
              </div>
              {/* Recieved Requests */}
              <div className='w-1/3 text-center'>
                <h2 className='text-lg font-medium mb-2'>Recieved</h2>
                <ul className='list-none'>
                  {/* {
                    team.requests && team.received_match_requests.map((team) => (
                      <li className=''>{team.Team1}</li>
                    ))
                  } */}

                  {team.received_match_requests && team.received_match_requests.map((request) => <ReceivedRequests key={temp++} team1={request.Team1} team2={request.Team2} matchId={request._id} />)}

                </ul>
              </div>
              {/* Accepted Requests */}
              <div className='w-1/3 text-center'>
                <h2 className='text-lg font-medium mb-2'>Accepted</h2>
                <ul className='list-none'>
                  {
                    team.accepted_match_requests && team.accepted_match_requests.map((request) => <AcceptedRequests key={temp++} team={request.Team2} matchId={request._id} />)
                  }
                </ul>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full sm:w-4/5 flex flex-col sm:flex-row items-start justify-between gap-4">
            {/* Player Request Section */}
            <div className="w-full sm:w-2/5 bg-col-bg-dark rounded-xl p-4">
              <h2 className='text-center text-2xl mb-4'>Join Requests</h2>
              <ul className='list-none'>
              {team.requests && <div className="d-flex">
            {team.requests.map((player) => <TeamRequest key={temp++} player={player} id={id}/>)}
                    </div>}
                {/* {
                  team.requests && team.requests.map((player) => (
                    <li className='text-center'>{player.fname}</li>
                  ))

                } */}
              </ul>
            </div>

            {/* Team Players Section */}
            <div className="w-full sm:w-2/5 bg-col-bg-dark rounded-xl p-4">
              <h2 className='text-center text-2xl mb-4'>Players</h2>
              <ul className='list-none'>
                <li className='text-col-btn font-bold text-center'>{team.captain.fname + ' ' + team.captain.lname} C</li>
                {
                  team.players && team.players.map((player) => (
                    <li className='text-center'>{player.fname + ' ' + player.lname}</li>
                  ))

                }
              </ul>
            </div>
          </div>
        </div>
      </div>
  );

};

export default Dashboard;
