import React,{useState, useEffect} from 'react'
import { useParams, useNavigate} from "react-router-dom";


const SentRequests = (props) => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.team.name}</h5>
                </div>
            </div>
        </div>
    )
}

const ReceivedRequests = (props) => {
    const navigate = useNavigate()

    const handleAccept = async () =>{
        console.log('hello')

        const res = await fetch("/teams/match_request_accept/"+props.id+"/"+props.player._id, {
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
        const res = await fetch("/teams/match_request_reject/"+props.id+"/"+props.player._id, {
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
                    <h5 className="card-title">{props.team.name}</h5>
                    <button className='btn btn-success' onClick={handleAccept}>Accept</button>
                    <button className='btn btn-danger' onClick={handleReject}>Reject</button>
                </div>
            </div>
        </div>
    )
}

const AcceptedRequests = (props) => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.team.name}</h5>
                    {/* <button className='btn btn-success' onClick={handleStartMatch}>Start Match</button> */}
                </div>
            </div>
        </div>
    )
}


const TeamRequests = () => {
    let temp = 1;
    const params = useParams();
    
    const {id} = params

    const [requests, setRequests] = useState([])

    const fetchRequests = async () => {
        try {
            const res = await fetch('/teams/matchRequests/'+id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            setRequests(data)
            // console.log(data)
        } catch (error) {
            window.alert(error.msg)
        }
    }

    useEffect(() => {
        // callRequestsPage();
        fetchRequests();
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-2">
                    <h4>Sent Requests</h4>
                    {requests.sentRequests && 
                    <div className="d-flex">
                        {requests.sentRequests.map((request) => <SentRequests key={temp++} team={request.Team2}/>)}
                    </div>}
                </div>
                <div className="col-4">
                    <h4>Received Requests</h4>
                    {requests.receivedRequests && 
                    <div className="d-flex">
                        {requests.receivedRequests.map((request) => <ReceivedRequests key={temp++} team={request.Team1}/>)}
                    </div>}
                </div>
                <div className="col-4">
                    <h4>Accepted Requests</h4>
                    {requests.acceptedRequests && 
                    <div className="d-flex">
                        {requests.acceptedRequests.map((request) => <AcceptedRequests key={temp++} team={request.Team2}/>)}
                    </div>}
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}


export default TeamRequests