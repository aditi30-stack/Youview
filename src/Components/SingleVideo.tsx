import { useContext, useEffect, useState } from "react"
import { Videocard } from "./VideoCard"
import { ToggleContext, ToggleContextProps } from "../functionality/toggle"
import axios from "axios"
import { SearchVideos } from "../utils/Constants"
import { SingleVideoType } from "../Types/SingleVideotype"
import { AllVideoItemsType } from "../Types/SingleVideotype"
import { Shimmer } from "./Shimmer"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"



export const SingleVideo = () =>{
    const {toggle} = useContext(ToggleContext) as ToggleContextProps;
    const params = useParams()
    let parameter = params?.query?.split(' ').join('') || ""
    

    const [searchVideo, setSearchVideo] = useState<SingleVideoType[]>([])
    console.log(searchVideo)
    const [totalItems, setTotalItems] = useState<AllVideoItemsType | undefined>(undefined)

    useEffect(()=>{
        fetchData(parameter)
    }, [params])

    const fetchData = async(parameter:string) =>{
        try {
        const response = await axios.get(`${SearchVideos}&q=${parameter}`)
        console.log(response.data)
        console.log("items are", response.data.items[0])
        setTotalItems(response.data)
        setSearchVideo(response.data.items)
        }catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={`${toggle? "":"ml-[120px]"} flex flex-col items-center`}>
           {searchVideo.length > 0 ? (
            <div>
                {searchVideo.map((video) => (
                    <div key={video.id.videoId} className="flex justify-center p-2 m-2 font-bold w-full">
                       <div className="w-[45%]">
                        <Link key={video.id.videoId} to={'/watch?v=' + video.id.videoId}>
                        <Videocard items={video}/>
                        </Link>
                        </div>
                        <div className="mt-10 ml-4 w-[65%] text-wrap">
                            {video.snippet.title}
                            <div className="mt-2 text-gray-400">
                                {video?.snippet?.channelTitle}
                            </div>
                            <div className="mt-2  font-semibold">
                                {video?.snippet?.description}
                            </div>

                        </div>

                       
                    </div>
                    
                    

                   
                ))}
            </div>

           ): <Shimmer/>}
           
        </div>
    )
}