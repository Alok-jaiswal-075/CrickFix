import React,{useState} from "react";

const Register = () => {

    const [player, setPlayer] = useState({fname:"", lname:"", age:"", email:"", contact:"", password:""});

    let field, value;
    const handleInput = (e) =>{
        field = e.target.name;
        value = e.target.value;

        setPlayer({...player,[field]:value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const res = await fetch("/players", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                player
            })
        })

        const data = await res.json()
        if(!data){
            window.alert("Invalid data")
        }
        else{
            window.alert("registration successfull")
        }
    }

    return(
        <div className="container">
            <div className="row">
                <form className="row g-3 needs-validation" method="POST" noValidate >
                    <div className="col-12">
                    <label htmlFor="validationCustom01" className="form-label">First name</label>
                    <input type="text" className="form-control"  name="fname" value={player.fname} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Last name</label>
                    <input type="text" className="form-control"  name="lname" value={player.lname} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    
                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Age</label>
                    <input type="number" className="form-control" name="age" value={player.age} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={player.email} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Contact</label>
                    <input type="number" className="form-control" name="contact" value={player.contact} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={player.password} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>Create Player</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register