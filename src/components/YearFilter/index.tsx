import styles from "./index.module.scss"
import Filter from "../Filter"
import { ReactComponent as AscendantIcon } from "../../icons/Ascendant.svg"
const YearFilter = () => {
    return (
        <Filter header="YEAR">
            <button className={styles["year-sort-button"]}>
                <AscendantIcon />
            </button>
            <input
                type="number"
                min="1915"
                max="2023"
                className={styles["year-input"]}
                placeholder="Year"
                name="date"
            />
        </Filter>
    )
}

export default YearFilter