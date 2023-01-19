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
    const [paginateMethod, setPaginateMetod] = useState<string>('click')
    const [adaptInterface, setAdaptInterface] = useState<boolean>(false)

    const {store} = useContext(Context)

    function reset() {
        setNotFound(false)
        setCanLoad(true)
        setPage(0)
        return 0
    }
    
	const fetchPosts = async (limit: number, _page: number, arg: number) => {
        //arg = 1: called from observer hook 
        //arg = 2: called from page
        console.log(page)
		setLoading(true)
		try {
            let curr_page
            curr_page = _page

            //Resetting tates
            _setSearchQuery(searchQuery)
            if(arg == 2) curr_page = reset()
            
			const response = await userService.search(searchQuery, limit, curr_page * limit)

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
                //If function called by user search - se
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

    const resetSearchQueue = async () => {
        reset()
        setFilms([])
        setSearchQuery("")
        restoreSearchQueue([{page: 0, query: ""}])
        store.setDefaultQueueConfig({page: 0, query: ""})
    }

    const restoreSearchQueue = async (qConfig: any) => {
        console.log(qConfig)
        const returns = [] as any
        for(let i = 0; i < qConfig.length; i++) {
            const t = await userService.search(qConfig[i].query, limit, i * limit)
            t.data.map(film => {
                returns.push(film)
            })
            if(i === qConfig.length - 1) {
                setSearchQuery(qConfig[i].query)
            }
        }
        setFilms([...returns] as any)
        setTimeout(() => {
            contentElement.current.scrollIntoView({behavior: 'auto', block: 'center'})
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
            if(page === q.length -1) return console.log('from restore')
            console.log(q.length)
            console.log(page)
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
        }
    }, [])
    
    return (
        <section className={cl.Home_section}>
            <h1 style={{position: 'fixed'}}>{page}</h1>
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
                        {
                            adaptInterface 
                            ? 
                            <Dropdown default={1} childs={[{content: translate("home.actions.dropdown.onclick"), value: "click"}, {content: translate("home.actions.dropdown.auto"), value: "auto"}]} callback={e => setPaginateMetod(e)}>
                                {translate("home.actions.dropdown.placeholder")}: 
                            </Dropdown>
                            :
                            <button className={cl.Tool} onClick={() => resetSearchQueue()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                            </button> 
                        }
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
                        {
                            adaptInterface 
                            ? 
                            <button className={cl.Tool} onClick={() => resetSearchQueue()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                            </button> 
                            :
                            <Dropdown default={1} childs={[{content: translate("home.actions.dropdown.onclick"), value: "click"}, {content: translate("home.actions.dropdown.auto"), value: "auto"}]} callback={e => setPaginateMetod(e)}>
                                {translate("home.actions.dropdown.placeholder")}: 
                            </Dropdown>
                        }
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
                    <div ref={obsElement} className={cl.Loader} style={paginateMethod === 'auto' ? loading ?  {display: "none"} : canLoad ? {display: "flex"} : {display: "none"} : {display: 'none'}}>
                        <div className={cl.Loader_container}>
                            <div className={cl.line}>
                                <div className={cl.inner}></div>
                            </div>
                        </div>
                    </div>
                }
                {
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
    )
}

export default observer(HomePage)
