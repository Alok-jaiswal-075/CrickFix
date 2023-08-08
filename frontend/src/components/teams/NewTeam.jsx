import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Utility/Button";

const NewTeam = () => {

    const navigate = useNavigate()

    const [team, setTeam] = useState({name:"", location_based:""});

    let field, value;
    const handleInput = (e) =>{
        field = e.target.name;
        value = e.target.value;

        setTeam({...team,[field]:value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const res = await fetch("/api/teams", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                team : {name : team.name, location_based:team.location_based}
            })
        })
        const data = await res.json()
        if(!data || res.status!==200){
            window.alert("Server error or team already exist")
        }
        else{
            window.alert("team created successfully")
            navigate('/teams')
        }
    }

    return(




        <div className="mt-28 grid grid-cols-12 gap-4 sm:flex justify-center items-center">

            <div className="bg-transparent flex flex-col justify-center items-center gap-3 col-start-5 col-span-4 font-text ">

                <h1 className="my-7 sm:text-5xl text-xl font-heading tracking-wider">New Team</h1>
            
                <form method="POST" className="flex flex-col justify-center items-center gap-7" noValidate autoComplete="off">

                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Team Name" name="name" value={team.name} onChange={handleInput} required />

                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Location Based" name="location_based" value={team.location_based} onChange={handleInput} required />

                    <button className="border border-col-btn bg-col-btn px-20 py-2 sm:text-lg text-sm font-bold rounded-full hover:bg-transparent transition duration-300 ease-in-out" type="submit" onClick={handleSubmit}>Create Team</button>

                </form>

            </div>

        </div>

    )
}

export default NewTeam