// src/context/GlobalContext.tsx
import {createContext, ReactNode, useContext, useState} from 'react';

type GlobalContextType = {
    isToggled: boolean;
    setIsToggled: (value: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({children}: { children: ReactNode }) => {
    // Change here to change default mode
    const [isToggled, setIsToggled] = useState<boolean>(true);

    return (
        <GlobalContext.Provider
            value={{isToggled, setIsToggled}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};