import {FC, useEffect, useState, useRef, useContext} from 'react'
import { useTranslation } from '../../../hooks/translator.hook'
import { useResizeHandler } from '../../../hooks/resizehandler.hook'
import { useObserver } from '../../../hooks/observer.hook'
import { IFilm } from "../../../models/IFilm"
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'
import userService from "../../../services/UserService"
import cl from "./home.module.sass"
import ContentModal from '../../ContentModal'
import BSelector from '../../UI/BrickSelector'
import LoaderMini from '../../UI/LoaderMini'
import FilmList from '../../FilmList'
import { compress, decompress } from 'compress-json'

export interface IDLC {
    filtering: string[],
    filtering_type: string,
    datesrt?: string
    psrt?: string
    psrt_t?: string
    action?: string
}

const HomePage: FC = () => {

    const obsElement = useRef() as React.MutableRefObject<HTMLInputElement>
    const contentElement = useRef() as React.MutableRefObject<HTMLDivElement> 
    const listRef = useRef() as React.MutableRefObject<HTMLDivElement>

    const {translate} = useTranslation()

    const [films, setFilms] = useState<IFilm[] | [any]>([])
    const [focused, setFocused] = useState<boolean>(false)
    const [notFound, setNotFound] = useState<boolean>(false)
    const [_searchQuery, _setSearchQuery] = useState<string>('')
	const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem('sq') ? localStorage.getItem('sq')! : '')
	const [page, setPage] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)
	const [canLoad, setCanLoad] = useState<boolean>(true)
    const [paginateMethod, setPaginateMethod] = useState<string | undefined>(undefined)
    const [filteringConfig, setFConfig] = useState<any[] | undefined>(undefined)
    const [dateSrt, setDateSrt] = useState<string | undefined>(undefined)
    const [filteringType, setFType] = useState<string | undefined>(undefined)
    const [psrt, setPSrt] = useState<string | undefined>(undefined)
    const [psrtt, setPSrtT] = useState<string | undefined>(undefined)
    const [visualReady, setVReady] = useState<boolean>(false)
    const [lanceCReady, setLanceCReady] = useState<boolean>(false)
    const [dynamicLanceConfig, setDLC] = useState<IDLC>({filtering: [] as any, filtering_type: 'without'} as IDLC)
    const [debugMode, setDebugMode] = useState<number>(1)
    const [DLCReady, setDLCReady] = useState<boolean>(false)
    const [adaptInterface, setAdaptInterface] = useState<boolean>(false)

    function reset(incSQ:boolean = false, type:number=3): number {
        if(incSQ) writeLanceConfig("sq", "", () => setSearchQuery(""))
        writeLanceConfig("lance_h", JSON.stringify(compress([])), () => setFilms([]))
        setNotFound(false)
        writeLanceConfig("cload", "1", () =>  setCanLoad(true))
        setVReady(false)
        setPage(1)
        fetchPosts(0, type)
        return 0
    }

    const expandPanel = () => {
        listRef.current.style.height = '';
        listRef.current.style.transition = 'none';


        const startHeight = window.getComputedStyle(listRef.current).height;
        
        listRef.current.classList.toggle(cl.Collapsed)
        const height = window.getComputedStyle(listRef.current).height;
        
        listRef.current.style.height = startHeight;
        
        requestAnimationFrame(() => {
            listRef.current.style.transition = '';
            
            requestAnimationFrame(() => {
                listRef.current.style.height = height
            })
        })
    }
    
	const fetchPosts = async (_page: number, arg: number): Promise<void> => {
		setLoading(true)
		try {
            let curr_page
            curr_page = _page
            _setSearchQuery(searchQuery)
            if(arg == 2) curr_page = reset()
			const response = await userService.search(arg == 3 ? "" : `"${searchQuery}"`, 12, curr_page * 12, dynamicLanceConfig)
            
            if(!response.data.can_load) writeLanceConfig("cload", "0", () => setCanLoad(false))
            if(arg == 2 && films.length) {
                writeLanceConfig("lance_h", JSON.stringify(compress([...response.data.films])), () => null)
                return setFilms([...response.data.films])
            }
            if((arg == 3 || arg == 4) && films.length) {
                writeLanceConfig("lance_h", JSON.stringify(compress([...response.data.films])), () => null)
                return setFilms([...response.data.films])
            }
            writeLanceConfig("lance_h", JSON.stringify(compress([...films, ...response.data.films])), () => null)
            setFilms([...films, ...response.data.films])
        
		} catch(e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

    const handleCustomSearchReq = (): void => {
        reset(false, 4)
    }

    const writeLanceConfig = (act_type: string, data: any, cb: (arg: any) => void, custom_cb_arg: any = null): void => {
        try {
            if(act_type === 'filtr_t') {
                switch(data) {
                    case 'solely': 
                        var filtr_c_s:string[] = JSON.parse(localStorage.getItem('filtr_c_s') as string)
                        if(!filtr_c_s.length || !filtr_c_s) {
                            localStorage.setItem("filtr_c_s", JSON.stringify([]))
                            filtr_c_s = []
                        }
                        setFConfig(filtr_c_s)
                        break
                    case 'inclusive':
                        var filtr_c_i:string[] = JSON.parse(localStorage.getItem('filtr_c_i') as string)
                        if(!filtr_c_i.length || !filtr_c_i) {
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

    const prepareLanceConfig = (): void => {
        try {
            const sq:string = localStorage.getItem("sq")!
            if(sq) {
                setSearchQuery(sq)
            } else {
                localStorage.setItem("sq", '')
                setSearchQuery("")
            }

            const cload:number = Number(localStorage.getItem('cload')!)
            if(cload == 0) setCanLoad(false)

            const pmth:string = localStorage.getItem("pg_mthd")!
            if(pmth) { 
                setPaginateMethod(pmth)
            } else {
                localStorage.setItem('pg_mthd', 'auto')
                setPaginateMethod('auto')
            }

            var filtrt:string = localStorage.getItem("filtr_t")!
            if(filtrt) {
                setFType(filtrt)
            } else {
                localStorage.setItem('filtr_t', 'without')
                filtrt = 'without'
                setFType('without')
            }
            
            var filtrc:string = localStorage.getItem('filtr_c')!
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
                    filtrc = localStorage.getItem("filtr_c_s")!
                    if(filtrc) setFConfig(JSON.parse(filtrc))
                    break 
                case "inclusive": 
                    filtrc = localStorage.getItem("filtr_c_i")!
                    if(filtrc) setFConfig(JSON.parse(filtrc))
                    break
            }

            var datesrt:string = localStorage.getItem('datesrt')!
            if(datesrt) {
                setDateSrt(datesrt)
            } else {
                localStorage.setItem('datesrt', 'any')
                datesrt = 'any'
                setDateSrt('any')
            }

            var psrt:string = localStorage.getItem('psrt')!
            if(psrt) {
                setPSrt(psrt)
            } else {
                localStorage.setItem('psrt', 'without')
                psrt = 'without'
                setPSrt('without')
            }

            var psrt_t:string = localStorage.getItem("psrt_t")!
            if(psrt_t) {
                setPSrtT(psrt_t)
            } else {
                localStorage.setItem('psrt_t', 'desc')
                psrt_t = 'desc'
                setPSrtT('desc')
            }

            const debugMode:number = parseInt(localStorage.getItem("debug_m")!)
            if(!Number.isNaN(debugMode)) {
                setDebugMode(debugMode)
            } else {
                localStorage.setItem("debug_m", "1")
                setDebugMode(1)
            }

            var lance_history:IFilm[]
            if(localStorage.getItem("lance_h")) lance_history = decompress(JSON.parse(localStorage.getItem("lance_h")!))
            else lance_history = []
            if(lance_history.length) {
                setFilms(lance_history)
                var math_page = lance_history.length/12
                if(Number(lance_history.length/12) === lance_history.length/12 && lance_history.length/12 % 1 !== 0) math_page = Math.round(math_page)
                setPage(math_page == 0 ? 1 : math_page)
            } else {
                setPage(1)
                fetchPosts(0, 1)
            }

            setFConfig(JSON.parse(filtrc))
            setDLC({filtering: JSON.parse(filtrc), filtering_type: filtrt, datesrt, psrt, psrt_t, action: "init"})
        } catch(e) {
            console.log(e)
            setLanceCReady(true)
        } finally {
            setLanceCReady(true)
            setDLCReady(true)
        }
    }

    useObserver(obsElement, canLoad, [visualReady], loading, () => {
        if(visualReady) {
            setPage(page + 1) 
            fetchPosts(page, 1)
        }
	})

    useResizeHandler((width:number) => {
        if(width <= 1100) !adaptInterface && setAdaptInterface(true)
        if(width > 1100) setAdaptInterface(false)
    })

    useEffect(() => {
        switch(dynamicLanceConfig.action) {
            case 'init': 
                break 
            case 'lch': 
                reset(false, 4)
        }
    }, [dynamicLanceConfig])

    useEffect(() => {
        if(!visualReady && films.length) setVReady(true)
    }, [films])

    useEffect(() => {
        prepareLanceConfig()
    }, [])
    
    return (
        <>
            {
                debugMode == 0
                    &&
                    <div className={cl.SD_container}>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                sq
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {searchQuery === "" ? "null" : searchQuery}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                films
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {films.length}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                page
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {page}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                load
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {loading ? "1" : "0"}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                cl
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {canLoad ? "1" : "0"}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                nf
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {notFound ? "1" : "0"}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                pm
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {paginateMethod}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                ft
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {dynamicLanceConfig.filtering_type}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                fl
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {dynamicLanceConfig.filtering.length}
                            </div>
                        </div>

                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                dsrt
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {dynamicLanceConfig.datesrt}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                psrt_t
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {dynamicLanceConfig.psrt_t}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                psrt
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {dynamicLanceConfig.psrt}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                dlcrd
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {DLCReady ? "1" : "0"}
                            </div>
                        </div>
                        <div className={cl.SD_data}>
                            <div className={cl.SD_dataname}>
                                vrd
                            </div>
                            <div className={cl.SD_separator}>
                            |
                            </div>
                            <div className={cl.SD_datavalue}>
                                {visualReady ? "1" : "0"}
                            </div>
                        </div>
                    </div>
            }
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
                            <button className={cl.Tool} onClick={() => reset(true)}>
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
                                value={searchQuery}
                                onChange={e => writeLanceConfig("sq", e.target.value, (data:string) => setSearchQuery(data))}
                            />
                            <button className={cl.Search_loop} type="submit">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14.6311" cy="11.5653" r="6.79336" transform="rotate(47 14.6311 11.5653)" stroke="#BAB4C2"></circle><path d="M9.48543 16.3638L4.33989 21.1621" stroke="#BAB4C2"></path></svg>
                            </button>
                        </form>
                        <div className={cl.Tool_container}>
                            <button className={cl.Tool} onClick={() => expandPanel()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                                </svg>
                            </button> 
                        </div>
                    </div>
                </div>
                <div className={cl.Section_content}>
                    <div className={`${cl.LanceSettings_modal}`} ref={listRef}>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                        <h1>EDIT HERE</h1>
                    </div>
                    <FilmList notfound={notFound} observerElem={contentElement} films={films} ready={DLCReady && visualReady ? true : false}/>
                    {

                        <div 
                            ref={obsElement} 
                            className={cl.Loader} 
                            style={
                                paginateMethod === 'auto' && DLCReady && !loading && canLoad
                                    ?
                                        {display: "flex"}
                                    : 
                                        {display: "none"}
                            }
                        >
                            <LoaderMini/>
                        </div>
                    }
                    {
                        paginateMethod === 'click'
                            &&
                                canLoad 
                                &&
                                    visualReady
                                    &&
                            <div className={cl.Click_container}>
                                <button className={`button ${cl.Load_more}`} onClick={() => {
                                    console.log(DLCReady)
                                    setPage(page + 1)
                                    if(DLCReady) fetchPosts(page, 1)
                                }}>
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