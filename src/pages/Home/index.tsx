import { FC, useState, useRef, useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import styles from "./index.module.scss";
import SearchForm from "../../components/SearchForm";
import FilmList from "../../components/FilmList";
import { IFilm } from "../../interfaces/IFilm";
import SortCriteria from "../../enums/SortCriteria";
import SortDirection from "../../enums/SortDirection";
import FilteringType from "../../enums/FilteringType";
import LoadingMethod from "../../enums/LoadingMethod";
import Trigger from "../../components/Trigger";
import { ReactComponent as PlusIcon } from "../../icons/Plus.svg";
import store from "../../store/store";
import UserService from "../../services/UserService";
import { useFetcher, useLoaderData } from "react-router-dom";

export interface IDLC {
    genres: string
    filtering_type: FilteringType
    date: string
    sortCriteria: SortCriteria
    sortDirection: SortDirection
    rangeStart: string
    rangeEnd: string
}

export async function getFilmsLoader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const genres = url.searchParams.get("genres") ?? "";
    const query = url.searchParams.get("query") ?? "";
    let offset: string | number | null = url.searchParams.get("offset");
    if (typeof offset === "string" && offset) offset = parseInt(offset);
    else offset = 0;
    const filteringType = url.searchParams.get("filtering-type") as FilteringType;
    const date = url.searchParams.get("date");
    const sortCriteria = url.searchParams.get("sort-criteria") as SortCriteria ?? SortCriteria.None;
    const sortDirection = url.searchParams.get("sort-direction") as SortDirection ?? SortDirection.Descendant;
    const rangeStart = url.searchParams.get("start-year") ?? "";
    const rangeEnd = url.searchParams.get("end-year") ?? "";
    localStorage.setItem("genres", genres);
    localStorage.setItem("query", query);
    localStorage.setItem("date", date ?? "");
    localStorage.setItem("filtering-type", filteringType);
    localStorage.setItem("sort-criteria", sortCriteria);
    localStorage.setItem("sort-direction", sortDirection);
    localStorage.setItem("start-year", rangeStart);
    localStorage.setItem("end-year", rangeEnd);
    const response = await UserService.search(query, 12, offset, {
        genres,
        filtering_type: filteringType,
        date: date ?? "any",
        sortCriteria,
        sortDirection,
        rangeStart,
        rangeEnd
    });
    return { films: response.data.films, canLoad: response.data.can_load, isFirst: offset === 0 };
}

export async function homeLoader() {
    const genres = localStorage.getItem("genres") ?? "";
    const query = localStorage.getItem("query") ?? "";
    const filteringType = localStorage.getItem("filtering-type") as FilteringType ?? FilteringType.None;
    const date = localStorage.getItem("date") ?? "any";
    const rangeStart = localStorage.getItem("start-year") ?? "any";
    const rangeEnd = localStorage.getItem("end-year") ?? "any";
    const sortCriteria = localStorage.getItem("sort-criteria") as SortCriteria ?? SortCriteria.None;
    const sortDirection = localStorage.getItem("sort-direction") as SortDirection ?? SortDirection.Descendant;
    const response = await UserService.search(query, 12, 0, {
        genres,
        filtering_type: filteringType,
        date,
        sortCriteria,
        sortDirection,
        rangeEnd,
        rangeStart
    });
    return { films: response.data.films, canLoad: response.data.can_load };
}

interface FetcherData {
    canLoad: boolean
    films: IFilm[]
    isFirst?: boolean
}

const HomePage: FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const { films: firstFilms, canLoad } = useLoaderData() as { films: IFilm[], canLoad: boolean };
    const [loadMethod, setLoadMethod] = useState<LoadingMethod>(localStorage.getItem("load-method") as LoadingMethod ?? LoadingMethod.OnClick);
    const [films, setFilms] = useState<IFilm[]>(firstFilms);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(canLoad);
    const fetcher = useFetcher<FetcherData>();
    const getNextFilms = useCallback(() => {
        if (formRef.current) {
            const data = new FormData(formRef.current);
            data.delete("offset");
            const urlParams = new URLSearchParams();
            let query = `/get-films?offset=${films.length}`;
            for (const [key, value] of data.entries()) {
                urlParams.append(key, value.toString());
            }
            query += urlParams;
            fetcher.load(query);
        }
    }, [films]);
    useEffect(() => {
        if (fetcher.data && (fetcher.state !== "submitting" && fetcher.state !== "loading")) {
            if (fetcher.data.isFirst) {
                setFilms(fetcher.data.films);
            }
            else {
                setFilms(previousFilms => [...previousFilms, ...(fetcher.data?.films ?? [])]);
            }
            setCanLoadMore(fetcher.data.canLoad);
        }
    }, [fetcher.data]);
    return (
        <section className={styles["home-section"]}>
            <div className={styles["home-header"]}>
                <h1>
                    {store.lang.home.title.big.fst} <span className="a_col">{store.lang.home.title.big.sec}</span> {store.lang.home.title.big.thrd}
                </h1>
                <p>{store.lang.home.title.small}</p>
            </div>
            <div className={styles["home-content"]}>
                <SearchForm<FetcherData>
                    onLoadMethodChange={(loadMethod: LoadingMethod) => {
                        setLoadMethod(loadMethod);
                        localStorage.setItem("load-method", loadMethod);
                    }}
                    formRef={formRef}
                    fetcher={fetcher}
                />
                <FilmList films={films} />
                {films.length && canLoadMore ?
                    loadMethod === LoadingMethod.Auto ?
                        <Trigger onTrigger={getNextFilms} />
                        :
                        <button
                            className={styles["load-button"]}
                            type="submit"
                            onClick={getNextFilms}
                        >
                            <PlusIcon />
                            <span>{store.lang.home.actions.load_more}</span>
                        </button>
                    : null
                }
            </div>
        </section>
    );
};

export default observer(HomePage);