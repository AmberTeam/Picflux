import { IUser } from "../interfaces/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../interfaces/AuthResponse";
import { API_URL } from "../http";
import lconfig from "../lang_packets/config/global";
import ukr from "../lang_packets/ua.json";
import ru from "../lang_packets/ru.json";
import en from "../lang_packets/en.json";
import { TUser } from "react-telegram-auth";
import { IMessage } from "../interfaces/IMessage";
import Theme from "../enums/Theme";
import ILanguage from "../interfaces/ILanguage";
import Language from "../enums/Language";

export interface ILogModal {
    code: string
    status?: number
    duration?: number
}

export interface IAlert {
    data: any
    tag: string
}

export interface ISChatConfig {
    offset?: number
    offset_add?: number
    chatid?: string
    canLoad?: boolean
}

export interface IChatStorage {
    config: ISChatConfig
    messages: IMessage[]
}

class Store {
    user: IUser = {} as IUser;
    online: any[] = [];

    lang: ILanguage = this.getLanguageTexts(lconfig.lang_default as Language);
    lang_ready = false;

    theme: Theme = Theme.Light;

    logoutModalActive = false;

    logModalConfig: ILogModal = {} as ILogModal;
    logModalActive = false;

    isLoading = false;
    isAuth = false;

    isSocketAuth = false;

    alert: IAlert | null = null;
    chatstorage: IChatStorage[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    //ALERTS 
    pushAlert(payload: IAlert | null) {
        this.alert = payload;
    }

    //CHAT FRAGMENTS
    storeChatConfig(chatcfg: ISChatConfig): IChatStorage | null {
        for (let i = 0; i < this.chatstorage.length; i++) {
            if (this.chatstorage[i].config.chatid === chatcfg.chatid) return this.chatstorage[i];
        }

        this.chatstorage.push({
            config: chatcfg,
            messages: []
        });

        return null;
    }

    updateChatConfig(chatcfg: ISChatConfig): void {
        for (let i = 0; i < this.chatstorage.length; i++) {
            if (this.chatstorage[i].config.chatid === chatcfg.chatid) this.chatstorage[i].config = { ...this.chatstorage[i].config, ...chatcfg };
        }
    }

    updateChatMessages(chatid: string, messages: IMessage[]): void {
        for (let i = 0; i < this.chatstorage.length; i++) {
            if (this.chatstorage[i].config.chatid === chatid) this.chatstorage[i].messages = messages;
        }
    }

    pushChatMessage(chatid: string, message: IMessage): void {
        for (let i = 0; i < this.chatstorage.length; i++) {
            if (this.chatstorage[i].config.chatid === chatid) {
                if (this.chatstorage[i].messages) this.chatstorage[i].messages.push(message);
                else this.chatstorage[i].messages = [message];
                if (this.chatstorage[i].config) this.chatstorage[i].config.offset_add = this.chatstorage[i].config.offset_add! + 1;
                else this.chatstorage[i].config = {
                    chatid,
                    offset: 0,
                    offset_add: 0
                };
            }
        }
    }

    getChatConfig(chatid: string): IChatStorage | null {
        for (let i = 0; i < this.chatstorage.length; i++) {
            if (this.chatstorage[i].config.chatid === chatid) return this.chatstorage[i];
        }

        return null;
    }

    //SOCKETS 
    setSocketAuth(bool: boolean) {
        this.isSocketAuth = bool;
    }

    //ONLINE 
    changeOnline(sckts: string[]): void {
        this.online = sckts;
    }
    addOnlineUser(uid: string): void {
        this.online.push(uid);
    }

    removeOnlineUser(uid: string): void {
        this.online = this.online.filter((_uid: string) => _uid !== uid);
    }

    //LOG MODAL
    callLogModal(config: ILogModal = this.logModalConfig): void {
        this.logModalConfig = config;
        this.logModalActive = true;
    }

    closeLogModal(): void {
        //this.logModalConfig = {} as ILogModal
        this.logModalActive = false;
    }

    //LANG 
    getLanguageTexts(lang_name: Language): ILanguage {
        let lang = null;
        switch (lang_name) {
            case Language.English:
                lang = en;
                break;
            case Language.Ukranian:
                lang = ukr;
                break;
            case Language.Russian:
                lang = ru;
                break;
        }
        return lang;
    }

    setDefaultLang(): void {
        this.setLanguage(this.getLanguageTexts(lconfig.lang_default as Language));
        this.lang_ready = true;
    }

    setLanguage(language: ILanguage): void {
        if(language){
            this.lang = language;
            localStorage.setItem("lang", language.packet_name as string);
        }
    }

    getStoredLang(): Language {
        return localStorage.getItem("lang") as Language;
    }

    checkLang(): void {
        const lang_name = localStorage.getItem("lang") as Language;
        const lang = this.getLanguageTexts(lang_name);
        this.setLanguage(lang);
        this.lang_ready = true;
    }

    //THEME 
    setDefaultTheme(): void {
        this.setTheme(Theme.Light);
    }

    setTheme(theme: Theme): void {
        this.theme = theme;
        localStorage.setItem("theme", theme);
    }

    checkTheme(): void {
        const theme = localStorage.getItem("theme") as Theme;
        this.setTheme(theme);
    }

    //LOGOUT MODAL
    callLogoutModal(): void {
        this.logoutModalActive = true;
    }

    setLogoutModal(bool: boolean): void {
        this.logoutModalActive = bool;
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

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async registration(email: string, password: string): Promise<boolean> {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async logout(delete_data_flag = false): Promise<void> {
        await AuthService.logout(delete_data_flag);
        localStorage.removeItem("token");
        this.setAuth(false);
        this.setUser({} as IUser);
    }

    async handleTelegramAuth(authdata: TUser): Promise<void> {
        this.setLoading(true);
        const response = await axios.get<AuthResponse>(`${API_URL}/oauth/telegram`, { withCredentials: true, params: authdata });
        localStorage.setItem("token", response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
        this.setLoading(false);
    }

    async checkAuth(): Promise<void> {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(error) {
            console.log(error);
        }
        this.setLoading(false);
    }
}
const store = new Store();
export default store;