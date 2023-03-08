import {useEffect, useState, useRef, useContext, FC} from 'react'
import { IFilm, IPlayer } from '../../../models/IFilm'
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
import { toJS } from 'mobx'

const FilmPage: FC = () => {
    const {store} = useContext(Context)
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
    const [plLStatus, setPlLStatus] = useState<number>(0)
    const [rewriteErr, setRewriteErr] = useState<boolean>(false)
    const [imdbErr, setImdbErr] = useState<boolean>(false)

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

    const getFilmData = async (): Promise<void> => {
        const response = await UserService.getById(id, store.getStoredLang())
        if(response.data.imdb_translate_status == 'err') setImdbErr(true)
        localStorage.setItem('last_seen', String(response.data.id))
        const filmConfig:IFilm = reparseFilmConfig(response.data)
        setFilm(filmConfig)
        const pls_errs = await checkForPlErrs(filmConfig.players)
        setFAvailablePTabs(pls_errs)
        rewriteFilmDomByEmbeedUrl(filmConfig.players[0], filmConfig.players)
        if(filmConfig.watchLater?.includes(String(filmConfig.id))) setIsInWL(true)
        else setIsInWL(false)
    }

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
        if(!mobileOriented)
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

    useEffect(() => {
        store.callLogModal({code: "ad_ts_wrn", status: 1, alt: "test", duration: 2000})
    }, [])

    useEffect(() => {
        getFilmData()
        window.addEventListener("message", (event: any) => { 
            if(!event) return 
            if(!event.data) return
            if(typeof event.data === 'string')
            if(event.data && event.data.includes('voidboost')) {
                rewriteFilmDomByEmbeedUrl(event.data)
            }
        }, false);
    }, [id])

    if(!film || !rPlayer) return <div className={cl.Loader_container}>
        <LoaderMini variant="loading-large"/>
        <div className={cl.Loading_txt}>
            {plLStatus == 0 && "Preparing a player hyperlink for a request..."}
            {plLStatus == 1 && "Sending a request for player configuration to the server..."}
            {plLStatus == 2 && "Editing the player configuration to exclude advertising pre-rolls..."}
        </div>
    </div>

    return (
        <div className={cl.FilmPage_container}>
            <Helmet>
                <title>Смотреть на Cimber: {film.name}</title>
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
                            <img className={cl.Poster_imdb} src={film.imdb_cfg?.poster}/>
                            :
                            <img src={film.poster}/>
                    }
                </div>
                <div className={cl.Content}>
                    <div className={cl.Header}>
                        <h1>
                        {
                            store.lang_ready && store.lang.packet_name == "en" && !imdbErr
                                ?
                                film.imdb_cfg?.name
                                :
                                film.name
                            }
                            ({film.year})
                        </h1>
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
                            <a href="#frame" className={cl.Watch}>
                               {translate("film.actions.watch")}
                            </a>
                        </div>
                        <div className={cl.Pager}>
                            <div className={cl.Pager_headers}>
                                <div className={`${cl.Pager_segment} ${cl.Pager_segment1} ${descTab == 1 ? cl.Pager_descTab : cl.Pager_inactive}`}>
                                    <div className={cl.Name} onClick={() => setDescTab(1)}>
                                        <h3>{translate("film.info.header.overwiev")}</h3>
                                    </div>
                                </div>
                                <div className={`${cl.Pager_segment} ${cl.Pager_segment2} ${descTab == 2 ? cl.Pager_descTab : cl.Pager_inactive}`}>
                                    <div className={cl.Name} onClick={() => setDescTab(2)}>
                                        <h3>{translate("film.info.header.reviews")}</h3>
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
                                    </div>
                                }
                                {
                                    descTab == 2 && 
                                    <div>
                                        Comming soon!
                                    </div>  
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    store.lang_ready && store.lang.packet_name == "en" && film.imdb_translate_status == "ok" &&
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
                        store.lang_ready && store.lang.packet_name == "en" && !imdbErr
                            ?
                            film.imdb_cfg?.description
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
                                        <button key={pl.index} className={`${cl.Tab} ${i === 0 && cl.First} ${pl.index == rPlayer.config.index && cl.Active} ${cl.Pl_tab} ${pl.err ? cl.Err : ""}`} onClick={() => preparePlSelect(adsMode, pl)}>
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
                            <button className={cl.Tab} onClick={() => preparePlSelect(!adsMode, rPlayer.config, true)}>
                                <span className={cl.Tab_content}>
                                    Ads Mode: {adsMode ? "on" : "off"}
                                </span>
                            </button>
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
                </div>
            </div>
        </div>
    )
}

export default observer(FilmPage)