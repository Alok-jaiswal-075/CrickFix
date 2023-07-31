import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'

const EditPlayer = () => {
    const navigate = useNavigate()

    const [player, setPlayer] = useState({ fname: "", lname: "", age: "", oldpassword: "", newpassword: "" });

    let field, value;
    const handleInput = (e) => {
        field = e.target.name;
        value = e.target.value;

        setPlayer({ ...player, [field]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/players", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                player: { fname: player.fname, lname: player.lname, age: player.age, oldpassword: player.oldpassword, newpassword: player.newpassword }
            })
        })

        const data = await res.json()
        if (!data || res.status === 404) {
            window.alert("Invalid data")
        }
        else {
            window.alert(data.msg)
            navigate('/login')
            // console.log(data)
        }
    }

    return (
        <div className="w-full h-full grid grid-cols-12 gap-4 sm:flex justify-center items-center">
            <div className="bg-transparent flex flex-col justify-center items-center gap-3 col-start-5 col-span-4 font-text ">
                <h1 className="my-7 sm:text-5xl text-2xl font-heading tracking-wider">Edit Player</h1>
                <form className="flex flex-col justify-center items-center gap-7" method="POST" noValidate autoComplete="off">
                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="First Name" name="fname" value={player.fname}
                        onChange={handleInput} required />

                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="Last Name" name="lname" value={player.lname}
                        onChange={handleInput} required />

                    <input type="number" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="Age" name="age" value={player.age}
                        onChange={handleInput} required />


                    <input type="password" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="Old Password" name="oldpassword" value={player.oldpassword}
                        onChange={handleInput} required />

                    <input type="password" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="New Password" name="newpassword" value={player.newpassword}
                        onChange={handleInput} required />

                    <div className="col-12">
                        <button className="border text-col-bg-dark hover:text-col-text border-col-btn bg-col-btn px-20 py-2 sm:text-lg text-sm font-bold rounded-full hover:bg-transparent transition duration-300 ease-in-out" type="submit" onClick={handleSubmit}>Update Player</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPlayer