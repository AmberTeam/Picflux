import { RefObject, useEffect, useRef } from "react"

export const useObserver = (ref: RefObject<HTMLElement>, canLoad: boolean, deps: any[], isLoading: boolean, callback: () => void) => {
    const observer = useRef<IntersectionObserver>()
    useEffect(() => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        const cb = function (entries: any) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        }
        observer.current = new IntersectionObserver(cb)
        if(ref.current) {
            observer.current.observe(ref.current)
        }
    }, [isLoading, ...deps])
}