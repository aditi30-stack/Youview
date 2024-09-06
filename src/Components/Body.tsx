import { useCallback, useContext, useEffect } from "react";
import { Button } from "./Button";
import { VideoContainer } from "./VideoContainer";
import { ToggleContext, ToggleContextProps } from "../functionality/toggle";
import { useFetchData } from "../CustomHooks/DataHook";
import { Throttle } from "../CustomHooks/Throttle";
import { VideoUrl } from "../utils/Constants";
import { useFilterHook } from "../CustomHooks/FilterHook";

export const Body = () => {
    const ListItems = [
        "All", "LARRAY", "Music", "Football", "The Grand Tour", "Movies",
    ];

    const { toggle } = useContext(ToggleContext) as ToggleContextProps;
    const { videos, loading, getVideos, token, setMaxResults, maxResults } = useFetchData();
    const { filteredVideos, setFilterData } = useFilterHook(videos);

    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.offsetHeight;

        if (scrollTop + windowHeight + 500 > docHeight && !loading && token) {
            setMaxResults(prev => prev + 1);
            getVideos(`${VideoUrl}&nextPageToken=${token}`, maxResults);
        }
    }, [loading, token, getVideos]);

    const throttledHandleScroll = Throttle(handleScroll, 1000);

    useEffect(() => {
        window.addEventListener("scroll", throttledHandleScroll);

        return () => {
            window.removeEventListener("scroll", throttledHandleScroll);
        };
    }, [throttledHandleScroll]);

    return (
        <div className="w-full overflow-x-scroll no-scrollbar">
            <div
                className={`${!toggle ? "ml-[120px]" : ""} fixed top-[87px] left-[200px] bg-white text-black dark:bg-black dark:text-white border border-hidden overflow-x-scroll rounded-md z-20 flex space-x-4 w-[1200px] no-scrollbar`}
            >
                {ListItems.map((listItem, idx) => (
                    <Button onClick={() => setFilterData(listItem)} key={idx}>
                        {listItem}
                    </Button>
                ))}
            </div>
            <div className="mt-[80px]">
                <VideoContainer videos={filteredVideos} loading={loading} />
                
            </div>
            
        </div>
    );
};
