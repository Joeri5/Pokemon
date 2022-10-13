import {createContext, useContext, useState} from "react";

export const HpContext = createContext([0, () => {
}])

export default function HpProvider(props) {
    const [hp, setHp] = useState(0);

    return (
        <HpContext.Provider value={[hp, setHp]}>
            {props.children}
        </HpContext.Provider>
    )
}

export function useHp() {
    const context = useContext(HpContext);
    if (context === undefined) {
        throw new Error('useHp must be used within a HpProvider')
    }
    return context
}