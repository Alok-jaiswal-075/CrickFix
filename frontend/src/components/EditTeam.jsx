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
        navigate('/teams')
    }

    return(
        <div className="container">
            <div className="row">
                <form className="row g-3 needs-validation" method="POST" noValidate autoComplete="off">
                    <div className="col-12">
                    <label htmlFor="validationCustom01" className="form-label">First name</label>
                    <input type="text" className="form-control"  name="name" value={team.name} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Location Based</label>
                    <input type="text" className="form-control"  name="location_based" value={team.location_based} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    
                    <div className="col-12">
                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>Update Team</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTeam