import React,{useState} from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {

    const navigate = useNavigate()

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
                player : {fname : player.fname, lname:player.lname, age:player.age, email:player.email, contact:player.contact, password:player.password}
            })
        })

        const data = await res.json()
        if(!data){
            window.alert("Invalid data")
        }
        else{
            window.alert(data.msg)
            navigate('/login')
        }
    }

    return(
      <div>
        Register Page
      </div>
    )
}

export default Register