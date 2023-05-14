import React,{useEffect, useState} from 'react'
import Modal from './Modal'
const Home = () => {

    const [isOpen,setisopen] = useState(false);

    const homePage = async () => {

        
      try{ 
           const res = await fetch ('/hello',{
            method : "GET",
            headers: {'Accept': 'application/json', },
            
          });
    
        const data = await res.json();
        console.log(data);
    
      } catch(err){
          console.log(err);
          
      }
    }

    useEffect(() => {
        homePage();
      
        
      }, [])
    
    return(
        <div>
            <h1>This is our home page</h1>
            <button className='btn btn-primary' onClick = {()=>setisopen(true)}>modal</button>
            <Modal open={isOpen} onClose={() => setisopen(false)}>This is our modal</Modal>
        </div>
    )
}

export default Home