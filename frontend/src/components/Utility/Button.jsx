import React from 'react'

function Button(props) {
  return (
    <button type={props.type ? props.type : 'button'} onClick={props.onClick} className='px-14 py-2 sm:text-lg text-sm font-bold before:transition-ease-out before:duration-200  rounded-full border relative border-col-btn before:content-["Login"] before:w-full before:h-full before:rounded-full before:absolute before:left-0 before:top-0 before:bg-col-btn before:z-[0]  truncate before:flex before:items-center before:justify-center before:focus:translate-x-full before:focus:content-[""]'><span className=''>Submitted !</span></button>
  )
}

export default Button