import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import BarLoader from "react-spinners/BarLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import SquareLoader from 'react-spinners/SquareLoader'
import HashLoader from 'react-spinners/HashLoader'
import ScaleLoader from 'react-spinners/ScaleLoader'
import SyncLoader from 'react-spinners/SyncLoader'

function Loading() {
  return (
    <div className='h-[100dvh] flex flex-col gap-2 items-center justify-center -z-1'>
        
      <div className='text-center w- py-2'>
      <p className='text-xl text-col-text'>"People throw stones at you and you convert them into milestones"</p>
      <p className="text-lg text-col-text">- Sachin Tendulkar</p>
      </div>

        {/* DIFFERENT lOADING ANIMATIONS TO TRY */}
        {/* <BarLoader size={150} color='#7C7C7C' /> */}
        {/* <BounceLoader color='#B9B9B9' /> */}
        {/* <SquareLoader color='#B9B9B9' /> */}
        {/* <ClimbingBoxLoader color='#B9B9B9' /> */}
        {/* <HashLoader color='#B9B9B9' /> */}
        {/* <ScaleLoader color='#F95333' /> */}
        <SyncLoader color='#F95333' />
    </div>
  )
}

export default Loading