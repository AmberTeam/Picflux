import { FC, useMemo } from "react"
import { IFilmComment } from "../../interfaces/IFilm"
import styles from "./index.module.scss"
import Comment from "../Comment/index"
import IRating from "../../interfaces/IRating"
interface Props {
    comments: IFilmComment[]
    ratings: IRating[]
}

const Comments: FC<Props> = ({ comments, ratings }) => {
    const mergedCommentsRatings = useMemo(() => {
        const seen: { [key: string]: number } = {}
        return comments.map(comment => {
            let rating: number | undefined
            if (seen[comment.user.id] !== undefined) {
                rating = seen[comment.user.id]
            }
            else {
                rating = ratings.find(rating => rating.owner === comment.user.id)?.value
            }
            return {
                ...comment,
                rating
            }
        })
    }, [ratings, comments])
    return (
        <div className={styles["comments-container"]}>
            <div className={styles.comments}>
                {mergedCommentsRatings.map(({ rating, ...comment }) => {
                    return <Comment comment={comment} rating={rating} key={comment.id} />
                })}
            </div>
        </div>
    )
}

export default Comments