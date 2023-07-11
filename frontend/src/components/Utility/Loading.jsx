import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import BarLoader from "react-spinners/BarLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function Loading() {
  return (
    <div className='h-[100dvh] flex flex-col gap-2 items-center justify-center -z-1'>
        
      <div className='text-center w- py-2'>
      <p className='text-xl text-col-text'>"People throw stones at you and you convert them into milestones"</p>
      <p className="text-lg text-col-text">- Sachin Tendulkar</p>
      </div>

        {/* DIFFERENT lOADING ANIMATIONS TO TRY */}
        <BarLoader size={150} color='#7C7C7C' />
        {/* <img src={loaderPath} alt="Loader" /> */}
        {/* <BounceLoader color='#B9B9B9' /> */}
        {/* <SquareLoader color='#B9B9B9' /> */}
        {/* <ClimbingBoxLoader color='#B9B9B9' /> */}
    </div>
  )
}

export default Loading