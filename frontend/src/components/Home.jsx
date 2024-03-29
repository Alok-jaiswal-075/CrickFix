import React,{useEffect, useState} from 'react'
import Modal from './Modal'
import { useNavigate } from "react-router-dom";
// import backgroundImage from '../asset/Hero.png';
import backgroundImage from '../asset/cricket-vector-2.png';
// import Loading from './Utility/Loading';
// const axios = require('axios');


const Home = (props) => {

    const [isOpen,setisopen] = useState(true);
    const navigate = useNavigate()
  // const [loading, setLoading] = useState(true);

  const goToRegister = ()=>{
    navigate('/register')
  }

    
      return(
        // loading ? <Loading />
        // :
      <>
        <div className='flex flex-row items-center justify-between min-h-screen bg-cover'>
          <div className='pl-10 md:pl-40 bg-transparent min-w-fit mb-42 z-10'>
            <p className='font-heading text-3xl md:text-6xl leading-snug bg-inherit'>
              Complete Match <br /> Organizing Facilities<br />
              For Cricket Lovers <br /> like You
            </p>
            <p className='font-text text-base md:text-xl leading-relaxed bg-inherit'>
              CricFix provides you with features like Team Building, <br />
              Competitions and Score Maintenance, so that you can enjoy <br />
              your games to the fullest.
            </p>
            <button onClick={goToRegister} className='bg-col-btn mt-8 md:mt-16 mr-4 md:mr-10 pl-4 md:pl-8 text-col-bg-primary pr-5 md:pr-9 pt-3 md:pt-4 pb-3 md:pb-4 rounded text-base md:text-xl'>Join Now</button>
            <button className='text-col-btn border-col-btn rounded text-base md:text-xl border pl-4 md:pl-8 pr-5 md:pr-9 pt-3 md:pt-4 pb-3 md:pb-4'>Know More</button>
          </div>


          <img className="w-[43%] hidden sm:inline-block" title='Image credit - Gully Cricket by Ranganath Krishnamani' src={backgroundImage} alt="" />
        </div>
        <div>

        </div>
      </>
  );
}

export default Home;
