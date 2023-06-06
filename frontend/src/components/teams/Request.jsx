import React from 'react'


const TeamRequest = (props) => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.request.fname} {props.request.lname}</h5>
                    <button className='btn btn-success'>Accept</button>
                    <button className='btn btn-danger'>Reject</button>
                </div>
            </div>
        </div>
    )
}


export default TeamRequest