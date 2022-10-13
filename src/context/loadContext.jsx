import {createContext, useContext, useState} from "react";

export const LoadContext = createContext([true, () => {
}])

export default function LoadingProvider(props) {
    const [loading, isLoading] = useState(true);

    return (
        <LoadContext.Provider value={[loading, isLoading]}>
            {props.children}
        </LoadContext.Provider>
    )
}

export function useLoading() {
    const context = useContext(LoadContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a UseLoadingProvider')
    }
    return context
}