import React,{useState} from "react";
import {useNavigate,Link} from 'react-router-dom'



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

        const res = await fetch("https://backend-crickfix.onrender.com/players/login", {
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


        <div className="mt-28 grid grid-cols-12 gap-4 sm:flex justify-center items-center">

            <div className="bg-transparent flex flex-col justify-center items-center gap-3 col-start-5 col-span-4 font-text ">

                <h1 className="my-7 sm:text-5xl text-2xl font-heading tracking-wider">Login</h1>
            
                <form method="POST" className="flex flex-col justify-center items-center gap-7" noValidate autoComplete="off">

                    <input type="email" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Email" name="email" value={player.email} 
                    onChange={handleInput} required />

                    <input type="password" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Password" name="password" value={player.password} 
                    onChange={handleInput} required />

                    <button className="border text-col-bg-dark hover:text-col-text border-col-btn bg-col-btn px-20 py-2 sm:text-lg text-sm font-bold rounded-full hover:bg-transparent transition duration-300 ease-in-out" type="submit" onClick={handleSubmit}>Login</button>
                    {/* <Button type="submit" onClick={handleSubmit} /> */}

                    <p className="my-4">Don't have a account ? <Link to="/register" className="text-col-btn hover:text-col-text transition duration-300 ease-in-out">Register</Link></p>

                </form>

            </div>

        </div>

    )
}

export default Login