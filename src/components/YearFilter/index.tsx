import { FunctionComponent, SVGProps, useMemo } from "react";
import styles from "./index.module.scss";
import Filter from "../Filter";
import { ReactComponent as AscendantIcon } from "../../icons/Ascendant.svg";
import useCircularState from "../../hooks/useCircularState.hook";
import SortCriteria from "../../enums/SortCriteria";
import SortDirection from "../../enums/SortDirection";
import { ReactComponent as DescendantIcon } from "../../icons/Descendant.svg";

enum States {
    Disabled = "disabled",
    Ascendant = "ascendant",
    Descendant = "descendant"
}

interface ICircularState {
    sortCriteria: SortCriteria
    sortDirection: SortDirection
    className: string
    icon: FunctionComponent<SVGProps<SVGSVGElement>>
    id: States
}

const states = [{
    sortCriteria: SortCriteria.None,
    sortDirection: SortDirection.Descendant,
    className: "inactive",
    icon: DescendantIcon,
    id: States.Disabled
},
{
    sortCriteria: SortCriteria.Date,
    sortDirection: SortDirection.Ascendant,
    className: "ascendant",
    icon: AscendantIcon,
    id: States.Ascendant
},
{
    sortCriteria: SortCriteria.Date,
    sortDirection: SortDirection.Descendant,
    className: "descendant",
    icon: DescendantIcon,
    id: States.Descendant
}];
const YearFilter = () => {
    const defaultState = useMemo(() => {
        const sortCriteria = localStorage.getItem("sort-criteria") as SortCriteria;
        const sortDirection = localStorage.getItem("sort-direction") as SortDirection;
        if(sortCriteria === SortCriteria.Date) {
            if(sortDirection === SortDirection.Ascendant) {
                return 1;
            }
            else {
                return 2;
            }
        }
        else {
            return 0;
        }
    }, []);
    const { next, state } = useCircularState<ICircularState>(states, defaultState);
    return (
        <Filter header="YEAR">
            <div className={styles["year-filter-container"]}>
                <div className={styles["year-input-container"]}>
                    <input type="hidden" value={state.sortCriteria} name="sort-criteria" />
                    <input type="hidden" value={state.sortDirection} name="sort-direction" />
                    <button
                        className={`${styles["year-sort-button"]} ${styles[state.className]}`}
                        onClick={() => {
                            const nextStateIndex = next();
                            localStorage.setItem("sort-year", states[nextStateIndex].id);
                        }}
                        type="submit"
                    >
                        <state.icon className={styles["year-sort-icon"]} />
                    </button>
                    <input
                        disabled={state.id !== States.Disabled}
                        defaultValue={localStorage.getItem("date") ?? ""}
                        type="number"
                        min="1915"
                        max="2023"
                        className={`${state.sortCriteria === SortCriteria.None ? "" : styles.inactive} ${styles["year-input"]}`}
                        placeholder="Year"
                        name="date"
                    />
                </div>
                <div className={styles["range-inputs-container"]}>
                    <input 
                        type="number" 
                        name="start-year"
                        placeholder="Start"
                        defaultValue={localStorage.getItem("start-year") ?? ""}
                        min="1915"
                        max="2023"
                        className={`${state.sortCriteria === SortCriteria.None ? styles.inactive : ""} ${styles["year-input"]}`}
                        disabled={state.sortCriteria === SortCriteria.None}
                    />
                    <input 
                        type="number"
                        name="end-year"
                        placeholder="End"
                        defaultValue={localStorage.getItem("end-year") ?? ""}
                        min="1915"
                        max="2023"
                        className={`${state.sortCriteria === SortCriteria.None ? styles.inactive : ""} ${styles["year-input"]}`}
                        disabled={state.sortCriteria === SortCriteria.None}
                    />
                </div>
            </div>
        </Filter>
    );
};

export default YearFilter;