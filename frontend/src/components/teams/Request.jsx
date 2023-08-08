import React from 'react'
import { useNavigate } from 'react-router-dom'


const TeamRequest = (props) => {
    const navigate = useNavigate()

    const handleAccept = async () =>{
        console.log('hello')

        const res = await fetch("/api/teams/request-accept/"+props.id+"/"+props.player._id, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            }
        })

        const data = await res.json()
        if(!data){
            window.alert("Invalid data")
        }
        else{
            window.alert(data.msg)
            navigate('/teamRequests/'+props.id)
        }
    }

    const handleReject = async () =>{
        console.log('hello')
        const res = await fetch("/api/teams/request-reject/"+props.id+"/"+props.player._id, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            }
        })

        const data = await res.json()
        if(!data){
            window.alert("Invalid data")
        }
        else{
            window.alert(data.msg)
            navigate('/teamRequests/'+props.id)
        }
    }

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.player.fname} {props.player.lname}</h5>
                    <button className='btn btn-success' onClick={handleAccept}>Accept</button>
                    <button className='btn btn-danger' onClick={handleReject}>Reject</button>
                </div>
            </div>
        </div>
    )
}


export default TeamRequest