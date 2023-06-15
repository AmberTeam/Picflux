import { FunctionComponent, SVGProps, useMemo } from "react"
import styles from "./index.module.scss"
import Filter from "../Filter"
import { ReactComponent as AscendantIcon } from "../../icons/Ascendant.svg"
import useCircularState from "../../hooks/useCircularState.hook"
import SortCriteria from "../../enums/SortCriteria"
import SortDirection from "../../enums/SortDirection"
import { ReactComponent as DescendantIcon } from "../../icons/Descendant.svg"

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
}]
const YearFilter = () => {
    const defaultState = useMemo(() => {
        const defaultStateIndex = states.findIndex(state => state.id === localStorage.getItem("sort-year"))
        return defaultStateIndex !== -1 ? defaultStateIndex : 0
    }, [])
    const { next, state } = useCircularState<ICircularState>(states, defaultState)
    return (
        <Filter header="YEAR">
            <input type="hidden" value={state.sortCriteria} name="sort-criteria" />
            <input type="hidden" value={state.sortDirection} name="sort-direction" />
            <button
                className={`${styles["year-sort-button"]} ${styles[state.className]}`}
                onClick={() => {
                    const nextStateIndex = next()
                    localStorage.setItem("sort-year", states[nextStateIndex].id)
                }}
            >
                <state.icon className={styles["year-sort-icon"]} />
            </button>
            <input
                disabled={state.id !== States.Disabled}
                defaultValue={localStorage.getItem("date") ?? ""}
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