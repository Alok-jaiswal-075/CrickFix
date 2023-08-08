import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTeam = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { id } = params

    const [team, setTeam] = useState({ name: "", location_based: "" });

    let field, value;
    const handleInput = (e) => {
        field = e.target.name;
        value = e.target.value;

        setTeam({ ...team, [field]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/teams/" + id, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                team: { name: team.name, location_based: team.location_based }
            })
        })

        const data = await res.json()
        if (!data || res.status === 401 || res.status === 500) {
            window.alert(data.msg)
        }
        else{
            window.alert('Team Updated Successfully!')
        }
        navigate('/team/dashboard/' + id)
    }

    return (
        // <div className="container">
        //     <div className="row">
        //         <form className="row g-3 needs-validation" method="POST" noValidate autoComplete="off">
        //             <div className="col-12">
        //             <label htmlFor="validationCustom01" className="form-label">First name</label>
        //             <input type="text" className="form-control"  name="name" value={team.name} onChange={handleInput} required />
        //             <div className="valid-feedback">
        //                 Looks good!
        //             </div>
        //             </div>

        //             <div className="col-12">
        //             <label htmlFor="validationCustom02" className="form-label">Location Based</label>
        //             <input type="text" className="form-control"  name="location_based" value={team.location_based} onChange={handleInput} required />
        //             <div className="valid-feedback">
        //                 Looks good!
        //             </div>
        //             </div>

        //             <div className="col-12">
        //             <button className="btn btn-success" type="submit" onClick={handleSubmit}>Update Team</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

        <div className="mt-28 grid grid-cols-12 gap-4 sm:flex justify-center items-center">
            <div className="bg-transparent flex flex-col justify-center items-center gap-3 col-start-5 col-span-4 font-text ">
                <h1 className="my-7 sm:text-5xl text-2xl font-heading tracking-wider">Edit Player</h1>
                <form className="flex flex-col justify-center items-center gap-7" method="POST" noValidate autoComplete="off">
                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="Team Name" name="name" value={team.name}
                        onChange={handleInput} required />

                    <input type="text" className="bg-transparent border-4 border-transparent border-b-col-bg-dark  max-w-full p-2 pl-10 sm:text-lg text-sm focus:outline-none"
                        placeholder="Location Based" name="location_based" value={team.location_based}
                        onChange={handleInput} required />

                    <div className="col-12">
                        <button className="border text-col-bg-dark hover:text-col-text border-col-btn bg-col-btn px-20 py-2 sm:text-lg text-sm font-bold rounded-full hover:bg-transparent transition duration-300 ease-in-out" type="submit" onClick={handleSubmit}>Update Team</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTeam