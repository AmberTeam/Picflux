import { observer } from "mobx-react-lite";
import { FC, useRef, useState } from "react";
import styles from "./film.module.scss";
import { IFilm } from "../../interfaces/IFilm";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as PlayIcon } from "../../icons/Play.svg";
import UserService from "../../services/UserService";
import store from "../../store/store";
import PlaceholderPoster from "../../img/poster_placeholder.png";
import LoaderMini from "../LoaderMini";
import { AxiosResponse } from "axios";
interface Props {
    film: IFilm
}
const FilmComponent: FC<Props> = ({ film }) => {
    const navigate = useNavigate();
    const posterRef = useRef<HTMLImageElement>(null);
    const [isInWatchList, setIsInWatchList] = useState<boolean>(film.is_in_watch_list !== false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <div className={styles["film-container"]}
        >
            <div
                className={styles["film-poster-container"]}
                onClick={() => navigate(`/film/${film.id}`)}
            >
                <div className={styles.blurer}>
                    <PlayIcon />
                </div>
                <img
                    ref={posterRef}
                    className={styles["film-poster"]}
                    src={film.poster}
                    alt="film's poster"
                    onError={(event) => {
                        event.currentTarget.src = PlaceholderPoster;
                    }}
                />
            </div>
            <div className={styles["film-body"]}>
                <div className={styles["film-information"]}>
                    <span>{film.title}</span>
                    <span className={styles["film-details"]}>{film.year}. {film.genres.join(", ")}</span>
                </div>
                <div className={styles["buttons-container"]}>
                    <Link
                        className={styles.button}
                        to={`/film/${film.id}`} 
                        target="blank"
                    >
                        {store.lang.home.actions.new_tab}
                    </Link>
                    {store.isAuth ?
                        <button className={styles.button} onClick={() => {
                            if (!isLoading) {
                                const handleResponse = (response: AxiosResponse) => {
                                    if(response.status === 200) {
                                        setIsInWatchList(wasInWatchList => !wasInWatchList);
                                    }
                                    setIsLoading(false);
                                };
                                setIsLoading(true);
                                if (isInWatchList) {
                                    UserService.removeWLFilm(film.id)
                                        .then(handleResponse);
                                }
                                else {
                                    UserService.addWLFilm(film.id)
                                        .then(handleResponse);
                                }
                            }
                        }}>
                            {isLoading ?
                                <LoaderMini />
                                :
                                isInWatchList ?
                                    store.lang.film.actions.remove
                                    : store.lang.film.actions.watch_later
                            }
                        </button>
                        : null
                    }
                </div>
            </div>
        </div>
    );
};

export default observer(FilmComponent);