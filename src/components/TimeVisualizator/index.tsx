import { FC, ReactNode, useEffect, useState } from "react"
import store from "../../store/store"

interface ITime {
    time: string | number
}

const TimeVisualizator: FC<ITime> = (props: ITime) => {
    const [timeVisualized, setTimeVisualized] = useState<any | null>(null)

    const formatDate = (d: Date): string => {
        let month = "" + (d.getMonth() + 1),
            day = "" + d.getDate()
        const year = d.getFullYear()
        if (month.length < 2) 
            month = "0" + month
        if (day.length < 2) 
            day = "0" + day

        return [year, month, day].join("/")
    }

    const DetectTime:any = (time:string | number): ReactNode => {
        const MINUTE_MIL = 60000
        const HOUR_MIN = 60
        const diff = Date.now() - Number(time)
        if(diff < MINUTE_MIL) return store.lang.time_viz.rnow
        const divided = Math.floor(diff / MINUTE_MIL)

        if(divided >= 60 && divided <= 720) return `${Math.floor(divided / HOUR_MIN)} ${store.lang.time_viz.hour}`
        if(divided > 720) return formatDate(new Date(Number(time)))
        return `${divided} ${store.lang.time_viz.min}`
    }

    useEffect(() => {
        setTimeVisualized(DetectTime(props.time))
    }, [props.time])

    if(!timeVisualized) return "__error__"

    return timeVisualized
}

export default TimeVisualizator