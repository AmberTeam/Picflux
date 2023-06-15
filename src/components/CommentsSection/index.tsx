import { FC, useState, useEffect, useRef } from "react"
import { useFetcher, ActionFunctionArgs, Params, ParamParseKey, useLoaderData, useParams } from "react-router-dom"
import styles from "./index.module.scss"
import { ReactComponent as SendIcon } from "../../icons/Send.svg"
import store from "../../store/store"
import Comments from "../Comments"
import { IFilmComment } from "../../interfaces/IFilm"
import FilmService from "../../services/FilmService"
import IRating from "../../interfaces/IRating"
import { ReactComponent as NoCommentsIcon } from "../../icons/NotFound.svg"
import Button from "../Button"
import ButtonVariant from "../../enums/ButtonVariant"

interface Props {
    ratings: IRating[]
}

const path = "/film/:id"

interface Args extends ActionFunctionArgs {
    params: Params<ParamParseKey<typeof path>>
}

export async function getNextCommentsLoader({ params, request }: Args) {
    if (params.id) {
        const url = new URL(request.url)
        const offset = url.searchParams.get("offset")
        const response = await FilmService.getComments(params.id, offset ? parseInt(offset) : 0, 15)
        if (response.status === 200) {
            return { comments: response.data.comments, canLoad: response.data.can_load !== false }
        }
    }
}

export async function postCommentAction({ params, request }: Args) {
    const formData = await request.formData()
    const commentContent = formData.get("comment")
    if (params.id && commentContent) {
        const response = await FilmService.addComment(params.id, commentContent.toString())
        if (response.status === 200) {
            return response.data
        }
    }
}

const CommentsSection: FC<Props> = ({ ratings }) => {
    const { comments: firstComments, canLoadMoreComments: canLoadMore } = useLoaderData() as { comments: IFilmComment[], canLoadMoreComments?: boolean }
    const postCommentFetcher = useFetcher<IFilmComment>()
    const getCommentsFetcher = useFetcher<{ canLoad: boolean, comments: IFilmComment[] }>()
    const commentInputRef = useRef<HTMLInputElement>(null)
    const [comments, setComments] = useState<IFilmComment[]>(firstComments)
    const [canLoadMoreComments, setCanLoadMoreComments] = useState<boolean>(canLoadMore !== false)
    const params = useParams<"id">()
    useEffect(() => {
        if (getCommentsFetcher.data) {
            console.log("Get Comments Fetcher triggered")
            setCanLoadMoreComments(getCommentsFetcher.data.canLoad)
            setComments(previousComments => {
                console.log(getCommentsFetcher.data)
                if (getCommentsFetcher.data?.comments) return [...previousComments, ...getCommentsFetcher.data.comments]
                return previousComments
            })
        }
    }, [getCommentsFetcher.data])
    useEffect(() => {
        if (postCommentFetcher.data) {
            console.log("Post Comment Fetcher triggered")
            if (commentInputRef.current) {
                commentInputRef.current.value = ""
            }
            setComments(previousComments => {
                if (postCommentFetcher.data) return [postCommentFetcher.data, ...previousComments]
                return previousComments
            })
        }
    }, [postCommentFetcher.data, commentInputRef.current])
    return (
        <section className={styles["comments-section"]}>
            <postCommentFetcher.Form
                className={styles["upload-comment-container"]}
                method="post"
                action="comments"
            >
                <input
                    type="text"
                    className={styles["upload-comment-input"]}
                    placeholder={store.lang.film.comments.placeholder.ec}
                    name="comment"
                    ref={commentInputRef}
                />
                <button type="submit" className={styles["upload-button"]}>
                    <SendIcon className={styles["upload-icon"]} />
                </button>
            </postCommentFetcher.Form>
            {comments.length ?
                <>
                    <Comments comments={comments} ratings={ratings} />
                    {canLoadMoreComments !== false ?
                        <Button
                            variant={ButtonVariant.Empty}
                            name="offset"
                            value={comments.length}
                            onClick={() => {
                                getCommentsFetcher.load(`/film/${params.id}/comments?offset=${comments.length}`)
                            }}
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
    )
}

export default CommentsSection