import { FC, useState, useRef, useEffect, useCallback } from "react"
import { observer } from "mobx-react-lite"
import styles from "./index.module.scss"
import SearchForm from "../../components/SearchForm"
import FilmList from "../../components/FilmList"
import { IFilm } from "../../interfaces/IFilm"
import SortCriteria from "../../enums/SortCriteria"
import SortDirection from "../../enums/SortDirection"
import FilteringType from "../../enums/FilteringType"
import LoadingMethod from "../../enums/LoadingMethod"
import Trigger from "../../components/Trigger"
import { ReactComponent as PlusIcon } from "../../icons/Plus.svg"
import store from "../../store/store"
import UserService from "../../services/UserService"
import { Form, useLoaderData, useSubmit } from "react-router-dom"
export interface IDLC {
    genres: string,
    filtering_type: FilteringType,
    date: number | "any"
    sortCriteria: SortCriteria
    sortDirection: SortDirection
}

export async function homeLoader({ request }: { request: Request }) {
    const url = new URL(request.url)
    const genres = url.searchParams.get("genres") ?? ""
    const query = url.searchParams.get("query") ?? ""
    let offset = url.searchParams.get("offset") ?? 0
    if (typeof offset === "string") {
        offset = parseInt(offset)
    }
    const filteringType = url.searchParams.get("filtering_type") as FilteringType
    const response = await UserService.search(query, 12, offset, {
        genres,
        filtering_type: filteringType,
        date: "any",
        sortCriteria: SortCriteria.None,
        sortDirection: SortDirection.Descendant
    })
    return { films: response.data.films, canLoad: response.data.can_load, isFirstPage: offset === 0 }
}

const HomePage: FC = () => {
    const url = useRef(new URL(location.href))
    const { films: newFilms, canLoad, isFirstPage } = useLoaderData() as { films: IFilm[], canLoad: boolean, isFirstPage: boolean }
    const [loadMethod, setLoadMethod] = useState<LoadingMethod>(LoadingMethod.OnClick)
    const [films, setFilms] = useState<IFilm[]>([])
    const submit = useSubmit()
    useEffect(() => {
        if(isFirstPage) {
            setFilms([...newFilms])
        }
        else {
            setFilms(previousFilms => [...previousFilms, ...newFilms])
        }
    }, [newFilms])
    useEffect(() => {
        url.current = new URL(location.href)
    }, [location.href])
    const fetchNextFilms = useCallback(() => {
        const previousOffset: string = url.current.searchParams.get("offset") ?? "0"
        if (previousOffset !== undefined) {
            url.current.searchParams.delete("offset")
        }
        url.current.searchParams.append("offset", (parseInt(previousOffset) + 12).toString())
        const formData = new FormData()
        for (const [key, value] of url.current.searchParams.entries()) {
            formData.append(key, value)
        }
        submit(formData)
    }, [])
    return (
        <section className={styles["home-section"]}>
            <div className={styles["home-header"]}>
                <h1>
                    {store.lang.home.title.big.fst} <span className="a_col">{store.lang.home.title.big.sec}</span> {store.lang.home.title.big.thrd}
                </h1>
                <p>{store.lang.home.title.small}</p>
            </div>
            <div className={styles["home-content"]}>
                <SearchForm
                    onLoadMethodChange={(loadMethod: LoadingMethod) => setLoadMethod(loadMethod)}
                />
                <FilmList films={films} />
                {films.length && canLoad ?
                    <Form
                        method="get"
                    >
                        {
                            loadMethod === LoadingMethod.Auto ?
                                <Trigger onTrigger={fetchNextFilms} />
                                :
                                <button
                                    className={styles["load-button"]}
                                    onClick={fetchNextFilms}
                                    type="button"
                                >
                                    <PlusIcon />
                                    <span>{store.lang.home.actions.load_more}</span>
                                </button>
                        }
                    </Form>
                    : null
                }
            </div>
        </section>
    )
}

export default observer(HomePage)