import { useEffect } from "react"

export const useResizeHandler = (callback: (width: number, height: number) => void) => {

    const handleResize = (e: any) => callback(window.innerWidth, window.innerHeight)
    
    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    return {handleResize}
}