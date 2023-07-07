import React,{useEffect,useState} from 'react'
import Team from './Team'
const AllTeams = () => {
    var temp = 0;
    const [teams,setTeamsData] = useState([])

    const callTeamsPage = async () =>{
            const res = await fetch('/teams',{
                method : "GET",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json();
            if(data){
                setTeamsData(data)
            }
            else window.alert('No Teams to show')
    }

    useEffect(() => {
        callTeamsPage();
    }, []);
    
    return(
        <div className="mt-28 grid grid-cols-12 gap-4">
            <div className=" flex justify-center col-start-2 col-span-10 font-text ">
                {teams && 
                    <div className='flex flex-wrap gap-10 justify-center'>
                        {teams && teams.map((team) => <Team key={temp++} team={team}/>)}
                    </div>
                }
            </div>
        </div>
    )
}

export default AllTeams