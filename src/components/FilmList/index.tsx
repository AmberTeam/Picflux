import { FC } from "react";
import Film from "../Film";
import styles from "./index.module.scss";
import { IFilm } from "../../interfaces/IFilm";
import store from "../../store/store";
import { ReactComponent as NotFoundIcon } from "../../icons/NotFound.svg";
import { observer } from "mobx-react-lite";
interface Props {
    films: IFilm[]
}

const FilmList: FC<Props> = ({ films }) => {
    return (
        films.length ?
            <div className={`container ${styles["films-container"]}`}>
                {films.map(film => {
                    return <Film key={film.id} film={film} />;
                })}
            </div>
            :
            <div className={styles["not-found-container"]}>
                <NotFoundIcon className={styles["not-found-icon"]} />
                <p className={styles["not-found-text"]}>{store.lang.home.throws.not_found}</p>
            </div>
    );
};

export default observer(FilmList);