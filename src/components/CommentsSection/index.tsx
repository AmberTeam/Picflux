import { FC, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { ReactComponent as SendIcon } from "../../icons/Send.svg";
import store from "../../store/store";
import Comments from "../Comments";
import { IFilmComment } from "../../interfaces/IFilm";
import FilmService from "../../services/FilmService";
import IRating from "../../interfaces/IRating";
import { ReactComponent as NoCommentsIcon } from "../../icons/NotFound.svg";
import Button from "../Button";
import ButtonVariant from "../../enums/ButtonVariant";
import { observer } from "mobx-react-lite";

interface Props {
    ratings: IRating[]
}

const CommentsSection: FC<Props> = ({ ratings }) => {
    const { comments: firstComments, canLoadMoreComments: canLoadMore } = useLoaderData() as { comments: IFilmComment[], canLoadMoreComments?: boolean };
    const [comments, setComments] = useState<IFilmComment[]>(firstComments);
    const [canLoadMoreComments, setCanLoadMoreComments] = useState<boolean>(canLoadMore !== false);
    const [comment, setComment] = useState<string>("");
    const params = useParams<"id">();
    const getNextComments = async () => {
        if(params.id) {
            const response = await FilmService.getComments(params.id, comments.length, 15);
            if(response.data) {
                setCanLoadMoreComments(response.data.can_load);
                setComments(previousComments => {
                    if (response.data.comments.length) return [...previousComments, ...response.data.comments];
                    return previousComments;
                });
            }
        }
    };
    const createComment = async () => {
        if(comment) {
            if (params.id) {
                const createdComment = await FilmService.addComment(params.id, comment);
                if(createdComment.data) {
                    setComments(previousComments => {
                        return [createdComment.data, ...previousComments];
                    });
                    setComment("");
                }
            }
        }
    };
    return (
        <section className={styles["comments-section"]}>
            <form
                className={styles["upload-comment-container"]}
                method="post"
                action="comments"
                onSubmit={(event) => {
                    event.preventDefault();
                    createComment();
                }}
            >
                <input
                    type="text"
                    className={styles["upload-comment-input"]}
                    placeholder={store.lang.film.comments.placeholder.ec}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <button type="submit" className={styles["upload-button"]}>
                    <SendIcon className={styles["upload-icon"]} />
                </button>
            </form>
            {comments.length ?
                <>
                    <Comments comments={comments} ratings={ratings} />
                    {canLoadMoreComments !== false ?
                        <Button
                            variant={ButtonVariant.Empty}
                            onClick={getNextComments}
                        >
                            {store.lang.film.comments.lm}
                        </Button>
                        : null
                    }
                </>
                :
                <div className={styles["no-comments-container"]}>
                    <NoCommentsIcon className={styles["no-comments-icon"]} />
                    <span>{store.lang.film.comments.nc}</span>
                </div>
            }
        </section>
    );
};

export default observer(CommentsSection);