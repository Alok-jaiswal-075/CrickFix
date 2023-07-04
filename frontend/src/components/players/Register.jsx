import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";


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
        <div className="mt-28 grid grid-cols-12 gap-4">

            <div className="bg-transparent flex flex-col justify-center items-center gap-3 col-start-5 col-span-4  font-text ">

                <h1 className="m-7 text-5xl">Register</h1>

                <form method="POST" className="flex flex-col justify-center items-center gap-7" noValidate autoComplete="off">

                    <input type="email" className="border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 text-lg focus:outline-none"  
                    placeholder = "Email" name="email" value={player.email} 
                    onChange={handleInput} required />

                    <input type="password" className="border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 text-lg focus:outline-none"  
                    placeholder = "Password" name="password" value={player.password} 
                    onChange={handleInput} required />

                    <button className="border border-col-btn bg-col-btn px-20 py-2 text-lg font-bold rounded-full hover:bg-transparent transition duration-300 ease-in-out" type="submit" onClick={handleSubmit}>Register</button>

                    <p className="my-4">Already have a account ? <Link to="/login" className="text-col-btn hover:text-col-text transition duration-300 ease-in-out">Login</Link></p>

                </form>

            </div>

        </div>
    )
}

export default Register