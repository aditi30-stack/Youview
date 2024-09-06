import { ChatMessage } from "./ChatMessage";
import { useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

export const LiveChat = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const selector = useSelector((state:RootState) => state.Chats)

    const getRandomName = () => {
        const names = [
            'Time', 'Past', 'Future', 'Dev', 'Fly', 'Flying',
            'Soar', 'Soaring', 'Power', 'Falling', 'Fall',
            'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue'
        ];
        return names[Math.floor(Math.random() * names.length)];
    };

    const getRandomMessage = () => {
        const messages = [
            "The quick brown fox.",
            "To be or not to ben.",
            "All that glitters is not gold.",
            "A journey",
            "Better late than never.",
            "Curiosity killed the cat."
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    
    useEffect(()=>{

        let intervalId = setInterval(()=>{
            dispatch(addMessage({
                name: getRandomName(),
                message: getRandomMessage()
            }))

        }, 1000)

        return () =>{
            clearInterval(intervalId)
        }

    }, [message])


    const AddChat = () =>{
        if(message.trim() === "") return;
        dispatch(addMessage({
            name: "Batman",
            message: message
        }))
        setMessage("")

    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter") {
            AddChat()
        }

    }


    

    return (
        <div className="text-wrap w-full border border-gray-400 dark:border-white dark:border-2 bg-gray-200 rounded-md">
            <div className="sticky top-0 p-2 border border-black w-full rounded-md text-gray-800 font-bold bg-gray-200 z-10">
                Top Chat
            </div>
            
            {selector && selector.length > 0 && (
                <>
                {selector.map((chat, index) =>(
                   
                <ChatMessage key={index} name={chat.name} message={chat.message}/>
                    
                ))}
                </>
            )}

            <input 
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                
                className="w-full outline-none border border-gray-400 bg-gray-200 p-2" 
                type="text"
                placeholder="Type your message here..."
            />
        </div>
    );
};
