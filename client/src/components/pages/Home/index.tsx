import {FC, useEffect, useState, useRef, useContext, HTMLInputTypeAttribute } from 'react'
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
import LoaderMini from '../../UI/LoaderMini'
import FilmList from '../../FilmList'

export interface IDLC {
    filtering: string[],
    filtering_type: string,
    datesrt?: string
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
    const [dateSrt, setDateSrt] = useState<string | undefined>(undefined)
    const [filteringType, setFType] = useState<string | undefined>(undefined)
    const [lanceCReady, setLanceCReady] = useState<boolean>(false)
    const [dynamicLanceConfig, setDLC] = useState<IDLC>({filtering: [] as any, filtering_type: 'without'} as IDLC)
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

    const writeLanceConfig = (act_type: string, data: any, cb: (arg: any) => void, custom_cb_arg: any = null) => {
        try {
            if(act_type === 'filtr_t') {
                switch(data) {
                    case 'solely': 
                        var filtr_c_s = JSON.parse(localStorage.getItem('filtr_c_s') as string)
                        if(!filtr_c_s) {
                            localStorage.setItem("filtr_c_s", JSON.stringify([]))
                            filtr_c_s = []
                        }
                        setFConfig(filtr_c_s)
                        break
                    case 'inclusive':
                        var filtr_c_i = JSON.parse(localStorage.getItem('filtr_c_i') as string)
                        if(!filtr_c_i) {
                            localStorage.setItem("filtr_c_i", JSON.stringify([]))
                            filtr_c_i = []
                        }
                        setFConfig(filtr_c_i)
                        break
                }
            }
            if(custom_cb_arg) cb(custom_cb_arg)
            else cb(data)
            localStorage.setItem(act_type, data)
        } catch(e) { 
            console.log(e)
        }
    }

    const prepareLanceConfig = () => {
        try {
            //Pagination method
            const pmth = localStorage.getItem("pg_mthd")
            if(pmth) { 
                setPaginateMethod(pmth)
            } else {
                localStorage.setItem('pg_mthd', 'auto')
                setPaginateMethod('auto')
            }

            //FType 
            var filtrt = localStorage.getItem("filtr_t")
            if(filtrt) {
                setFType(filtrt)
            } else {
                localStorage.setItem('filtr_t', 'without')
                filtrt = 'without'
                setFType('without')
            }
            
            //Filtering
            var filtrc = localStorage.getItem('filtr_c')
            if(filtrc) { 
                setFConfig(JSON.parse(filtrc))
            } else {
                localStorage.setItem('filtr_c', JSON.stringify([]))
                filtrc = [] as any
                setFConfig([])
            }

            switch(filtrt) {
                case "without": 
                    filtrc = "[]"
                    setFConfig([])
                    break
                case "solely":
                    filtrc = localStorage.getItem("filtr_c_s")
                    if(filtrc) setFConfig(JSON.parse(filtrc))
                    break 
                case "inclusive": 
                    filtrc = localStorage.getItem("filtr_c_i")
                    if(filtrc) setFConfig(JSON.parse(filtrc))
                    break
            }

            //Date sorting 
            var datesrt = localStorage.getItem('datesrt')
            if(datesrt) {
                setDateSrt(datesrt)
            } else {
                localStorage.setItem('datesrt', 'any')
                datesrt = 'any'
                setDateSrt('any')
            }

            setFConfig(JSON.parse(filtrc as string))
            setDLC({filtering: JSON.parse(filtrc as string) as string[], filtering_type: filtrt as string, datesrt})
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
            const t = await userService.search(qConfig[i].query.toLowerCase(), limit, i * limit, dynamicLanceConfig)
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
        console.log(filteringConfig)
    }, [filteringConfig])

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
                                    console.log(value[0].value)
                                    if(value[0].value !== undefined) writeLanceConfig("pg_mthd", value[0].value, setPaginateMethod)
                                }}
                            >
                                Метод подгрузки:
                            </BSelector>
                        </div>
                        <div className={cl.Pagination_mtd}>
                            <BSelector 
                                selectors_required={28} 
                                disabled={dynamicLanceConfig.filtering_type === 'without' ? true : false}
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
                                        {content: "Мультфильм", value: "мультфильм"}, 
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
                                        {content: "Мюзикл", value: "мюзикл"},
                                        {content: "Детектив", value: "детектив"},
                                        {content: "Фантастика", value: "фантастика"},
                                        {content: "Катастрофа", value: "катастрофа"},
                                        {content: "Музыка", value: "музыка"},
                                        {content: "Научная фантастика", value: "музыка"}
                                    ]
                                } 
                                action_c={(value: any) => {
                                    console.log(value)
                                    if(value !== undefined && value !== null && value.length) writeLanceConfig(dynamicLanceConfig.filtering_type === 'solely' ? "filtr_c_s" : "filtr_c_i", JSON.stringify(value), (data: any) => {
                                        setDLC({...dynamicLanceConfig, filtering: data})
                                        
                                    }, value)
                                }}
                                restoreConfig={filteringConfig}
                            >
                                Filtration:
                            </BSelector>
                        </div>
                        <div className={cl.Pagination_mtd}>
                            <BSelector 
                                selectors_required={1} 
                                variant='input'
                                default={dynamicLanceConfig.datesrt === 'any' ? 1 : 0}
                                actions={
                                    [
                                        {content: 'Halo', value: 'vale', variant: 'input', default_val: dateSrt !== 'any' ? dateSrt : localStorage.getItem('_datesrt') as string, handler: (e: string) => writeLanceConfig('datesrt', e, (data: string) => {setDLC({...dynamicLanceConfig, datesrt: data})})},
                                        {content: 'Неограничено', value: 'un', handler: (e: string) => writeLanceConfig('datesrt', e, (data: string) => {dynamicLanceConfig.datesrt && localStorage.setItem("_datesrt", dynamicLanceConfig.datesrt); setDLC({...dynamicLanceConfig, datesrt: data})})}
                                    ]
                                }
                                action_c={() => {
                                }}
                            >
                                test
                            </BSelector>
                        </div>
                        <div className={cl.Pagination_mtd}>
                            <BSelector 
                                default={filteringType === 'solely' ? 0 : filteringType == 'without' ? 2 : 1}
                                selectors_required={1} 
                                actions={
                                    [
                                        {content: "Исключительно", value: "solely"},
                                        {content: "Включительно", value: "inclusive"},
                                        {content: "Без фильтрации", value: "without"}
                                    ]
                                } 
                                action_c={(value: any) => {
                                    if(value !== undefined && value !== null && value.length) writeLanceConfig("filtr_t", value[0].value, (data: any) => {
                                        var filtering = []
                                        if(data !== 'without') filtering = JSON.parse(localStorage.getItem(data === 'solely' ? 'filtr_c_s' : 'filtr_c_i') as string)
                                        if(!filtering) filtering = []
                                        setDLC({...dynamicLanceConfig, filtering_type: data, filtering})
                                    })
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
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
                    <FilmList notfound={false} observerElem={contentElement} films={films}/>
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