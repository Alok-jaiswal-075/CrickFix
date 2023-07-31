import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AllPlayers from "./players/AllPlayers";
import Loading from './Utility/Loading';
import Button from './Utility/Button';
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
    const url = `/teams/${id}`
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
      setLoading(false)
    } catch (err) {
      window.alert(err)
    }
  }

  const handleDelete = async () => {
    let opt = window.confirm(`Are you sure you want to delete ${team.name}?`)
    if (opt) {
      try {
        const res = await fetch('/teams/' + id, {
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
    navigate('/editTeam/' + id)
  }

  useEffect(() => {
    getTeamDetails(id)
  }, [])

  return (
    loading ?
      <Loading />
      :
      <div className='w-full border'>
        <h1 className="text-6xl text-center my-8">{team.name}</h1>
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className='w-4/5 bg-col-bg-dark flex items-center justify-between p-4 my-4 rounded-xl'>
            <div className="flex items-center justify-evenly w-2/3">
              <div className='inline-block text-center'>
                <span className='text-4xl'>{team.matches_won}</span>
                <br />
                <span className='text-lg'>Wins</span>
              </div>
              <div className='inline-block text-center'>
                <span className='text-4xl'>{team.matches_won}</span>
                <br />
                <span className='text-lg'>Wins</span>
              </div>
              <div className='inline-block text-center'>
                <span className='text-4xl'>{team.matches_won}</span>
                <br />
                <span className='text-lg'>Wins</span>
              </div>
            </div>

            <div className="flex items-center border justify-center gap-8">
              <button ><img className="w-8 sm:w-10" src="./img/edit-icon.png" alt="Edit" /></button>
              <button ><img className="w-7 sm:w-8" src="./img/delete.png" alt="Edit" /></button>
            </div>


            {/* <button className='bg-col-btn text-col-bg-dark rounded-md mx-2 border border-col-btn py-2 px-4' onClick={() => { handleDelete() }}>Delete</button>
            <button className='bg-col-btn text-col-bg-dark rounded-md mx-2 border border-col-btn py-2 px-4' onClick={() => { goToEditTeam() }}>Edit</button> */}
          </div>
          <div className="flex flex-row">
            <div className="w-4/5">.</div>
            <div className="w-1/5">.</div>
          </div>
        </div>
      </div>
  );

};

export default Dashboard;
