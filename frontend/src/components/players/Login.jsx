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


        <div className="mt-28 grid grid-cols-12 gap-4">

            <div className="bg-transparent flex flex-col justify-center items-center gap-3 col-start-5 col-span-4  font-text ">

                <h1 className="m-7 text-5xl">Login</h1>
            
                <form method="POST" className="flex flex-col justify-center items-center gap-7" noValidate autoComplete="off">

                    <input type="email" className="border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 text-lg focus:outline-none"  
                    placeholder = "Email" name="email" value={player.email} 
                    onChange={handleInput} required />

                    <input type="password" className="border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 text-lg focus:outline-none"  
                    placeholder = "Password" name="password" value={player.password} 
                    onChange={handleInput} required />

                    <button className="border border-col-btn bg-col-btn px-20 py-2 text-lg font-bold rounded-full hover:bg-transparent transition duration-300 ease-in-out" type="submit" onClick={handleSubmit}>Login</button>

                    <p className="my-4">Don't have a account ? <Link to="/register" className="text-col-btn hover:text-col-text transition duration-300 ease-in-out">Register</Link></p>

                </form>

            </div>

        </div>



        // <div className="container">
        //     <div className="row">
                // <form method="POST" className="row g-3 needs-validation" noValidate autoComplete="off">

                //     <div className="col-12">
                    // <label htmlFor="validationCustom02" className="form-label">Email</label>
                    // <input type="email" className="form-control" id="validationCustom01" name="email" value={player.email} onChange={handleInput} required />
                //     <div className="valid-feedback">
                //         Looks good!
                //     </div>
                //     </div>

                //     <div className="col-12">
                //     <label htmlFor="validationCustom03" className="form-label">Password</label>
                //     <input type="password" className="form-control" id="validationCustom02" name="password" value={player.password} onChange={handleInput} required />
                //     <div className="valid-feedback">
                //         Looks good!
                //     </div>
                //     </div>

                //     <div className="col-12">
                //     <button className="btn btn-success" type="submit" onClick={handleSubmit}>Login</button>
                //     </div>
                // </form>
        //     </div>
        // </div>
    )
}

export default Login