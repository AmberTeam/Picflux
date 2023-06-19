import { FC } from "react";
import styles from "./index.module.scss";
import { IFilmComment } from "../../interfaces/IFilm";
import { ReactComponent as StarIcon } from "../../icons/Star.svg";

interface Props {
    comment: IFilmComment
    rating?: number
}

const Comment: FC<Props> = ({ comment, rating }) => {
    return (
        <div className={styles["comment-container"]}>
            <div className={styles["comment-details"]}>
                <div className={styles["comment-user-information"]}>
                    <img src={comment.user.avatar} className={styles["user-avatar"]} />
                    <span>{comment.user.username}</span>
                    {rating ?
                        <div className={styles["comment-user-rating-container"]}>
                            <span>{rating}</span>
                            <StarIcon className={styles["rating-icon"]}/>
                        </div>
                        : null
                    }
                </div>
                <span className={styles["comment-date"]}>{comment.datef_v}</span>
            </div>
            <span className={styles.comment}>{comment.data}</span>
        </div>
    );
};

export default Comment;