

export const Button = ({children, onClick, active=false}: {children: String,
    onClick: () => void,
    active?: boolean
}) =>{

   
    
    return (
        <div>
            <button onClick={onClick} 
            className={`px-4 py-1 border rounded-lg bg-gray-400 bg-opacity-25 whitespace-nowrap
            ${active ? "bg-gray-400": "bg-gray-400 bg-opacity-25"}`}>
                {children}</button>
        </div>
    )
} 