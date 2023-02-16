import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import lconfig from "../lang_packets/config/global.json"
import ukr from '../lang_packets/ukr.json'
import ru from '../lang_packets/ru.json'
import en from '../lang_packets/en.json'
import en_img from "../img/lang_ic/en.png"
import ru_img from "../img/lang_ic/ru.png"
import ukr_img from "../img/lang_ic/ukr.png"
import { ISQueue } from "../models/ISQueue";

export interface ILogModal {
    code: string,
    alt: string,
    status?: number,
    duration?: number
}

export default class Store {
    user = {} as IUser
    online = [] as any

    lang = this.predefineLang(lconfig.lang_defaut);

    theme = 'light'

    logoutModalActive = false;

    logModalConfig = {} as ILogModal
    logModalActive = false

    isLoading = false;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    //ONLINE 
    changeOnline(sckts: string[]) {
        console.log(sckts)
        this.online = sckts
    }
    addOnlineUser(uid: string) {
        this.online.push(uid)
    }

    removeOnlineUser(uid: string) {
        this.online = this.online.filter((_uid: string) => _uid !== uid)
    }

    //LOG MODAL
    callLogModal(config: ILogModal = this.logModalConfig) { 
        this.logModalConfig = config 
        this.logModalActive = true
    }

    closeLogModal() {
        //this.logModalConfig = {} as ILogModal
        this.logModalActive = false
    }

    //LANG 
    predefineLang(lang_name: string): any {
        let lang = null;
        switch(lang_name) {
            case lconfig.langs_available[0].name: 
                lang = {...en, img: en_img}
                break
            case lconfig.langs_available[1].name:
                lang = {...ukr, img: ukr_img}
                break
            case lconfig.langs_available[2].name:
                lang = {...ru, img: ru_img}
                break
            default: 
                break
        }
        return lang
    }

    setDefaultLang() {
        this.setLang(this.predefineLang(lconfig.lang_defaut))
    }

    setLang(_lang: any) {
        this.lang = _lang
        localStorage.setItem('lang', _lang.packet_name)
    }

    checkLang() {
        const lang_name = localStorage.getItem('lang')
        const lang = this.predefineLang(lang_name!) 
        this.setLang(lang)
    }

    //SEARCH QUEUE
    checkSearchQueue() {
        const SQ = localStorage.getItem("sqp") 
        if(SQ) {
            return JSON.parse(SQ)
        }
    }
    
    setDefaultQueueConfig(config: ISQueue) {
        localStorage.setItem("sqp", JSON.stringify([config]))
    }

    setSearchQueuePage(config: ISQueue, flag: number = 0) {
        switch(flag) {
            case 0:
                let SQ = this.checkSearchQueue()
                if(Array.isArray(SQ)) {
                    SQ.push({...config, page: SQ.length})
                } else {
                    console.log(config)
                    SQ = [config]
                }
                
                localStorage.setItem("sqp", JSON.stringify(SQ))

                return SQ
            case 1: 
                localStorage.setItem("sqp", JSON.stringify([]))
                return
        }
    }

    //THEME 
    setDefaultTheme() {
        this.setTheme('light')
    }

    setTheme(theme: string) {
        this.theme = theme
        localStorage.setItem('theme', theme)
    }

    checkTheme() {
        const theme = localStorage.getItem('theme') as string
        this.setTheme(theme)
    }

    //LOGOUT MODAL
    callLogoutModal() {
        this.logoutModalActive = true
    }

    setLogoutModal(bool: boolean) { 
        this.logoutModalActive = bool
    }

    //LOADING
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    //AUTH & API 
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async logout(delete_data_flag: boolean = false) {
        try {
            const response = await AuthService.logout(delete_data_flag);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e); 
        } finally {
            this.setLoading(false);
        }
    }
}
