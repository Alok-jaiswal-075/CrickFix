import React from 'react'
import { useNavigate } from 'react-router-dom'


const TeamRequest = (props) => {
    const navigate = useNavigate()

    const handleAccept = async () =>{
        // console.log('hello')

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
            navigate('/team/dashboard/'+props.id)
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
            navigate('/team/dashboard/'+props.id)
        }
    }

    return (
        <div className="rounded-md bg-col-bg-primary m-3 p-2 shadow-md shadow-col-btn/20 hover:shadow:xl hover:shadow-col-btn/50 transition-all duration-200 text-center">
          <div className="card-body">
            <h5 className="card-title">{props.player.fname} {props.player.lname}</h5>
            <button className='text-col-btn mx-2' onClick={handleAccept}>Accept</button>
            <button className='text-col-btn mx-2' onClick={handleReject}>Reject</button>
          </div>
        </div>
        // <div>
        //     <div className="card">
        //         <div className="card-body">
        //             <h5 className="card-title">{props.player.fname} {props.player.lname}</h5>
        //             <button className='btn btn-success' onClick={handleAccept}>Accept</button>
        //             <button className='btn btn-danger' onClick={handleReject}>Reject</button>
        //         </div>
        //     </div>
        // </div>
    )
}


export default TeamRequest