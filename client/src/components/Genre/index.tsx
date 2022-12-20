import { FC } from "react"

interface GenreProps {
    genre: number 
    
}

const Genre: FC<GenreProps> = (props: GenreProps) => {
    return (
        <>
            {(() => {
                switch(props.genre) {
                case 0:
                    return "action"
                case 1: 
                    return "animation"
                case 2: 
                    return "comedy"
                case 3: 
                    return "crime"
                case 4: 
                    return "drama"
                case 5: 
                    return "experimental"
                case 6: 
                    return "fantasy"
                case 7: 
                    return "historical" 
                case 8: 
                    return "horror"
                case 9: 
                    return "romance"
                case 10: 
                    return "science fiction"
                case 11: 
                    return "thriller"
                case 12:
                    return "western" 
                case 14: 
                    return "other"
                }
            })()}
        </>
    )
}

export default Genre