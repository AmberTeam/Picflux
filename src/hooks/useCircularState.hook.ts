import { useState } from "react";

export default function useCircularState<T>(states: T[], defaultValue = 0){
    const [currentState, setCurrentState] = useState<number>(defaultValue);
    const next = (): number => {
        let nextState; 
        setCurrentState(previousState => {
            return nextState = (previousState + 1) % states.length;
        });
        return nextState ?? 0;
    };
    return { next, state: states[currentState] };
}