import React,{useState} from "react";
import { useNavigate } from "react-router-dom";


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

        const res = await fetch("/teams", {
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
        <div className="container">
            <div className="row">
                <form className="row g-3 needs-validation" method="POST" noValidate autoComplete="off">
                    <div className="col-12">
                    <label htmlFor="validationCustom01" className="form-label">Name</label>
                    <input type="text" className="form-control"  name="name" value={team.name} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Location based</label>
                    <input type="text" className="form-control"  name="location_based" value={team.location_based} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    
                    <div className="col-12">
                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>Create Team</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewTeam