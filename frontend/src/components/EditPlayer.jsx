import React,{useState} from "react";

const EditPlayer = () => {

    const [player, setPlayer] = useState({fname:"", lname:"", age:"", oldpassword:"", newpassword:""});

    let field, value;
    const handleInput = (e) =>{
        field = e.target.name;
        value = e.target.value;

        setPlayer({...player,[field]:value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const res = await fetch("/players", {
            method: "PUT",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                player : {fname : player.fname, lname:player.lname, age:player.age, oldpassword:player.oldpassword, newpassword: player.newpassword}
            })
        })

        const data = await res.json()
        if(!data || res.status === 404){
            window.alert("Invalid data")
        }
        else{
            window.alert(data.msg)
            // console.log(data)
        }
    }

    return(
        <div className="container">
            <div className="row">
                <form className="row g-3 needs-validation" method="POST" noValidate autoComplete="off">
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
                    <label htmlFor="validationCustom02" className="form-label">Old Password</label>
                    <input type="password" className="form-control" name="oldpassword" value={player.oldpassword} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">New Password</label>
                    <input type="password" className="form-control" name="newpassword" value={player.newpassword} onChange={handleInput} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>Update Player</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPlayer