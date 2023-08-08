import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {

    const navigate = useNavigate()

    const [player, setPlayer] = useState({fname:"", lname:"", age:"", email:"", contact:"", password:"",cpassword:""});

    let field, value;
    const handleInput = (e) =>{
        field = e.target.name;
        value = e.target.value;

        setPlayer({...player,[field]:value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(player.password === player.cpassword){
            const res = await fetch("/api/players", {
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
        else{
            window.alert('Password do not match!')
        }

        
    }

    return(
        <div className="mt-28 grid grid-cols-12 gap-4">

            <div className="bg-transparent flex flex-col justify-center items-center gap-3 col-start-5 col-span-4  font-text ">

                <h1 className="my-7 sm:text-5xl text-2xl font-heading tracking-wider">Register</h1>

                <form method="POST" className="flex flex-col justify-center items-center gap-7" noValidate autoComplete="off">

                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "First Name" name="fname" value={player.fname} 
                    onChange={handleInput} required />

                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Last Name" name="lname" value={player.lname} 
                    onChange={handleInput} required />

                    <input type="number" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Age" name="age" value={player.age} 
                    onChange={handleInput} required />

                    <input type="email" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Email" name="email" value={player.email} 
                    onChange={handleInput} required />

                    <input type="number" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Contact" name="contact" value={player.contact} 
                    onChange={handleInput} required />


                    <input type="password" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Password" name="password" value={player.password} 
                    onChange={handleInput} required />


                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"  
                    placeholder = "Confirm Password" name="cpassword" value={player.cpassword} 
                    onChange={handleInput} required />

                    <button className="border text-col-bg-dark hover:text-col-text border-col-btn bg-col-btn px-20 py-2 sm:text-lg text-sm font-bold rounded-full hover:bg-transparent transition duration-300 ease-in-out" type="submit" onClick={handleSubmit}>Register</button>

                    <p className="my-4">Already have a account ? <Link to="/login" className="text-col-btn hover:text-col-text transition duration-300 ease-in-out">Login</Link></p>

                </form>

            </div>

        </div>

    )
}

export default Register