import {useEffect, useState, useRef, useContext, FC, useCallback} from 'react'
import { IFilm, IFilmComment, IPlayer } from '../../../models/IFilm'
import {useParams} from 'react-router-dom'
import cl from "./film.module.sass"
import UserService from "../../../services/UserService"
import AllowAuth from '../../AllowAuth'
import { useTranslation } from '../../../hooks/translator.hook'
import { observer } from 'mobx-react-lite'
import FCRService, { IRWFC } from '../../../services/FCRService'
import { useResizeHandler } from '../../../hooks/resizehandler.hook'
import { Context } from '../../..'
import LoaderMini from '../../UI/LoaderMini'
import FlagDetector from '../../UI/FlagDetector'
import {Helmet} from "react-helmet"
import FilmService from '../../../services/FilmService'
import TimeVisualizator from '../../TimeVisualizator'
import RatingCounter from '../../UI/RatingCounter'
import AllowNotAuth from '../../AllowNotAuth'

const FilmPage: FC = () => {
    const {store, wsc} = useContext(Context)
    const {translate} = useTranslation()
    const [descTab, setDescTab] = useState<number>(1)
    const [film, setFilm] = useState<IFilm | null>(null)
    const [fAvailablePTabs, setFAvailablePTabs] = useState<any[]>([null])
    const [activePSelector, setActivePSelector] = useState<boolean>(true)
    const [originalPlayerFlag, setOriginalPlayerFlag] = useState<boolean>(false)
    const [mobileOriented, setMobileOriented] = useState<boolean>(false)
    const [rPlayer, setRPlayer] = useState<any>()
    const [isInWatchLater, setIsInWL] = useState<boolean | null>(null)
    const [isWLLoading, setIsWLLoading] = useState<boolean>(false)
    const [adsMode, setAdsMode] = useState<boolean>(false) 
    const [plLoading, setPlLoading] = useState<number | null>(null)
    const [plLStatus, setPlLStatus] = useState<number>(-1)
    const [rewriteErr, setRewriteErr] = useState<boolean>(false)
    const [imdbErr, setImdbErr] = useState<boolean>(false)
    const [pinPSelector, setPPS] = useState<boolean>(false)
    const [comments, setComments] = useState<IFilmComment[]>([])
    const [page, setPage] = useState<number>(0)
    const [offset_add, setOffset_add] = useState<number>(0)
    const [canLoad, setCanLoad] = useState<boolean>(true)
    const [commentsLoading, setCommentsLoading] = useState<boolean>(false)
    const [commentLoading, setCommentLoading] = useState<boolean>(false)
    const [comment, setComment] = useState<string>("")
    const [commentBlank, setCommentBlank] = useState<IFilmComment | null>(null)

    useResizeHandler((w: number) => {
        if(w > 1000) setMobileOriented(false)
        if(w < 1000) setMobileOriented(true)
    })
    
    const {id} = useParams()

    const definePlayerGeo = (purl: string): string => {
        const {hostname} = new URL(purl)
        switch(hostname) {
            case "ashdi.vip":
                return "ukr"
            default: 
                return "ru"
        }
    }

    const reparseFilmConfig = (config: IFilm): IFilm => {
        const deartefacted_plrs: IPlayer[] = config.players.map((pl, i): IPlayer => {
            try {
                const durl:string = FCRService.deartefactUrl(pl as any)
                const geo:string = definePlayerGeo(durl)
                return {
                    url: durl,
                    geo,
                    index: i + 1,
                    ps_index: i + 1
                } as IPlayer
            } catch(e) {
                console.error(e)
                return {
                    url: "",
                    geo: "",
                    index: i + 1,
                    ps_index: i + 1
                } as IPlayer
            }
        })
        return {
            ...config, 
            players: deartefacted_plrs as IPlayer[],
            genres: JSON.parse(config?.genres as any),
            countries: JSON.parse(config?.countries as any)
        } as IFilm
    }

    const initOriginalPlayer = (plConf: any): void => {
        setOriginalPlayerFlag(true)
        setRPlayer({
            content: plConf.url,
            config: plConf
        })
    }

    const rewriteFilmDomByEmbeedUrl = async(plConf: any, forceFAPT?: any[]): Promise<void> => {
        if(originalPlayerFlag) setOriginalPlayerFlag(false)
        const rewrited_cfg = await FCRService.rewriteByHostname(plConf.url, setPlLStatus)
        setPlLStatus(0)
        if(rewrited_cfg.status !== "err") {
            setRPlayer({content: rewrited_cfg.data, config: plConf})
            setRewriteErr(false)
        } else {
            setRPlayer({content: plConf.url, config: plConf})
            setRewriteErr(true)
        }
        setPlLoading(null)
    }

    const checkForPlErrs = async(pls: IPlayer[]): Promise<IPlayer[]> => {
        var results: IPlayer[] = await Promise.all(pls.map(async (pl: IPlayer): Promise<IPlayer> => {
            var pl_rw:IRWFC = await FCRService.rewriteByHostname(pl.url ? pl.url : "https://yoububr.com", () => null)
            return {...pl, err: pl_rw.status == "err" ? true : false}
        }))
        return results
    }

    const fetchComments = async (): Promise<void> => {
        if(!canLoad) return 
        setCommentsLoading(true)
        try {
            if(!id) return undefined
            const response = await FilmService.getComments(Number(id), page * 10 + offset_add, 10)
            if(!response.data.comments.length) {
                setCanLoad(false) 
            } else {
                setComments([...comments, ...response.data.comments])
            }
        } catch(e) {
            setCanLoad(false)
            setComments([])
        } finally {
            setCommentsLoading(false)
        }
    }

    const getFilmData = useCallback(async (): Promise<void> => {
        setPlLStatus(-1)
        const response = await UserService.getById(id, store.getStoredLang())
        if(response.data.imdb_translate?.status === 'err') setImdbErr(true)
        localStorage.setItem('last_seen', String(response.data.id))
        const filmConfig:IFilm = reparseFilmConfig(response.data)
        setFilm(filmConfig)
        const pls_errs = await checkForPlErrs(filmConfig.players)
        setFAvailablePTabs(pls_errs)
        rewriteFilmDomByEmbeedUrl(filmConfig.players[0], filmConfig.players)
        if(filmConfig.watchLater?.includes(String(filmConfig.id))) setIsInWL(true)
        else setIsInWL(false)
        fetchComments()
    }, [id])

    const changeWatchLater = async (): Promise<void> => {
        if(isInWatchLater == null) return  
        try {
            if(isInWatchLater == true) {
                setIsWLLoading(true)
                await UserService.removeWLFilm(film!.id)
                setIsInWL(false)
            } else {
                setIsWLLoading(true)
                await UserService.addWLFilm(film!.id)
                setIsInWL(true)    
            }
        } catch(e) {
            console.log(e) 
        } finally {
            setIsWLLoading(false)
        }
    }

    const changeActivePSelector = (state: boolean): void => {
        if(!mobileOriented && !pinPSelector)
            setActivePSelector(state)
    }

    const preparePlSelect = async (_adsMode: boolean, plConf: any, changeAdsMode: boolean = false): Promise<void> => {
        try {
            setPlLoading(plConf.index)
            if(changeAdsMode) setAdsMode(_adsMode)
            if(_adsMode) {initOriginalPlayer(plConf);setRewriteErr(false)}
            else await rewriteFilmDomByEmbeedUrl(plConf)
        } catch(e) {
            initOriginalPlayer(plConf)
        }
    }

    const addComment = async() => {
        if(comment.replaceAll(" ", "") === "") return undefined
        setCommentLoading(true)
        await FilmService.addComment(Number(id), comment)
        setOffset_add(offset_add + 1)
        setComment("")
        setCommentLoading(false)
    }

    const handleRating = (rating:number): void => {
        if(!film || !store.isAuth) return undefined
        console.log(rating)
        FilmService.pushRating(film?.id, rating)
    }

    useEffect(() => {
        if(page > 0) fetchComments()
    }, [page])

    useEffect(() => {
        if(store.isAuth) {
            wsc.send("film-session-join", {
                fid: id
            })
            wsc.addListener("film-session-event", (e:any) => {
                switch(e.payload.tag) {
                    case "comment": 
                        setCommentBlank(e.payload.comment)
                        break
                }
            })
        }
    }, [store.isAuth])

    useEffect(() => {
        if(commentBlank) {
            setComments([commentBlank, ...comments])
            setOffset_add(offset_add + 1)
            setCommentBlank(null)
        }
    }, [commentBlank, comments])

    useEffect(() => {
        getFilmData()
        window.addEventListener("message", (event: any) => { 
            if(!event) return 
            if(!event.data) return
            if(typeof event.data === 'string')
            if(event.data && event.data.includes('voidboost')) {
                rewriteFilmDomByEmbeedUrl({url: event.data})
            }
        }, false);
    }, [id])

    if(!film || !rPlayer) return <div className={cl.Loader_container}>
        <LoaderMini variant="loading-large"/>
        <div className={cl.Loading_txt}>
            {plLStatus == -1 && translate("film.loading1")}
            {plLStatus == 0 && translate("film.loading2")}
            {plLStatus == 1 && translate("film.loading3")}
            {plLStatus == 2 && translate("film.loading4")}
        </div>
    </div>

    return (
        <div className={cl.FilmPage_container}>
            <Helmet>
                <title>Cimber: {film.name}</title>
                <meta name="viewport" content="width=1000"/>
                <meta http-equiv="X-UA-Compatible" content="chrome=IE8"/>
                <meta property="og:type" content="video.tv_series"/>
                <meta property="og:video:height" content="430"/>
                <meta property="og:video:width" content="600"/>
                <meta property="og:duration" content="2700"/>
                <meta property="og:video:type" content="application/x-shockwave-flash"/>
                <meta property="og:site_name" content="rezka.ag"/>
                <meta property="og:title" content="Ветреный дворец / Ветреное место / Встреча с собой (2023)"/>
                <meta property="og:image" content={film.poster}/>
            </Helmet>
            <div className={cl.Top_inner}>
                <div className={cl.Poster}>
                    {
                        store.lang_ready && store.lang.packet_name == "en" && !imdbErr
                            ?
                            <img className={cl.Poster_imdb} src={film.imdb_translate?.poster}/>
                            :
                            <img src={film.poster}/>
                    }
                </div>
                <div className={cl.Content}>
                    <div className={cl.Header}>
                        <h1>
                        {
                            !imdbErr
                                ?
                                film.imdb_translate?.title
                                :
                                film.name
                            }
                            ({film.year})
                        </h1>
                        <div className={cl.Pager}>
                            <div className={cl.Pager_headers}>
                                <div className={`${cl.Pager_segment} ${cl.Pager_segment1} ${descTab == 1 ? cl.Pager_descTab : cl.Pager_inactive}`}>
                                    <div className={cl.Name} onClick={() => setDescTab(1)}>
                                        <h3>{translate("film.info.header.overwiev")}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={cl.Pager_content}>
                                {
                                    descTab == 1 &&
                                    <div className={cl.Overwiev}>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {translate("film.info.main.release")}: </span>
                                            <span className={cl.Inf_res}> {film.year} </span> 
                                        </div>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {film.countries.length > 1 ? translate("film.info.main.country_.countries") : translate("film.info.main.country_.country")}:  </span>
                                            <span className={cl.Inf_res}> {film.countries.map((country, index) => {
                                                if(index + 1 == film.countries.length) {
                                                    return (
                                                        <span key={country}> {country} </span>
                                                    )
                                                }
                                                return (
                                                    <span key={country}> {country}, </span>
                                                )
                                            })} </span> 
                                        </div>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {film.genres.length > 1 ? translate("film.info.main.genre_.genres") : translate("film.info.main.genre_.genre")}: </span>
                                            <span className={cl.Inf_res}> {film.genres.map((genre, index) => {
                                                if(index + 1 == film.genres.length) {
                                                    return (
                                                        <span key={genre}> {genre} </span>
                                                    )
                                                }
                                                return (
                                                    <span key={genre}> {genre}, </span>
                                                )
                                            })} </span> 
                                        </div>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {translate("film.info.main.duration")}: </span>
                                            <span className={cl.Inf_res}> {film.duration} </span> 
                                        </div>
                                        <div className={`${cl.Inf}`}>
                                            <span className={cl.Inf_row}> {translate("film.info.main.rating")}: </span>
                                            <span className={cl.Inf_res}> {film.rating_average !== null ? film.rating_average : translate("film.info.main.nratings")} </span> 
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={cl.Btns}>
                            <AllowAuth>
                                <button className={`${cl.Add_wread} ${isWLLoading ? cl.Loading : ""}`} onClick={() => changeWatchLater()}>
                                    {
                                        isWLLoading 
                                            ?
                                            <LoaderMini/>
                                            :
                                            isInWatchLater 
                                                ? 
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox='0 0 1793 1792'><path d="M1420 128q23 0 44 9 33 13 52.5 41t19.5 62v1289q0 34-19.5 62t-52.5 41q-19 8-44 8-48 0-83-32l-441-424-441 424q-36 33-83 33-23 0-44-9-33-13-52.5-41t-19.5-62V240q0-34 19.5-62t52.5-41q21-9 44-9h1048z"/></svg>
                                                        <span>{translate("film.actions.watch_later_svd")}</span>
                                                    </>
                                                :
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox='0 0 1793 1792'><path d="M1408 256H384v1242l423-406 89-85 89 85 423 406V256zm12-128q23 0 44 9 33 13 52.5 41t19.5 62v1289q0 34-19.5 62t-52.5 41q-19 8-44 8-48 0-83-32l-441-424-441 424q-36 33-83 33-23 0-44-9-33-13-52.5-41t-19.5-62V240q0-34 19.5-62t52.5-41q21-9 44-9h1048z"/>
                                                        </svg>
                                                        <span>{translate("film.actions.watch_later")}</span>
                                                    </>
                                    }
                                </button>
                            </AllowAuth>
                        </div>
                    </div>
                </div>
                {
                    store.lang_ready && film.imdb_translate?.status === "ok" &&
                        <div className={cl.Msg}>
                            <button className={cl.Msg_btn}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" onClick={() => store.callLogModal({code: "imdb_trns_att", alt: "Attention: The translation of the movie data was made using the imdb search, and this does not guarantee a 100% correct translation for this movie", status: 1, duration: 10000})}>
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </button>
                        </div> 
                }
            </div>
            
            
            <div className={cl.Bottom_inner}>
                <div className={cl.Description}>
                    {
                        !imdbErr
                            ?
                            film.imdb_translate?.description
                            :
                            film.description.replace("© ГидОнлайн", "")
                    }
                </div>
                <div className={cl.Frame_container} id="frame">
                    <div className={`${cl.PlayerTabs_container} ${activePSelector && cl.Active}`}>
                        <div className={`${cl.Tabs_inner} ${cl.Pl_section}`}>
                            {
                                fAvailablePTabs.map((pl, i) => {
                                    return (
                                        <button key={pl.index} className={`${cl.Tab} ${i === 0 && cl.First} ${pl.index == rPlayer.config.index && cl.Active} ${cl.Pl_tab}`} onClick={() => preparePlSelect(adsMode, pl)}>
                                            {
                                                plLoading == pl.index
                                                    ?
                                                    <LoaderMini/>
                                                    :
                                                    <span className={cl.Tab_content}>
                                                        <span className={cl.Pl_geo}>
                                                            <FlagDetector lang={pl.geo} variant="1"/>
                                                        </span>
                                                        <span className={cl.Pl_title}>
                                                            {translate("film.player.tab.player")} {pl.ps_index}
                                                        </span>
                                                        <span className={cl.Pl_info}>
                                                            {
                                                                pl.err && 
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className={cl.Err_inf} viewBox="0 0 16 16">
                                                                        <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
                                                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                                                    </svg>
                                                            }
                                                        </span>
                                                    </span>  
                                            }
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className={cl.Tabs_inner}>
                            <a className={cl.Tab} href="https://t.me/cimber_bot" target="_blank">
                                <span className={cl.Tab_content}>
                                    {translate("film.player.tab.opts.question")}
                                </span>
                            </a>
                            <a className={cl.Tab} href="https://t.me/cimber_bot" target="_blank">
                                <span className={cl.Tab_content}>
                                    {translate("film.player.tab.opts.issue")}
                                </span>
                            </a>
                        </div>
                    </div>
                    {plLoading &&
                        <div className={cl.PlLoading_container}>
                                {
                                    adsMode
                                        ? 
                                            "Loading..."
                                        :
                                            <>
                                                {plLStatus == 0 && "Preparing a player hyperlink for a request..."}
                                                {plLStatus == 1 && "Sending a request for player configuration to the server..."}
                                                {plLStatus == 2 && "Editing the player configuration to exclude advertising pre-rolls..."}
                                            </>
                                }
                        </div>}
                    {
                        rewriteErr
                            ?
                            !plLoading 
                                &&
                                <div className={cl.RewriteErr_container}>
                                    <svg className={cl.RE_img} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fillRule="nonzero"/></svg>
                                    <span className={cl.RE_text}>An unexpected error has occurred</span>
                                </div>
                            :
                            originalPlayerFlag 
                                ?
                                <iframe 
                                    style={{display: `${plLoading ? "none": "block"}`}}
                                    className={`${cl.Frame} ${!activePSelector && !mobileOriented && cl.Active}`} 
                                    src={rPlayer.content} 
                                    onMouseEnter={() => changeActivePSelector(false)} 
                                    onMouseLeave={() => changeActivePSelector(true)}
                                    onLoad={() => plLoading && setPlLoading(null)}
                                    allowFullScreen
                                />
                                :
                                <iframe 
                                    style={{display: `${plLoading ? "none": "block"}`}}
                                    className={`${cl.Frame} ${!activePSelector && !mobileOriented && cl.Active}`} 
                                    srcDoc={rPlayer.content} 
                                    onMouseEnter={() => changeActivePSelector(false)} 
                                    onMouseLeave={() => changeActivePSelector(true)}
                                    onLoad={() => plLoading && setPlLoading(null)}
                                    allowFullScreen
                                />
                    }
                    <div className={`${cl.Controlls_container} ${activePSelector && cl.Active}`}>
                        <div onClick={() => setPPS(!pinPSelector)} className={`${cl.Controller} ${cl.Pin} ${pinPSelector ? cl.Active : cl.Inactive}`}>
                            <svg className={pinPSelector ? cl.Active : cl.Inactive} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
                            </svg>
                        </div>
                        
                        <div onClick={() => preparePlSelect(!adsMode, rPlayer.config, true)} className={`${cl.Controller} ${adsMode && cl.Active}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M11.35 8.337c0-.699-.42-1.138-1.001-1.138-.584 0-.954.444-.954 1.239v.453c0 .8.374 1.248.972 1.248.588 0 .984-.44.984-1.2v-.602zm-5.413.237-.734-2.426H5.15l-.734 2.426h1.52z"/>
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm6.209 6.32c0-1.28.694-2.044 1.753-2.044.655 0 1.156.294 1.336.769h.053v-2.36h1.16V11h-1.138v-.747h-.057c-.145.474-.69.804-1.367.804-1.055 0-1.74-.764-1.74-2.043v-.695zm-4.04 1.138L3.7 11H2.5l2.013-5.999H5.9L7.905 11H6.644l-.47-1.542H4.17z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <AllowAuth>
                <div className={cl.Rating_container}>
                    <span className={cl.Txt}>Rate the film / series:</span>
                    <RatingCounter handler={handleRating} force_rating={film.rated_value ? film.rated_value : undefined}/>
                </div>
            </AllowAuth>
            <AllowNotAuth>
                <a className={`${cl.Rating_container} ${cl.NotAuth}`} href="/login">
                    <span className={cl.Txt}>{translate("film.actions.rate")}:</span>
                    <div className={cl.NonPointerEvents}>
                        <RatingCounter handler={(rate:number) => handleRating(rate)} force_rating={film.rated_value }/>
                    </div>
                </a>
            </AllowNotAuth>
            <div className={cl.Comments_container}>
                <div className={cl.Comments_input}>
                    <AllowAuth>
                        <form className={`${cl.Comments_form} ${commentLoading ? cl.Loading : ""}`} method='PUT' onSubmit={e => {
                            e.preventDefault()
                            addComment()
                        }}>
                            <input className={cl.Comments_inp} value={comment} onChange={e => setComment(e.target.value)} placeholder={translate("film.comments.placeholder.ec")}/>
                            <button className={cl.Comments_submit}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                </svg>
                            </button>
                            <span className={cl.Loader}>
                                <LoaderMini/>
                            </span>
                        </form>
                    </AllowAuth>
                </div>
                <div className={cl.Comments_content}>
                    {
                        comments.length
                            ?
                            comments.map((comment:IFilmComment, i) => {
                                return <div className={cl.Comment} key={i}>
                                    <div className={cl.Comment_owner}>
                                        <div className={cl.Owner_promo}>
                                            <a href={`/profile/${comment.user.id}/preview`}>
                                                <img className={cl.Owner_avatar} src={comment.user.avatar}/>
                                            </a>
                                            <span className={cl.Owner_username}>
                                                {comment.user.username}
                                            </span>
                                            <div className={cl.Owner_rating}>
                                                    {
                                                        film.rating!.find((el:any) => el.owner === comment.user.id)
                                                            && 
                                                            <>
                                                                <span>{film.rating!.find((el:any) => el.owner === comment.user.id).value}</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className={cl.Ic} viewBox="0 0 16 16">
                                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                                </svg>
                                                            </>
                                                    }
                                            </div>
                                        </div>
                                        <div className={cl.Comment_time}>
                                            <TimeVisualizator time={comment.datef_ms}/>
                                        </div>
                                    </div>
                                    <div className={cl.Comment_body}>
                                        {comment.data}
                                    </div>
                                </div>
                            })
                            :
                            <div className={cl.NoComments_container}>
                                {
                                    commentsLoading
                                        ?
                                        <>
                                            <LoaderMini/>
                                            <span>{translate("film.comments.pw")}</span>
                                        </>
                                        :
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={cl.NC_ic}><linearGradient id="gradient"><stop className="main-stop" offset="0%"></stop><stop className="alt-stop" offset="100%"></stop></linearGradient><path fill="url(#gradient)" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"></path></svg>
                                            <span>{translate("film.comments.nc")}</span>
                                        </>
                                }
                            </div>
                    }
                </div>
            </div>
            <div className={cl.Pagination_container}>
                {
                    canLoad
                        &&
                        <button className={`${cl.Add_wread} ${commentsLoading ? cl.Loading : ""}`} onClick={() => setPage(page + 1)}>
                            {
                                commentsLoading
                                    ?
                                    <LoaderMini/>
                                    :
                                    translate("film.comments.lm")
                            }
                        </button>
                }
            </div>
        </div>
    )
}

export default observer(FilmPage)