import { FC, useMemo } from "react"
import styles from "./index.module.scss"
import { ReactComponent as StarIcon } from "../../icons/Star.svg"
import { ReactComponent as ClearIcon } from "../../icons/Close.svg"
import { useFetcher, useLoaderData } from "react-router-dom"
import { IFilmGetById } from "../../services/UserService"
import store from "../../store/store"
interface Props {
    rating: number
}

const RatingCounter: FC<Props> = () => {
    const { film } = useLoaderData() as { film: IFilmGetById }
    const fetcher = useFetcher()
    let rating = useMemo(() => film.rated ? film.rating.find(rating => rating.owner === store.user.id)?.value ?? 0 : 0, [film.rating, store.user.id])
    if(fetcher.formData) {
        rating = parseInt(fetcher.formData.get("rating") as string) ?? 0
    }
    return (
        <fetcher.Form className={styles["rating-container"]} method="post" action="rate-film">
            {Array.from({ length: 10 }, (_, index) => {
                const value = index + 1
                return (
                    <button
                        key={index}
                        className={styles["rate-button"]}
                        type="submit"
                        name="rating"
                        value={value}
                    >
                        <StarIcon
                            className={`${styles["star-icon"]} ${value <= rating ? styles.active : ""} ${value === rating ? styles.clicked : ""}`}
                        />
                    </button>
                )
            })}
            <span className={styles.rating}>{rating}</span>
            <button 
                className={styles["clear-button"]}
                type="submit"
                name="rating"
                value={0}
            >
                <ClearIcon className={styles["clear-icon"]} />
            </button>
        </fetcher.Form>
    )
}

export default RatingCounter
