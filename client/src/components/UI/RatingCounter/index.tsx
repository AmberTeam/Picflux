import { FC, useEffect, useMemo, useState } from "react"
import cl from "./index.module.sass"

interface IRatingCounterProps {
    handler: (arg:number) => void
    force_rating?: number
}

interface IStartIconProps {
    curr:boolean
    status: boolean
}

function StarIcon(props:IStartIconProps) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${cl.Ic} ${props.status ? cl.Active : cl.Default} ${props.curr ? cl.Current : ""}`} viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    )
}

interface IRatingIconProps { 
    index:number
    rating: number 
    hoverRating: number 
    onMouseEnter: (arg:any) => void 
    onMouseLeave: () => void 
    onMouseRating: () => void 
    onSaveRating: (arg:any) => void
}

function RatingIcon(props:any) {

    const status = useMemo(() => {
        if (props.hoverRating >= props.index) return true
        else if (!props.hoverRating && props.rating >= props.index) return true
        return false
    }, [props.rating, props.hoverRating, props.index])

    return (
        <div
            className="cursor-pointer"
            onMouseEnter={() => props.onMouseEnter(props.index)}
            onMouseLeave={() => props.onMouseLeave()}
            onClick={() => props.onSaveRating(props.index)}
        >
            <StarIcon curr={props.rating === props.index} status={status} />
        </div>
    )
}

const RatingCounter:FC<IRatingCounterProps> = (props:IRatingCounterProps) => {
    const [rating, setRating] = useState<number>(props.force_rating ? props.force_rating : 0)
    const [hoverRating, setHoverRating] = useState<number>(0)  
    const [selected, setSelected] = useState<boolean>(false)

    const onMouseEnter = (index:number) => {
        !selected && setHoverRating(index)
    }
    const onMouseLeave = () => {
        !selected && setHoverRating(0)
    }
    const onSaveRating = (index:number) => {
        if(selected) return 
        setRating(index)
        props.handler(index)
        setSelected(true)
    }

    useEffect(() => {
        if(props.force_rating) {
            setSelected(true)
            setRating(props.force_rating)
        } 
    }, [props.force_rating])

    return (
        <div className={cl.Rating_container}>
            {[1,2,3,4,5,6,7,8,9,10].map((index) => {
                return (
                <RatingIcon 
                    index={index} 
                    rating={rating} 
                    hoverRating={hoverRating} 
                    onMouseEnter={onMouseEnter} 
                    onMouseLeave={onMouseLeave} 
                    onSaveRating={onSaveRating} />
                )
            })}
        </div>
    )
}

export default RatingCounter