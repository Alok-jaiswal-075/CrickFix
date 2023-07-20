import React,{useEffect,useState} from 'react'
import Team from './Team'
import Loading from '../Utility/Loading';
const AllTeams = () => {
    var temp = 0;
    const [teams,setTeamsData] = useState([])
    const [loading, setLoading] = useState(true)

    const callTeamsPage = async () =>{
        try{
            const res = await fetch('/teams',{
                method : "GET",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json()
                setTeamsData(data)
                setLoading(false)
            }
            catch(err){
            window.alert('No Teams to show')

        }
    }

    useEffect(() => {
        callTeamsPage();
    }, []);
    
    return(
        loading ? 
        <Loading />
        :
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