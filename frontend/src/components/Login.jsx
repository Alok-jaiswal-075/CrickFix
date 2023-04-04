import React from "react";
import 'bootstrap/dist/css/bootstrap.css'

const Login = () => {
    return(
        <div className="container">
            <div className="row">
                <form className="row g-3 needs-validation" noValidate>

                    <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Email</label>
                    <input type="email" className="form-control" id="validationCustom02" defaultValue="Otto" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <label htmlFor="validationCustom03" className="form-label">Password</label>
                    <input type="password" className="form-control" id="validationCustom02" defaultValue="Otto" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>

                    <div className="col-12">
                    <button className="btn btn-success" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login