import { useState,  useRef, RefObject } from "react"
import styles from "./index.module.scss"
import { ReactComponent as ReloadIcon } from "../../icons/Reload.svg"
import { ReactComponent as FilterIcon } from "../../icons/Filter.svg"
import { ReactComponent as SearchIcon } from "../../icons/Search.svg"
import Filters from "../Filters"
import LoadingMethod from "../../enums/LoadingMethod"
import { observer } from "mobx-react-lite"
import store from "../../store/store"
import { FetcherWithComponents } from "react-router-dom"
interface Props <T> {
    onLoadMethodChange: (loadMethod: LoadingMethod) => void
    formRef: RefObject<HTMLFormElement>
    fetcher: FetcherWithComponents<T>
}
const SearchForm = <T, >({ onLoadMethodChange, formRef, fetcher }: Props<T>) => {
    const timeoutIdRef = useRef<number | null>(null)
    const searchInputRef = useRef(null)
    const [areFiltersVisible, setAreFiltersVisible] = useState<boolean>(false)
    const [isFieldFocused, setIsFieldFocused] = useState<boolean>(false)
    return (
        <fetcher.Form
            method="get"
            action="get-films"
            onInput={() => {
                if(formRef.current) {
                    if(typeof timeoutIdRef.current === "number") clearTimeout(timeoutIdRef.current)
                    timeoutIdRef.current = window.setTimeout(() => {
                        if(formRef.current !== null) {
                            const urlParams = new URLSearchParams()
                            let query = "/get-films?"
                            const data = new FormData(formRef.current)
                            for(const [key, value] of data) {
                                urlParams.set(key, value.toString())
                            }
                            query += urlParams
                            fetcher.load(query)
                        }
                    }, 800)
                }
            }}
            ref={formRef}
        >
            <input type="hidden" name="offset" value="0" />
            <div className={styles.container}>
                <button
                    type="submit"
                    className={styles.tool}
                    onClick={() => {
                        if (searchInputRef.current) {
                            (searchInputRef.current as HTMLInputElement).value = ""
                        }
                    }}
                >
                    <ReloadIcon className={styles["tool-icon"]} />
                </button>
                <div
                    className={`${styles["search-field"]} ${isFieldFocused ? styles.focused : ""}`}
                >
                    <input
                        ref={searchInputRef}
                        placeholder={store.lang.g.UI.input.g.search}
                        className={styles["search-input"]}
                        onFocus={() => setIsFieldFocused(true)}
                        onBlur={() => setIsFieldFocused(false)}
                        name="query"
                        defaultValue={localStorage.getItem("query") ?? ""}
                    />
                    <button className={styles["search-icon-button"]} type="submit">
                        <SearchIcon className={styles["search-icon"]} />
                    </button>
                </div>
                <button type="button" className={styles.tool} onClick={() => setAreFiltersVisible(state => !state)}>
                    <FilterIcon className={styles["tool-icon"]} />
                </button>
            </div>
            <Filters
                isVisible={areFiltersVisible}
                onLoadMethodChange={onLoadMethodChange}
            />
        </fetcher.Form>
    )
}

export default observer(SearchForm)