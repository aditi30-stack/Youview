import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ToggleContext, ToggleContextProps } from "../functionality/toggle";
import axios from "axios";
import { YOUTUBE_API_KEY } from "../utils/Constants";
import { VideoData, YouTubeApiResponse } from "../Types/YoutubeData";
import { AVATAR_IMAGES } from "../utils/Constants";
import { Comments } from "./Comments";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../utils/store";
import { AiFillLike } from "react-icons/ai";
import { update } from "../utils/LikeCommentSlice";
import { LiveChat } from "./LiveChat";

export const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const { toggle } = useContext(ToggleContext) as ToggleContextProps;
  const videoId = searchParams.get("v");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [description, setDescription] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.LikesComments);
  const dispatch = useDispatch();


  useEffect(() => {
    if (videoId) {
      const VideoIdUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;
      axios
        .get<YouTubeApiResponse>(VideoIdUrl)
        .then((response) => {
          const videoDetails = response.data.items[0];
          setVideoData(videoDetails);
        })
        .catch((error) => {
          console.error("Error fetching video data:", error);
        });
    }
  }, [videoId]);

  const handleDescription = () => { 
    setDescription(!description);
  };


  const handleSubscribe = () => {
    const newSubscribeStatus = selector.subscribe === "Subscribe" ? "Subscribed" : "Subscribe";
    dispatch(update({ subscribe: newSubscribeStatus }));
  };

  return (
    <div className="flex w-[1200px] mt-[70px]">
      {!toggle && (
        <div className="ml-[260px] fixed inset-0 z-30 backdrop-blur-lg">
         
        </div>
      )}
      <div className={`${toggle ? "m-0" : "ml-[120px]"} h-full`}>
        <iframe
          className="border rounded-md w-[800px] h-[600px]"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        {videoData && (
          <div className="flex flex-col w-[800px]">
            <div className="flex items-center justify-between">
              <div className="flex justify-around space-x-4">
                <div className="mt-4 ml-4 font-semibold text-xl ">
                  {videoData.snippet.title}
                </div>
              </div>

              <div className="flex rounded-xl space-x-4 items-center mt-4">
                <div className="flex items-center relative p-2">
                  <button
                    className="border rounded-xl bg-gray-800 dark:bg-gray-200 font-semibold w-24 p-2 dark:text-black text-white flex items-center justify-center"
                    onClick={() => {
                      dispatch(update({ like: 1 }));
                    }}
                  >
                    <AiFillLike className="text-md ml-4" />
                  </button>
                  <div className="text-white absolute right-14 p-2 font-bold ml-2 z-0">
                    {selector.Like}
                  </div>
                </div>

                <button className="border rounded-xl bg-gray-800 dark:bg-gray-200 w-24 p-1 font-semibold dark:text-black text-white">
                  share
                </button>
                <button className="border rounded-xl bg-gray-800 dark:bg-gray-200 w-24 p-1 font-semibold dark:text-black text-white">
                  Downloads
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex font-bold items-center font-semibold text-lg space-x-4 mb-2">
                <div className="w-12 h-12">
                  <img
                    className="border rounded-full w-full h-full mt-2 object-fit"
                    src={
                      AVATAR_IMAGES[
                        Math.floor(Math.random() * AVATAR_IMAGES.length)
                      ].url
                    }
                    alt="Avatar"
                  />
                </div>
                <div className="text-lg">{videoData.snippet.channelTitle}</div>
                <div className="w-28">
                  <button
                    onClick={handleSubscribe}
                    className="border rounded-xl w-full bg-gray-800 dark:bg-gray-200 p-1 font-semibold dark:text-black text-white "
                  >
                    {selector.subscribe}
                  </button>
                </div>
              </div>
              <div className="p-2 m-2 border bg-gray-400 w-full">
                <div onClick={handleDescription} className="cursor-pointer">
                  {!description ? (
                    <p>{videoData?.snippet?.description.substring(0, 100) + "....more"}
                    
                    </p>
                  ) : (
                    <p>{videoData?.snippet?.description + "...show less"}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Comments />
            </div>
          </div>
        )}
      </div>

      <div className="w-[1200px] h-[400px] ml-10 overflow-y-scroll">
        <LiveChat />
      </div>
    </div>
  );
};
