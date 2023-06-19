import { FC } from "react";
import styles from "./index.module.scss";
interface Props {
  detail: string
  value: string
}
const FilmDetail: FC<Props> = ({ detail, value }) => {
    return (
        <div className={styles["film-detail-container"]}>
            <span className={styles["film-detail"]}>{detail}:</span>
            <span className={styles["film-detail-value"]}>{value}</span>
        </div>
    );
};

export default FilmDetail;