import React,{useState} from "react";
import { useParams, useNavigate} from "react-router-dom";

const EditTeam = () => {
    const navigate = useNavigate();
    const params = useParams();
    
    const {id} = params

    const [team, setTeam] = useState({name:"", location_based:""});

    let field, value;
    const handleInput = (e) =>{
        field = e.target.name;
        value = e.target.value;

        setTeam({...team,[field]:value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const res = await fetch("/teams/"+id, {
            method: "PUT",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                team : {name : team.name, location_based : team.location_based}
            })
        })

        const data = await res.json()
        if(!data || res.status === 401 || res.status===500){
            window.alert(data.msg)
        }
        navigate('/team/' + id)
    }

    return(
        <div className="w-full h-full mt-28 gap-4 sm:flex justify-center items-center">
            <div className="bg-transparent flex flex-col justify-center items-center gap-3 col-start-5 col-span-4 font-text ">
                <h1 className="my-7 sm:text-5xl text-2xl font-heading tracking-wider">Edit Team</h1>
                <form className="flex flex-col justify-center items-center gap-7" method="POST" noValidate autoComplete="off">
                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="Team Name" name="name" value={team.name}
                        onChange={handleInput} required />

                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="Team Location" name="location_based" value={team.location_based}
                        onChange={handleInput} required />

                    <div className="col-12">
                        <button className="border text-col-bg-dark hover:text-col-text border-col-btn bg-col-btn px-20 py-2 sm:text-lg text-sm font-bold rounded-full hover:bg-transparent transition duration-300 ease-in-out" type="submit" onClick={handleSubmit}>Update Team</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTeam