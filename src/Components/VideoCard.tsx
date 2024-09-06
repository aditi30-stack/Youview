import { AVATAR_IMAGES } from "../utils/Constants";

export const Videocard = ({ items }: { items: any }) => {
    const { statistics, snippet } = items;
    const { title, thumbnails, channelTitle } = snippet;
    const { high } = thumbnails;

    return (
        <div className="border border-transparent p-4 flex flex-col rounded-md shadow-xl h-full">
            {/* Image Container */}
            <div className="relative h-[148px] w-full overflow-hidden rounded-md">
                <img
                    className="w-full h-full object-cover"
                    src={high.url}
                    alt="thumbnail image"
                />
            </div>
            
            {/* Title and Avatar */}
            <div className="flex items-start mt-2">
                {/* Avatar */}
                <div className="h-12 w-12 flex-shrink-0">
                    <img
                        className="border rounded-full p-2 h-full w-full object-cover"
                        src={AVATAR_IMAGES[Math.floor(Math.random() * AVATAR_IMAGES.length)].url}
                        alt="channel avatar"
                    />
                </div>
                
                {/* Title */}
                <div className="ml-3 flex-1">
                    <div className="font-semibold overflow-hidden text-ellipsis">
                        {title.length > 50 ? `${title.substring(0, 50)}...` : title}
                    </div>
                    
                    {/* Channel Title */}
                    <div className="font-semibold text-gray-400 dark:text-white mt-1 overflow-hidden text-ellipsis">
                        {channelTitle}
                    </div>
                    
                    {/* Views Count */}
                    <div className="font-semibold text-gray-600 dark:text-white">
                        {statistics?.viewCount} views
                    </div>
                </div>
            </div>
        </div>
    );
};
