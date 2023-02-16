import {useEffect, useState, useRef, useContext} from 'react'
import { IFilm } from '../../../models/IFilm'
import {useParams} from 'react-router-dom'
import cl from "./film.module.sass"
import UserService from "../../../services/UserService"
import AllowAuth from '../../AllowAuth'
import { useTranslation } from '../../../hooks/translator.hook'
import { observer } from 'mobx-react-lite'
import FCRService from '../../../services/FCRService'
import { config } from 'process'
import { useResizeHandler } from '../../../hooks/resizehandler.hook'
import { Context } from '../../..'
import LoaderMini from '../../UI/LoaderMini'
import FlagDetector from '../../UI/FlagDetector'

const FilmPage = () => {
    const {store} = useContext(Context)
    const {translate} = useTranslation()
    const [descTab, setDescTab] = useState<number>(1)
    const [film, setFilm] = useState<IFilm | null>(null)
    const [fAvailablePTabs, setFAvailablePTabs] = useState<[any]>([null])
    const [activePSelector, setActivePSelector] = useState<boolean>(true)
    const [originalPlayerFlag, setOriginalPlayerFlag] = useState<boolean>(false)
    const [mobileOriented, setMobileOriented] = useState<boolean>(false)
    const [rPlayer, setRPlayer] = useState<any>()
    const [isInWatchLater, setIsInWL] = useState<boolean | null>(null)
    const [isWLLoading, setIsWLLoading] = useState<boolean>(false)
    const [adsMode, setAdsMode] = useState<boolean>(true)
    const [plLoading, setPlLoading] = useState<number | null>(null)

    useResizeHandler((w: number) => {
        if(w > 1000) setMobileOriented(false)
        if(w < 1000) setMobileOriented(true)
    })
    
    const {id} = useParams()

    const definePlayerGeo = (purl: string) => {
        const {hostname} = new URL(purl)
        switch(hostname) {
            case "ashdi.vip":
                return "ukr"
            default: 
                return "ru"
        }
    }

    const reparseFilmConfig = (config: IFilm) => {
        const deartefacted_plrs = config.players.map((player, i) => {
            try {
                const durl = FCRService.deartefactUrl(player as any)
                const geo = definePlayerGeo(durl)
                return {
                    url: durl,
                    geo,
                    index: i + 1,
                    ps_index: i + 1
                }
            } catch(e) {
                return {
                    url: undefined,
                    geo: undefined,
                    index: i + 1,
                    ps_index: i + 1
                }
            }
        })
        return {
            ...config, 
            players: deartefacted_plrs as any,
            genres: JSON.parse(config?.genres as any),
            countries: JSON.parse(config?.countries as any)
        } as IFilm
    }

    const rewriteFilmDomByEmbeedUrl = async(plConf0: any) => {
        if(originalPlayerFlag) setOriginalPlayerFlag(false)
        const rewriteddom = await FCRService.rewriteByHostname(plConf0.url)
        setRPlayer({content: rewriteddom, config: plConf0})
    }

    const initOriginalPlayer = (plConf: any) => {
        setOriginalPlayerFlag(true)
        setRPlayer({
            content: plConf.url,
            config: plConf
        })
    }

    const getFilmData = async () => {
        const response = await UserService.getById(id)
        localStorage.setItem('last_seen', String(response.data.id))
        const filmConfig = reparseFilmConfig(response.data)
        setFAvailablePTabs(filmConfig.players as any)
        setFilm(filmConfig)
        rewriteFilmDomByEmbeedUrl(filmConfig.players[0])
        if(filmConfig.watchLater?.includes(String(filmConfig.id))) setIsInWL(true)
        else setIsInWL(false)
    }

    const changeWatchLater = async () => {
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

    const changeActivePSelector = (state: boolean) => {
        if(!mobileOriented)
            setActivePSelector(state)
    }

    const preparePlSelect = async (_adsMode: boolean, plConf: any, changeAdsMode: boolean = false) => {
        try {
            setPlLoading(plConf.index)
            if(changeAdsMode) setAdsMode(_adsMode)
            if(_adsMode) initOriginalPlayer(plConf)
            else await rewriteFilmDomByEmbeedUrl(plConf)
        } catch(e) {
            initOriginalPlayer(plConf)
        } finally {
            setPlLoading(null)
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

    if(!film || !rPlayer) return <div className={cl.Loader_container}>Loading film configuration</div>

    return (
        <div className={cl.FilmPage_container}>
            <div className={cl.Top_inner}>
                <div className={cl.Poster}>
                    <img src={film.poster}/>
                </div>
                <div className={cl.Content}>
                    <div className={cl.Header}>
                        <h1>{film.name} ({film.year})</h1>
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
            </div>
            <div className={cl.Bottom_inner}>
                <div className={cl.Description}>
                    {film.description.replace("© ГидОнлайн", "")}
                </div>
                <div className={cl.Frame_container} id="frame">
                    <div className={`${cl.PlayerTabs_container} ${activePSelector && cl.Active}`}>
                        <div className={cl.Tabs_inner}>
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
                    {
                        originalPlayerFlag 
                            ?
                            <iframe 
                                className={`${cl.Frame} ${!activePSelector && !mobileOriented && cl.Active}`} 
                                src={rPlayer.content} 
                                onMouseEnter={() => changeActivePSelector(false)} 
                                onMouseLeave={() => changeActivePSelector(true)}
                                allowFullScreen
                            />
                            :
                            <iframe 
                                className={`${cl.Frame} ${!activePSelector && !mobileOriented && cl.Active}`} 
                                srcDoc={rPlayer.content} 
                                onMouseEnter={() => changeActivePSelector(false)} 
                                onMouseLeave={() => changeActivePSelector(true)}
                                allowFullScreen
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(FilmPage)