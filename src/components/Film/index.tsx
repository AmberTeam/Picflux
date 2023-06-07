import { observer } from "mobx-react-lite"
import { FC } from "react"
import styles from "./film.module.scss"
import { IFilm } from "../../interfaces/IFilm"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as PlayIcon } from "../../icons/Play.svg"
import UserService from "../../services/UserService"
import store from "../../store/store"
interface Props {
    film: IFilm
}
const FilmComponent: FC<Props> = ({ film }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles["film-container"]}
            >
                <div 
                    className={styles["film-poster-container"]}
                    onClick={() => navigate(`/film/${film.id}`)}
                >
                    <div className={styles.blurer}>
                        <PlayIcon />
                    </div>
                    <img className={styles["film-poster"]} src={film.poster} />
                </div>
                <div className={styles["film-body"]}>
                    <div className={styles["film-information"]}>
                        <span>{film.name}</span>
                        <span className={styles["film-details"]}>{film.year}. {film.genres.join(", ")}</span>
                    </div>
                    <div className={styles["buttons-container"]}>
                        <Link className={styles.button} to={`/film/${film.id}`} target="blank">{store.lang.home.actions.new_tab}</Link>
                        <button className={styles.button} onClick={async () => {
                            await UserService.addWLFilm(film.id)
                        }}>{store.lang.film.actions.watch_later}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default observer(FilmComponent)