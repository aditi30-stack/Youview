import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Comments = () => {
    const commentData = [
        {
            id: 1,
            name: "user",
            text: "Lorem ipsum dolor sit amet, connect",
            replies: [
                {
                    id: 1.1,
                    name: "user2",
                    text: "Love day",
                    replies: [
                        {
                            id: 1.2,
                            name: "user3",
                            text: "Love Day",
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "user3",
            text: "shsks",
            replies: [
                {
                    id: 2.1,
                    name: "user",
                    text: "ahajak",
                    replies: []
                }
            ]
        },
        {
            id: 2,
            name: "user3",
            text: "shsks",
            replies: [
                {
                    id: 2.1,
                    name: "user",
                    text: "ahajak",
                    replies: []
                }
            ]
        },
        {
            id: 2,
            name: "user3",
            text: "shsks",
            replies: []
        }
    ];

    return (
        <div className="p-4 w-full">
            <h1 className="font-bold p-2 text-xl">Comments</h1>
            {commentData.map((comment) => (
                <Comment key={comment.id} data={comment} />
            ))}
        </div>
    );
};

//interface Commentdata type

interface Commentdata {
    id: number,
    name: string,
    text: string,
    replies: Commentdata[]
}

const Comment = ({ data }: {data: Commentdata}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleReplies = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="p-2 rounded flex flex-col w-full">
            <div className="relative w-[50vw] rounded-lg p-1 text-black bg-gray-200 dark:bg-white dark:text-black dark:bg-gray-400 ">
                <div className="flex items-center space-x-4">
                    <img className="h-10 w-10 rounded-full" src="data:image/png;base64,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" />
                    <strong className="text-lg">{data.name}</strong>
                    <button onClick={toggleReplies} className="ml-auto absolute right-0">
                        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                </div>
                <div className="text-lg">{data.text}</div>
            </div>
            {isOpen && data.replies.length > 0 && (
                <div className="ml-8">
                    {data.replies.map((reply: any) => (
                        <Comment key={reply.id} data={reply} />
                    ))}
                </div>
            )}
        </div>
    );
};
