import React ,{ useState } from 'react'
import { useNavigate } from "react-router-dom";

const Team = (props) => {
    const navigate = useNavigate();

        const [isLoading, setIsLoading] = useState(false);

        const handleSendRequest = async () => {
          setIsLoading(true);

          try {
            const res = await fetch('/players/send-request/'+props.team._id, {
                    method : "POST",
                    headers : {
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                    },
                    credentials : "include"
                })
    
                const data = await res.json();
                if(data) window.alert(data.msg)
                    
            } catch (error) {
                window.alert(error.msg)
            }
        };
      

    const gotoEditPage = () =>{
        navigate('/team/'+props.team._id);
    }

    const handleDelete = async () => {
        try {
            const res = await fetch('/teams/'+props.team._id,{
                method : "DELETE",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json();
            if(data){
                window.alert(data.msg)
            }
                
        } catch (error) {
            window.alert(error.msg)
        }
    }


    return(



        <div className="bg-col-bg-dark p-5 drop-shadow-xl flex justify-start flex-col rounded-2xl hover:scale-110 duration-300">
                <h2 className="sm:text-2xl text-lg font-heading bg-col-bg-dark">{props.team.name}</h2>
                <ul className="font-text mt-2 bg-col-bg-dark">
                    <li className="bg-col-bg-dark">Location Based := {props.team.location_based}</li>
                    <li className="bg-col-bg-dark">Matches Played := {props.team.matches_played}</li>
                    <li className="bg-col-bg-dark">Matches Won := {props.team.matches_won}</li>
                    <li className="bg-col-bg-dark">Matches Lost := {props.team.matches_lost}</li>
                    <li className="bg-col-bg-dark">Matches Draw := {props.team.matches_draw}</li>
                    <li className="bg-col-bg-dark">Captain:  {props.team.captain.fname} {props.team.captain.lname}</li>
                </ul>

                <div className="card-body">

                    {
                        props.isCaptain 
                        && 
                        <button type="button" className='border border-col-btn  text-col-text bg-col-btn  rounded text-md px-3 py-1.5 hover:bg-transparent transition duration-300 ease-in-out ' onClick={gotoEditPage}>Edit</button>
                    }
                    {
                        props.isCaptain 
                        && 
                        <button type="button" className='border border-col-btn text-col-text bg-col-btn  rounded text-md px-3 py-1.5 hover:bg-transparent transition duration-300 ease-in-out ' onClick={handleDelete}>Delete</button>
                    }
                    <br />
                    {
                        props.isCaptain 
                        && 
                        <a href={"team/teamRequests/"+props.team._id} className="card-link">Join Requests</a>
                    }
                    {
                        props.isCaptain 
                        && 
                        <a href={"team/matchRequests/"+props.team._id} className="card-link">Match Requests</a>
                    }
                    
                    { 
                        !props.isCaptain 
                        &&
                        <button className='border border-col-btn text-col-text bg-col-btn  rounded text-md px-3 py-1.5 hover:bg-transparent transition duration-300 ease-in-out ' onClick={handleSendRequest} disabled={isLoading}>
                        {isLoading ? 'Sent' : 'Send Request'}
                        </button>
                    }
            

            </div>
        </div>


)
}

export default Team
