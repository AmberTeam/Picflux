import { FC, useMemo } from "react"
import styles from "./index.module.scss"
import { observer } from "mobx-react-lite"
import { Helmet } from "react-helmet"
import UserService, { IFilmGetById } from "../../services/UserService"
import store from "../../store/store"
import FilmDetail from "../../components/FilmDetail"
import RatingCounter from "../../components/RatingCounter"
import { useFetcher, useLoaderData } from "react-router-dom"
import Button from "../../components/Button"
import ButtonVariant from "../../enums/ButtonVariant"
import { ReactComponent as WatchLaterIcon } from "../../icons/WatchLater.svg"
import FilmService from "../../services/FilmService"

import CommentsSection from "../../components/CommentsSection"
import Player from "../../components/Player"
enum ManageWatchLaterAction {
    Add = "add",
    Remove = "remove"
}

export async function rateFilmAction({ request, params }: { request: Request, params: any }) {
    const formData = await request.formData()
    const rating = formData.get("rating")
    if (rating) {
        const response = await FilmService.pushRating(params.id, parseInt(rating as string))
        return { response: response.data }
    }
    return {}
}

export async function manageWatchLaterAction({ request, params }: { request: Request, params: any }) {
    const formData = await request.formData()
    const action = formData.get("action")
    let response
    if (action === ManageWatchLaterAction.Add) {
        response = await UserService.addWLFilm(params.id)
    }
    else if (action === ManageWatchLaterAction.Remove) {
        response = await UserService.removeWLFilm(params.id)
    }
    return { response }
}

export async function filmLoader({ params }: { params: any }) {
    const film = (await UserService.getById(params.id, store.getStoredLang())).data
    return { film }
}
const FilmPage: FC = () => {
    const { film } = useLoaderData() as { film: IFilmGetById, player: string }
    const isInWatchList = useMemo(() => film?.watchLater.some(watchLaterFilmId => watchLaterFilmId === film.id.toString() ?? false), [film.watchLater])
    const rating = useMemo(() => {
        if (film.rated) {
            const userRating = film.rating.find(rating => rating.owner === store.user.id)
            return userRating?.value ?? 0
        }
        return 0
    }, [store.user, film.rating, film.rated])
    const fetcher = useFetcher()
    return (
        <div className={styles["film-page-container"]}>
            <Helmet>
                <title>Cimber: {film.name}</title>
                <meta name="viewport" content="width=1000" />
                <meta httpEquiv="X-UA-Compatible" content="chrome=IE8" />
                <meta property="og:type" content="video.tv_series" />
                <meta property="og:video:height" content="430" />
                <meta property="og:video:width" content="600" />
                <meta property="og:duration" content="2700" />
                <meta property="og:video:type" content="application/x-shockwave-flash" />
                <meta property="og:site_name" content="rezka.ag" />
                <meta property="og:title" content="Ветреный дворец / Ветреное место / Встреча с собой (2023)" />
                <meta property="og:image" content={film.poster} />
            </Helmet>
            <div className={styles["film-information-container"]}>
                <img src={film.poster} className={styles["film-poster"]} />
                <div className={styles["film-information-watch-later"]}>
                    <div className={styles["film-information"]}>
                        <h1 className={styles["film-name"]}>{film.name}</h1>
                        <div className={styles["film-details-container"]}>
                            <span className={styles.bold}>{store.lang.film.info.header.overview}</span>
                            <div className={styles["film-details"]}>
                                <FilmDetail
                                    detail={store.lang.film.info.main.release}
                                    value={film.year.toString()}
                                />
                                <FilmDetail
                                    detail={store.lang.film.info.main.country_.country}
                                    value={JSON.parse(film.countries).join(", ")}
                                />
                                <FilmDetail
                                    detail={store.lang.film.info.main.genre_.genres}
                                    value={JSON.parse(film.genres).join(", ")}
                                />
                                <FilmDetail
                                    detail={store.lang.film.info.main.duration}
                                    value={film.duration}
                                />
                                <FilmDetail
                                    detail={store.lang.film.info.main.rating}
                                    value={film.rating_average?.toString() ?? store.lang.film.info.main.nrating}
                                />
                            </div>
                        </div>
                    </div>
                    {store.user ?
                        <fetcher.Form
                            method="post"
                            action="manage-watch-list"
                        >
                            <Button
                                variant={ButtonVariant.Empty}
                                className={styles["watch-later-button"]}
                                value={isInWatchList ? ManageWatchLaterAction.Remove : ManageWatchLaterAction.Add}
                                name="action"
                                type="submit"
                            >
                                <WatchLaterIcon className={`${styles["watch-later-icon"]} ${isInWatchList ? styles.active : ""}`} />
                                <span>
                                    {store.lang.film.actions[isInWatchList ? "watch_later_svd" : "watch_later"]}
                                </span>
                            </Button>
                        </fetcher.Form>
                        : null
                    }
                </div>
            </div>
            <p className={styles["film-description"]}>{film.description}</p>
            <Player players={film.players}/>
            <div className={styles["rate-container"]}>
                <span className={styles.bold}>{store.lang.film.actions.rate_film}:</span>
                <RatingCounter
                    rating={rating}
                />
            </div>
            <CommentsSection />
        </div>
    )
}

export default observer(FilmPage)