import React,{useEffect, useState} from 'react'
import Modal from './Modal'
import backgroundImage from '../asset/Hero.png';
// import Loading from './Utility/Loading';
// const axios = require('axios');


const Home = (props) => {

    const [isOpen,setisopen] = useState(true);
  // const [loading, setLoading] = useState(true);

  const homePage = async () => {
 
    async function fetchData() {
      try {
        const url = 'https://backend-crickfix.onrender.com/hello';
        const headers = {
          'Accept': 'application/json'
        };
    
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
          throw new Error('Request failed');
        }
    
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    // Call the fetchData function
    fetchData();
    
    
    }

  useEffect(() => {
    homePage();

      }, [])
    
      return(
        // loading ? <Loading />
        // :
      <>
        <div className='flex items-center min-h-screen bg-cover' style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className='pl-10 md:pl-48 bg-transparent min-w-fit mb-42 md:absolute z-10'>
            <p className='font-heading text-3xl md:text-6xl leading-snug bg-inherit'>
              Complete Match <br /> Organizing Facilities<br />
              For Cricket Lovers <br /> like You
            </p>
            <p className='font-text text-base md:text-xl leading-relaxed bg-inherit'>
              CricFix provides you with features like Team Building, <br />
              Competitions and Score Maintenance, so that you can enjoy <br />
              your games to the fullest.
            </p>
            <button className='bg-col-btn mt-8 md:mt-16 mr-4 md:mr-10 pl-4 md:pl-8 text-col-bg-primary pr-5 md:pr-9 pt-3 md:pt-4 pb-3 md:pb-4 rounded text-base md:text-xl'>Join Now</button>
            <button className='text-col-btn border-col-btn rounded text-base md:text-xl border pl-4 md:pl-8 pr-5 md:pr-9 pt-3 md:pt-4 pb-3 md:pb-4'>Know More</button>
          </div>
        </div>
        <div>
          {/* <button className='btn btn-primary' onClick={() => setisopen(true)}>modal</button>
          <Modal open={isOpen} onClose={() => setisopen(false)}>This is our modal</Modal> */}
        </div>
      </>
  );
}

export default Home;
