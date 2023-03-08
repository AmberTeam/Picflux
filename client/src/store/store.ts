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
import { TUser } from "react-telegram-auth";

export interface ILogModal {
    code: string,
    alt: string,
    status?: number,
    duration?: number
}

export default class Store {
    user: IUser = {} as IUser
    online:any[] = [] as any

    lang = this.predefineLang(lconfig.lang_defaut);
    lang_ready:boolean = false

    theme:string = 'light'

    logoutModalActive:boolean = false;

    logModalConfig:ILogModal = {} as ILogModal
    logModalActive:boolean = false

    isLoading:boolean = false;
    isAuth:boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    //ONLINE 
    changeOnline(sckts: string[]): void {
        console.log(sckts)
        this.online = sckts
    }
    addOnlineUser(uid: string): void {
        this.online.push(uid)
    }

    removeOnlineUser(uid: string): void {
        this.online = this.online.filter((_uid: string) => _uid !== uid)
    }

    //LOG MODAL
    callLogModal(config: ILogModal = this.logModalConfig): void { 
        this.logModalConfig = config 
        this.logModalActive = true
    }

    closeLogModal(): void {
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

    setDefaultLang(): void {
        this.setLang(this.predefineLang(lconfig.lang_defaut))
        this.lang_ready = true
    }

    setLang(_lang: any): void {
        this.lang = _lang
        localStorage.setItem('lang', _lang.packet_name)
    }

    getStoredLang(): string {
        return localStorage.getItem('lang') as string
    }

    checkLang(): void {
        const lang_name:string = localStorage.getItem('lang') as string
        const lang = this.predefineLang(lang_name!) 
        this.setLang(lang)
        this.lang_ready = true 
    }

    //SEARCH QUEUE
    checkSearchQueue(): any {
        const SQ = localStorage.getItem("sqp") 
        if(SQ) {
            return JSON.parse(SQ)
        }
    }
    
    setDefaultQueueConfig(config: ISQueue): void {
        localStorage.setItem("sqp", JSON.stringify([config]))
    }

    setSearchQueuePage(config: ISQueue, flag: number = 0): any {
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
    setDefaultTheme(): void {
        this.setTheme('light')
    }

    setTheme(theme: string): void {
        this.theme = theme
        localStorage.setItem('theme', theme)
    }

    checkTheme(): void {
        const theme = localStorage.getItem('theme') as string
        this.setTheme(theme)
    }

    //LOGOUT MODAL
    callLogoutModal(): void {
        this.logoutModalActive = true
    }

    setLogoutModal(bool: boolean): void { 
        this.logoutModalActive = bool
    }

    //LOADING
    setLoading(bool: boolean): void {
        this.isLoading = bool;
    }

    //AUTH & API 
    setAuth(bool: boolean): void {
        this.isAuth = bool;
    }

    setUser(user: IUser): void {
        this.user = user;
    }

    async login(email: string, password: string): Promise<void> {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(email: string, password: string): Promise<void> {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async logout(delete_data_flag: boolean = false): Promise<void> {
        try {
            const response = await AuthService.logout(delete_data_flag);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e);
        }
    }

    async handleTelegramAuth(authdata: TUser): Promise<void> {
        this.setLoading(true) 
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/oauth/telegram`, {withCredentials: true, params: authdata})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e) 
        } finally {
            this.setLoading(false)
        }
    }

    async checkAuth(): Promise<void> {
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
