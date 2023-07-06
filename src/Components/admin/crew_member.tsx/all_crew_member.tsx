import { useEffect } from "react";


const AllCrewMembers = () => {
    useEffect(() => {
        console.log("All Crew Member")      
    }, [])   
    return <>
        <h1>This is crew member.</h1>
    </>
}


export default AllCrewMembers;