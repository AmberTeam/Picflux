import { FC } from "react"
import ButtonVariant from "../../enums/ButtonVariant"
import { IFilmComment } from "../../interfaces/IFilm"
import store from "../../store/store"
import Button from "../Button"
import styles from "./index.module.scss"
import { ReactComponent as NoCommentsIcon } from "../../icons/NotFound.svg"
interface Props {
    comments: IFilmComment[]
}

const Comments: FC<Props> = ({ comments }) => {
    return (
        comments.length ?
            <div className={styles["comments-container"]}>
                <div className={styles.comments}>
                    {comments.map((comment) => {
                        return <div key={comment.data}>Hola</div>
                    })}
                </div>
                <Button variant={ButtonVariant.Empty}>
                    {store.lang.film.comments.lm}
                </Button>
            </div>
            :
            <div className={styles["no-comments-container"]}>
                <NoCommentsIcon className={styles["no-comments-icon"]} />
                <span>{store.lang.film.comments.nc}</span>
            </div>
    )
}

export default Comments