import { FC, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";
import UserService from "../../services/UserService";
import store from "../../store/store";
import FilmDetail from "../../components/FilmDetail";
import RatingCounter from "../../components/RatingCounter";
import { useLoaderData, ActionFunctionArgs, Params, ParamParseKey } from "react-router-dom";
import Button from "../../components/Button";
import ButtonVariant from "../../enums/ButtonVariant";
import { ReactComponent as WatchLaterIcon } from "../../icons/WatchLater.svg";
import FilmService from "../../services/FilmService";
import CommentsSection from "../../components/CommentsSection";
import Player from "../../components/Player";
import LoaderMini from "../../components/LoaderMini";
import { IFilmComment, IPlayer, IFilm } from "../../interfaces/IFilm";
import FCRService from "../../services/FCRService";
import PlaceholderPoster from "../../img/poster_placeholder.png";
import { AxiosResponse } from "axios";

const path = "/film/:id";
interface Args extends ActionFunctionArgs {
    params: Params<ParamParseKey<typeof path>>
}

export async function rateFilmAction({ request, params }: Args) {
    if (params.id) {
        const formData = await request.formData();
        const rating = formData.get("rating");
        if (rating) {
            const response = await FilmService.pushRating(parseInt(params.id), parseInt(rating.toString()));
            return { response: response.data };
        }
    }
    return {};
}


const definePlayerGeo = (): string => {
    return "ru";
};

export async function filmLoader({ params }: Args) {
    if (params.id) {
        const film = (await UserService.getById(params.id, store.getStoredLang())).data;
        const players: IPlayer[] = film.players.map(player => {
            const url = FCRService.deartefactUrl(player);
            return {
                url: url,
                geo: definePlayerGeo()
            };
        });
        let comments: IFilmComment[] = [];
        let canLoadMoreComments = false;
        const response = await FilmService.getComments(params.id, 0, 15);
        if (response.data) {
            comments = response.data.comments;
            canLoadMoreComments = response.data.can_load;
        }
        return { film, players, comments, canLoadMoreComments };
    }
    return {};
}
const FilmPage: FC = () => {
    const { film, players } = useLoaderData() as { film: IFilm | undefined, players: IPlayer[] | undefined };
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInWatchList, setIsInWatchList] = useState<boolean>(film?.is_in_watch_list !== false);
    const rating = useMemo(() => {
        if (film?.rated) {
            const userRating = film.rating?.find(rating => rating.owner === store.user.id);
            return userRating?.value ?? 0;
        }
        return 0;
    }, [store.user, film?.rating, film?.rated]);
    if (film) {
        return (
            <div className={styles["film-page-container"]}>
                <Helmet>
                    <title>Cimber: {film.title}</title>
                </Helmet>
                <div className={styles["film-information-container"]}>
                    <img
                        alt="film poster"
                        src={film.poster}
                        className={styles["film-poster"]}
                        onError={(event) => {
                            event.currentTarget.src = PlaceholderPoster;
                        }}
                    />
                    <div className={styles["film-information-watch-later"]}>
                        <div className={styles["film-information"]}>
                            <h1 className={styles["film-name"]}>{film.title}</h1>
                            <div className={styles["film-details-container"]}>
                                <span className={styles.bold}>{store.lang.film.info.header.overview}</span>
                                <div className={styles["film-details"]}>
                                    <FilmDetail
                                        detail={store.lang.film.info.main.release}
                                        value={film.year.toString()}
                                    />
                                    <FilmDetail
                                        detail={store.lang.film.info.main.country_.country}
                                        value={film.countries.join(", ")}
                                    />
                                    <FilmDetail
                                        detail={store.lang.film.info.main.genre_.genres}
                                        value={film.genres.join(", ")}
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
                        {store.isAuth ?
                            <Button
                                variant={ButtonVariant.Empty}
                                className={styles["watch-later-button"]}
                                onClick={() => {
                                    if(!isLoading) {
                                        setIsLoading(true);
                                        const handleResponse = (response: AxiosResponse) => {
                                            if(response.status === 200) {
                                                setIsInWatchList(wasInWatchList => !wasInWatchList);
                                            }
                                            setIsLoading(false);
                                        };
                                        if(isInWatchList) {
                                            UserService.removeWLFilm(film.id)
                                                .then(handleResponse);
                                        }
                                        else {
                                            UserService.addWLFilm(film.id)
                                                .then(handleResponse);
                                        }
                                    }
                                }}
                            >
                                {isLoading ?
                                    <LoaderMini />
                                    :
                                    <>
                                        <WatchLaterIcon className={`${styles["watch-later-icon"]} ${isInWatchList ? styles.active : ""}`} />
                                        <span>
                                            {store.lang.film.actions[isInWatchList ? "watch_later_svd" : "watch_later"]}
                                        </span>
                                    </>
                                }
                            </Button>
                            : null
                        }
                    </div>
                </div>
                <p className={styles["film-description"]}>{film.description}</p>
                {players ?
                    <Player players={players} />
                    : null
                }
                {store.isAuth ?
                    <div className={styles["rate-container"]}>
                        <span className={styles.bold}>{store.lang.film.actions.rate_film}:</span>
                        <RatingCounter
                            rating={rating}
                        />
                    </div>
                    : null
                }
                <CommentsSection ratings={film.rating ?? []} />
            </div>
        );
    }
    else return null;
};

export default observer(FilmPage);