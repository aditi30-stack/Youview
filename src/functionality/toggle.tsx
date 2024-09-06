import { createContext, useState, ReactNode } from "react";

export interface ToggleContextProps {
    toggle: boolean;
    handleToggle: () => void;
    theme: 'light' | 'dark';
    handleTheme: () => void;
}

export const ToggleContext = createContext<null | ToggleContextProps>(null);

interface ProviderProps {
    children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
    const [toggle, setToggle] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const handleToggle = () => {
        setToggle(prev => !prev);
    };

    const handleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
        document.documentElement.classList.toggle('dark', theme === 'light');
    };

    return (
        <ToggleContext.Provider value={{ toggle, handleToggle, theme, handleTheme }}>
            {children}
        </ToggleContext.Provider>
    );
};
