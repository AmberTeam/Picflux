import { observer } from "mobx-react-lite"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../../../.."
import { IChat } from "../../../../models/IDirect"
import { IUserMin } from "../../../../models/IUser"
import {toJS} from 'mobx'
import cl from '../index.module.sass'

interface IChatListItemProps {
    chat: IChat
    handler: (arg:string) => void
    active: boolean
}

const ChatListItem:FC<IChatListItemProps> = (props:IChatListItemProps) => {

    const {wsc, store} = useContext(Context)
    const [online, setOnline] = useState<boolean>(false)
    const [alerts, setAlerts] = useState<number>(0)
    useEffect(() => {
        if(store.isSocketAuth && props.chat.members.length) {
            if(props.chat.members[0].status) setOnline(props.chat.members[0].status === 1 ? true : false)
            wsc.addListener('update-status', (e:any) => {
                if(e.payload.uid === props.chat.members[0].id) setOnline(true)
            })
            wsc.send('session-init', {uid:props.chat.members[0].id})
        }
        return () => {
            wsc.removeListner('update-status', (e:any) => {
                if(e.payload.uid === props.chat.members[0].id) setOnline(true)
            })
        }
    }, [store.isSocketAuth])

    useEffect(() => {
        if(store.alert) {
            const alert_js:any = toJS(store.alert)
            if(alert_js.tag === 'msg' && alert_js.chatid === props.chat.chatid && alert_js.owner === props.chat.members[0].id) {
                store.pushChatMessage(props.chat.chatid, alert_js)
                setAlerts(alerts + 1)
            }
        }
    }, [store.alert])
    


    return (
        <button className={`${cl.ChatListItem_container} ${props.active ? cl.Active : cl.Default}`} onClick={() => props.handler(props.chat.chatid)}>
            <div className={cl.ChatListItem_profile}>
                <div className={cl.Avatar}>
                    <img src={props.chat.members[0].avatar} draggable={false} className={cl.Profile_avatar}/>
                </div>
                <div className={cl.Content}>
                    <div className={cl.Profile_username}>
                        {props.chat.members[0].username}
                    </div>
                    <div className={`${cl.Profile_status} ${online ? cl.Active : cl.Default}`}>
                        {online ? "online" : "offline"}
                    </div>
                </div>
            </div>
            {
                alerts > 0 && <div className={cl.ChatListItem_alerts}>
                    {alerts}
                </div>
            }
        </button>
    )
}

export default observer(ChatListItem)