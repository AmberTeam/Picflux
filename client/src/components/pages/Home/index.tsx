import {FC, useEffect, useState, useRef, useContext } from 'react'
import { useTranslation } from '../../../hooks/translator.hook'
import { useResizeHandler } from '../../../hooks/resizehandler.hook'
import { useObserver } from '../../../hooks/observer.hook'
import { IFilm } from "../../../models/IFilm"
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'
import userService from "../../../services/UserService"
import Film from './Film/'
import Dropdown from '../../UI/Dropdown'
import cl from "./home.module.sass"
import { ISQueue } from '../../../models/ISQueue'
import ContentModal from '../../ContentModal'
import BSelector from '../../UI/BrickSelector'

export interface IDLC {
    filtering: string[],
    filtering_type: string
}

const HomePage: FC = () => {

    const obsElement = useRef() as React.MutableRefObject<HTMLInputElement>
    const contentElement = useRef() as React.MutableRefObject<HTMLDivElement> 

    const {translate} = useTranslation()

    const [films, setFilms] = useState<IFilm[] | [any]>([])

    const [focused, setFocused] = useState<boolean>(false)

    const [notFound, setNotFound] = useState<boolean>(false)
    const [_searchQuery, _setSearchQuery] = useState<string>('')
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [page, setPage] = useState<number>(0)
	const [limit, setLimit] = useState<number>(12)
	const [loading, setLoading] = useState<boolean>(false)
	const [canLoad, setCanLoad] = useState<boolean>(true)
    const [paginateMethod, setPaginateMethod] = useState<string | undefined>(undefined)
    const [filteringConfig, setFConfig] = useState<any[] | undefined>(undefined)
    const [filteringType, setFType] = useState<string | undefined>(undefined)
    const [lanceCReady, setLanceCReady] = useState<boolean>(false)
    const [dynamicLanceConfig, setDLC] = useState<IDLC>({} as IDLC)
    const [adaptInterface, setAdaptInterface] = useState<boolean>(false)
    const [lanceSettingsModalActive, setLanceSettingsModalActive] = useState<boolean>(false)

    const {store} = useContext(Context)

    function reset() {
        setNotFound(false)
        setCanLoad(true)
        setPage(0)
        return 0
    }
    
	const fetchPosts = async (limit: number, _page: number, arg: number) => {
        console.log(dynamicLanceConfig)
		setLoading(true)
		try {
            let curr_page
            curr_page = _page
            _setSearchQuery(searchQuery)
            if(arg == 2) curr_page = reset()
            
			const response = await userService.search(searchQuery.toLowerCase(), limit, curr_page * limit, dynamicLanceConfig)

			if(!response.data.length) {
                if(arg==2) {
                    setFilms([])
                    if(page == 0) {
                        setNotFound(true)
                        setCanLoad(false)
                    }
                }
                if(page != 0) {
                    setCanLoad(false)
                }
			} else {
                if(arg == 2 && films.length) return setFilms([...response.data])
				setFilms([...films, ...response.data])
			}
		} catch(e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

    const handleCustomSearchReq = () => {
        if(searchQuery == _searchQuery) return
        fetchPosts(limit, page, 2)
        store.setDefaultQueueConfig({page: 0, query: searchQuery})
    }

    const prepareLanceConfig = () => {
        try {
            //Pagination method
            const pmth = localStorage.getItem("pg_mthd")
            if(pmth) setPaginateMethod(pmth)
            else setPaginateMethod('click')

            //Filtering
            const filtrc = localStorage.getItem("filtr_c")
            if(filtrc) {
                setFConfig(JSON.parse(filtrc))
            } else {
                setFConfig([])
            }

            //FType 
            const filtrt = localStorage.getItem("filtr_t")
            if(filtrt) {
                setFType(filtrt)
            } else {
                setFType('inclusive')
            }
            
            setDLC({filtering: JSON.parse(filtrc as string) as string[], filtering_type: filtrt as string})
        } catch(e) {
            setLanceCReady(true)
        } finally {
            setLanceCReady(true)
        }
    }

    const resetSearchQueue = async () => {
        reset()
        setFilms([])
        setSearchQuery("")
        restoreSearchQueue([{page: 0, query: ""}])
        store.setDefaultQueueConfig({page: 0, query: ""})
    }

    const restoreSearchQueue = async (qConfig: any) => {
        const returns = [] as any
        for(let i = 0; i < qConfig.length; i++) {
            const t = await userService.search(qConfig[i].query, limit, i * limit, dynamicLanceConfig)
            if(!t.data.length) setCanLoad(false)
            t.data.map(film => {
                returns.push(film)
            })
            if(i === qConfig.length - 1) {
                setSearchQuery(qConfig[i].query)
            }
        }
        setFilms([...returns] as any)
        setTimeout(() => {
            if(contentElement && contentElement.current) contentElement.current.scrollIntoView({behavior: 'auto', block: 'center'})
        }, 0)
    }

    useObserver(obsElement, canLoad, loading, () => {
		setPage(page + 1)
	})

    useResizeHandler((width) => {
        if(width <= 1100) !adaptInterface && setAdaptInterface(true)
        if(width > 1100) setAdaptInterface(false)
    })

    useEffect(() => {
        if(page !== 0) {
            const q = store.checkSearchQueue()
            if(q && page === q.length -1) return
            fetchPosts(limit, page, 1)
            store.setSearchQueuePage({page, query: searchQuery})
        } else {
            restoreSearchQueue({page: 0, query: ""})
        }
    }, [page])

    useEffect(() => {
        const searchQueue = store.checkSearchQueue()
        if(searchQueue) {
            restoreSearchQueue(searchQueue)
            setPage(searchQueue.length -1)
        } else {
            setPage(0)
            fetchPosts(limit, 0, 2)
        }
    }, [dynamicLanceConfig])

    useEffect(() => {
        prepareLanceConfig()
    }, [])
    
    return (
        <>
            <ContentModal title="Parse settings" active={lanceSettingsModalActive} exec={() => setLanceSettingsModalActive(false)}>
                {
                    lanceCReady && filteringConfig &&
                    <>
                        <div className={cl.Pagination_mtd}>
                            <BSelector
                                default={paginateMethod && paginateMethod == 'click' ? 0 : 1}
                                selectors_required={1} 
                                actions={
                                    [
                                        {content: "По нажатию", value: "click"},
                                        {content: "Автоматически", value: "auto"}
                                    ]
                                } 
                                action_c={(value: any) => {
                                    if(value[0].value == undefined) return 
                                    setPaginateMethod(value[0].value)
                                    localStorage.setItem("pg_mthd", value[0].value)
                                }}
                            >
                                Метод подгрузки:
                            </BSelector>
                        </div>
                        <div className={cl.Pagination_mtd}>
                            <BSelector 
                                selectors_required={23} 
                                actions={
                                    [
                                        {content: "Ужасы", value: "ужасы"}, 
                                        {content: "Драма", value: "драма"}, 
                                        {content: "Комедия", value: "комедия"}, 
                                        {content: "Триллер", value: "триллер"}, 
                                        {content: "Криминал", value: "криминал"}, 
                                        {content: "Боевик", value: "боевик"}, 
                                        {content: "Фэнтези", value: "фэнтези"}, 
                                        {content: "Наука", value: "наука"}, 
                                        {content: "Мультфильмы", value: "мультфильмы"}, 
                                        {content: "Биография", value: "биография"}, 
                                        {content: "Спорт", value: "спорт"}, 
                                        {content: "Семейный", value: "семейный"}, 
                                        {content: "Сериал", value: "сериал"}, 
                                        {content: "Короткометражка", value: "короткометражка"}, 
                                        {content: "Артхаус", value: "артхаус"}, 
                                        {content: "Новогодний", value: "новогодний"}, 
                                        {content: "Приключения", value: "приключения"},
                                        {content: "Мелодрама", value: "мелодрама"},
                                        {content: "Вестерн", value: "вестерн"},
                                        {content: "Военный", value: "военный"},
                                        {content: "Документальный", value: "документальный"}, 
                                        {content: "История", value: "история"},
                                        {content: "Аниме", value: "аниме"},
                                        {content: "Мюзикл", value: "мюзикл"}
                                    ]
                                } 
                                action_c={(value: any) => {
                                    if(value == undefined || value == null || !value.length) return 
                                    localStorage.setItem("filtr_c", JSON.stringify(value))
                                }}
                                restoreConfig={[...filteringConfig]}
                            >
                                Filtration:
                            </BSelector>
                        </div>
                        <div className={cl.Pagination_mtd}>
                            <BSelector 
                                default={filteringType === 'solely' ? 0 : 1}
                                selectors_required={1} 
                                actions={
                                    [
                                        {content: "Исключительно", value: "solely"},
                                        {content: "Включительно", value: "inclusive"}
                                    ]
                                } 
                                action_c={(value: any) => {
                                    if(value == undefined || value == null || !value.length) return 
                                    localStorage.setItem("filtr_t", value[0].value)
                                }}
                            >
                                Тип фильтрации:
                            </BSelector>
                        </div>
                    </>
                }
            </ContentModal>
            <section className={cl.Home_section}>
                <div className={cl.Section_starter}>
                    <h1>
                        {translate("home.title.big.fst")} <span className="a_col">{translate("home.title.big.sec")}</span> {translate("home.title.big.thrd")}
                    </h1>
                    <p> 
                        {translate("home.title.small")}
                    </p>
                </div>
                <div className={cl.Search_section}>
                    <div className={cl.Search_field}>
                        <div className={`${cl.Tool_container} ${cl.Search_ints}`}>
                            <button className={cl.Tool} onClick={() => resetSearchQueue()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                </svg>
                            </button> 
                        </div>
                        <form className={`${focused ? cl.Focused : ""} ${cl.Search_input}`} onSubmit={e => {
                            e.preventDefault()
                            handleCustomSearchReq()
                        }}>
                            <input 
                                id="search"
                                placeholder={translate("g.UI.input.g.search")}
                                onFocus={() => setFocused(focused ? false : true)}
                                onBlur={() => {
                                    setFocused(false)
                                }}
                                defaultValue={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <button className={cl.Search_loop} onClick={() => handleCustomSearchReq()} type="submit">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14.6311" cy="11.5653" r="6.79336" transform="rotate(47 14.6311 11.5653)" stroke="#BAB4C2"></circle><path d="M9.48543 16.3638L4.33989 21.1621" stroke="#BAB4C2"></path></svg>
                            </button>
                        </form>
                        <div className={cl.Tool_container}>
                            <button className={cl.Tool} onClick={() => setLanceSettingsModalActive(lanceSettingsModalActive ? false : true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                </svg>
                            </button> 
                        </div>
                    </div>
                </div>
                <div className={cl.Section_content}>
                    <div className={`${cl.Content_content} ${notFound == true ? cl.Not_Found : ""}`}>
                        {
                            films.length ? films.map((film: IFilm) => {
                                const last_seen = localStorage.getItem('last_seen')
                                if(film.id == Number(last_seen)) return (
                                    <span style={{position: 'relative', display: 'flex'}} key={film.id}>
                                        <Film key={film.id} {...film}/>
                                        <div ref={contentElement} className={cl.Dropper}></div>
                                    </span>
                                )
                                return (
                                    <Film key={film.id} {...film}/>
                                )
                            }
                            )
                            :
                            <>
                                <div className={cl.NotFound}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <linearGradient id="gradient">
                                            <stop className="main-stop" offset="0%" />
                                            <stop className="alt-stop" offset="100%" />
                                        </linearGradient>
                                        <path fill="url(#gradient)" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"/>
                                    </svg>
                                </div>
                                <p> {translate("home.throws.not_found")} </p>
                            </>
                        }
                    </div>
                    {
                        <div 
                            ref={obsElement} 
                            className={cl.Loader} 
                            style={
                                paginateMethod === 'auto' 
                                    ?
                                        loading 
                                            ?  
                                                {display: "none"} 
                                            : 
                                                canLoad 
                                                    ?
                                                        {display: "flex"} 
                                                    : 
                                                        {display: "none"} 
                                    : 
                                        {display: 'none'}
                            }
                        >
                            <div className={cl.Loader_container}>
                                <div className={cl.line}>
                                    <div className={cl.inner}></div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        paginateMethod === 'click'
                            &&
                                canLoad 
                                &&
                            <div className={cl.Click_container}>
                                <button className={`button ${cl.Load_more}`} onClick={() => setPage(page + 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                    <span>
                                        {translate("home.actions.load_more")}
                                    </span>
                                </button>
                            </div>
                    }
                </div>
            </section> 
        </>
    )
}

export default observer(HomePage)
