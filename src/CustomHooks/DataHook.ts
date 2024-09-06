import { useState, useEffect } from "react"
import axios from "axios"
import { VideoUrl } from "../utils/Constants"
import { SingleVideoType } from "../Types/SingleVideotype"

export const useFetchData = () =>{
    const [videos, setVideos] = useState<SingleVideoType[]>([])
    const [error, setError] = useState<boolean | undefined>()
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState<string>('')
    const [maxResults, setMaxResults] = useState(10);

    useEffect(()=>{
        getVideos(VideoUrl, maxResults)

    }, [])

    const getVideos = async(url: string, maxResults:number) =>{
        try{
        setLoading(true)
        console.log(loading)
        const response = await axios.get(`${url}&maxResults=${maxResults}`)
        console.log("response", response.data)
        setVideos(response.data.items)
        setToken(response.data.nextPageToken ||  null)
        
        
        }
        catch(error: any) {
            console.log(error)
            setError(error.message)

        }
        finally {
            console.log(loading)
            setLoading(false)
            
        }

    }

    return{
        videos,
        loading,
        error,
        getVideos,
        token,
        setToken,
        setVideos,
        setMaxResults,
        maxResults
        

    }


}