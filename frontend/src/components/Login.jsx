import React,{useState} from "react";
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'


const Login = () => {
    const Navigate = useNavigate();

    const [player, setPlayer] = useState({email:"", password:""});

    let field, value;
    const handleInput = (e) =>{
        field = e.target.name;
        value = e.target.value;

        setPlayer({...player,[field]:value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const {email,password} = player

        const res = await fetch("/players/login", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                email,password
            })
        })

        const data = await res.json()
        if(!data || res.status!==200){
            window.alert("Invalid data")
        }
        else{
            window.alert(data.msg)
            Navigate("/about");
            // console.log(data)
        }
    }

    return(
        <div className="container">
            <div className="row">
                <form method="POST" className="row g-3 needs-validation" noValidate autoComplete="off">

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Email</label>
                    <input type="email" className="form-control" id="validationCustom01" name="email" value={player.email} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom03" className="form-label">Password</label>
                    <input type="password" className="form-control" id="validationCustom02" name="password" value={player.password} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login