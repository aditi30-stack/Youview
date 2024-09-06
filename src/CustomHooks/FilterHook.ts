import { useEffect, useState } from "react";
import { SingleVideoType } from "../Types/SingleVideotype";

export const useFilterHook = (videos: SingleVideoType[]) => {
    const [filterData, setFilterData] = useState<string>("All");
    const [filteredVideos, setFilteredVideos] = useState<SingleVideoType[]>(videos);

    useEffect(() => {
        let filtered: SingleVideoType[] = [];

        switch (filterData) {
            case "LARRAY":
                filtered = videos.filter((v) =>
                    v.snippet.channelTitle.toLowerCase().includes("larray") ||
                    v.snippet.title.toLowerCase().includes("larray") ||
                    v.snippet.description.toLowerCase().includes("larray")
                );
                break;

            case "Music":
                filtered = videos.filter((v) =>
                    v.snippet.channelTitle.toLowerCase().includes("music") ||
                    v.snippet.title.toLowerCase().includes("music") ||
                    v.snippet.description.toLowerCase().includes("music")
                );
                break;

            case "Football":
                filtered = videos.filter((v) =>
                    v.snippet.channelTitle.toLowerCase().includes("football") ||
                    v.snippet.title.toLowerCase().includes("football") ||
                    v.snippet.description.toLowerCase().includes("football")
                );
                break;

            case "The Grand Tour":
                filtered = videos.filter((v) =>
                    v.snippet.channelTitle.toLowerCase().includes("the grand tour") ||
                    v.snippet.title.toLowerCase().includes("the grand tour") ||
                    v.snippet.description.toLowerCase().includes("the grand tour")
                );
                break;

            case "Movies":
                filtered = videos.filter((v) =>
                    v.snippet.channelTitle.toLowerCase().includes("movies") ||
                    v.snippet.title.toLowerCase().includes("movies") ||
                    v.snippet.description.toLowerCase().includes("movies")
                );
                break;

            default:
                filtered = videos;
                break;
        }

        setFilteredVideos(filtered);

    }, [filterData, videos]);

    return { filteredVideos, setFilterData };
};
