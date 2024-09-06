import { Videocard } from "./VideoCard"
import { useContext } from "react"
import { ToggleContext } from "../functionality/toggle"
import { Link } from "react-router-dom"
import { Shimmer } from "./Shimmer"
import { useEffect } from "react"
export const VideoContainer = ({videos, loading}) =>{
    
    const {toggle} = useContext(ToggleContext)

   

   return (
    <div className={`${toggle ? "m-0": "ml-[120px]"} dark:bg-black dark:text-white text-black bg-white`}>
         <div className={`w-full md:grid ${toggle? "md:grid-cols-4" : "md:grid-cols-3"} md:gap-4 grid grid-cols-1 gap-1`}>
        
        {videos && videos.length > 0  ? (
             videos.map((video) => (
            
                <Link key={video.id} to={'/watch?v=' + video.id}>
                    
                <Videocard items={video} >
    
                </Videocard>
                </Link>
                
                
            ))) : (
            
            Array.from({length: 12}).map((_, i) => (
                <Shimmer key={i}/>

            ))
          )}
        
        
       
    </div>
    </div>
    
   )
    
}