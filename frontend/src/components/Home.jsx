import React,{useEffect} from 'react'
const Home = () => {

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
        </div>
    )
}

export default Home