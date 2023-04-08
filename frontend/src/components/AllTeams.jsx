import React,{useEffect,useState} from 'react'
import Team from './Team'
const AllTeams = () => {
    var temp = 0;
    const [teams,setTeamsData] = useState([])

    const callTeamsPage = async () =>{
        try {
            const res = await fetch('/teams',{
                method : "GET",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json();
            setTeamsData(data)
            // console.log(data)
        } catch (error) {
            window.alert(error.msg)
        }
    }

    useEffect(() => {
        callTeamsPage();
    }, []);
    
    return(
        <div className='d-flex flex-wrap'>
            {teams.map((team) => <Team key={temp++} team={team}/>)}
        </div>
    )
}

export default AllTeams