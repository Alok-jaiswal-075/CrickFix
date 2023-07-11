import React,{useEffect, useState} from 'react'
import Modal from './Modal'
import backgroundImage from '../asset/Hero.png'; 
import Loading from './Utility/Loading';


const Home = (props) => {

    const [isOpen,setisopen] = useState(true);
    const [loading, setLoading] = useState(true);

    const homePage = async () => {
 
      try{ 
           const res = await fetch ('/hello',{
            method : "GET",
            headers: {'Accept': 'application/json', },
            
          });
    
        const data = await res.json();
        setLoading(false)
        console.log(data);
        
    
      } catch(err){
          console.log(err);
          
      }
    }

    useEffect(() => {
        homePage();
        
      }, [])
    
      return(
        loading ? <Loading />
        :
        <>
        <div className='flex  items-center min-h-screen bg-cover' style={{ backgroundImage: `url(${backgroundImage})` }}>

          <div className='pl-48 bg-transparent min-w-fit mb-42 absolute z-10'>

            <p className='font-heading text-6xl leading-snug bg-inherit'>
              Complete Match <br /> Organizing Facilities<br />
              For Cricket Lovers <br /> like You
            </p>

            <p className='font-text text-xl leading-relaxed bg-inherit'>
              CricFix provides you with features like Team Building, <br />
              Competitions and Score Maintenance, so that you can enjoy <br /> 
              your games to the fullest.
            </p>

            <button 
            className='bg-col-btn mt-16 mr-10 pl-8 text-col-bg-primary pr-9 pt-4 pb-4 rounded text-xl ' > Join Now</button>

            <button className=' text-col-btn border-col-btn rounded text-xl border pl-8 pr-9 pt-4 pb-4' >Know More</button>


          </div>
        

        </div>
    
          

         <div>
          
            {/* <button className='btn btn-primary' onClick = {()=>setisopen(true)}>modal</button>
            <Modal open={isOpen} onClose={() => setisopen(false)}>This is our modal</Modal> */}
          </div>

          </>
    )
}

export default Home