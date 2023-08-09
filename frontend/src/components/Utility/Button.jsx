import React, { useState } from 'react'
// import BounceLoader from 'react-spinners/BounceLoader'
import Loader from 'react-spinners/PuffLoader'

function Button(props) {
  const classListPrimary = 'border text-col-bg-dark hover:text-col-text border-col-btn bg-col-btn px-20 py-2 sm:text-lg text-sm font-bold rounded-full hover:bg-transparent'
  const classListLoading = 'text-col-text border-2 border-col-btn bg-transparent w-fit sm:text-lg text-sm font-bold rounded-full'

  const[loading, setLoading] = useState(false)

  const clickHandler = async()=>{
    await props.handleClick()
    setLoading(true)
  }

  return (
    <button 
    className={`transition-all duration-300 ease-in-out ${loading ? classListLoading : classListPrimary}`} 
    type={props.type} 
    onClick={()=>clickHandler()} 
    disabled={loading}
    >
      {
        loading ? 
        <Loader color='#F86C4F' size={45} />
        :
        props.content
      }
    </button>
  )
}

export default Button