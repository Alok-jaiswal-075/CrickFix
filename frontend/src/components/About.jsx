import React,{useEffect} from "react";

const About = () => {
    
    const callPlayerPage = async () =>{
        try {
            const res = await fetch('/players',{
                method : "GET",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json();
            console.log(data)
        } catch (error) {
            window.alert(error.msg)
        }
    }

    useEffect(() => {
        callPlayerPage();
    }, []);


    return(
        <div>
            <h1>This is our About page</h1>
        </div>
    )
}

export default About