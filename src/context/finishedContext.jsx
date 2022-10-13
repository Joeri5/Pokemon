import {createContext, useContext, useState} from "react";

export const FinishedContext = createContext(["", () => {
}])

export default function FinishedProvider(props) {
    const [finished, setFinished] = useState("");

    return (
        <FinishedContext.Provider value={[finished, setFinished]}>
            {props.children}
        </FinishedContext.Provider>
    )
}

export function useFinished() {
    const context = useContext(FinishedContext);
    if (context === undefined) {
        throw new Error('useHp must be used within a HpProvider')
    }
    return context
}