import React,{useState, useEffect} from 'react'
import { useParams} from "react-router-dom";
import TeamRequest from './Request';


const TeamRequests = () => {
    let temp = 1;
    const params = useParams();
    
    const {id} = params

    const [requests, setRequests] = useState([])

    const fetchRequests = async () => {
        try {
            const res = await fetch('/teams/requests/'+id, {
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
            <div>
            {requests && <div className="d-flex">
            {requests.map((player) => <TeamRequest key={temp++} player={player} id={id}/>)}
                    </div>}
                
            </div>
        </div>
    )
}


export default TeamRequests