import { observer } from "mobx-react-lite"
import { FC, useContext, useEffect, useState } from "react"
import { Context } from "../../../.."
import { IChat } from "../../../../models/IDirect"
import {toJS} from 'mobx'
import cl from '../index.module.sass'
import { IMessage } from "../../../../models/IMessage"
import { useTranslation } from "../../../../hooks/translator.hook"

interface IChatListItemProps {
    chat: IChat
    handler: (arg:string) => void
    active: boolean
    globalSeenHandler: IMessage[]
    default_unread: IMessage[]
}

const ChatListItem:FC<IChatListItemProps> = (props:IChatListItemProps) => {

    const {translate} = useTranslation()
    const {wsc, store} = useContext(Context)
    const [online, setOnline] = useState<boolean>(false)
    const [alerts, setAlerts] = useState<IMessage[]>(props.default_unread ? props.default_unread : [])

    useEffect(() => {
        if(store.isSocketAuth && props.chat.members.length) {
            if(props.chat.members[0].status) setOnline(props.chat.members[0].status === 1 ? true : false)
            wsc.addListener('update-status', (e:any) => {
                if(e.payload.uid === props.chat.members[0].id) setOnline(true)
            })
            wsc.send('session-init', {uid:props.chat.members[0].id})
        }
    }, [store.isSocketAuth])

    useEffect(() => {
        if(store.alert) {
            const alert_js:any = toJS(store.alert)
            if(alert_js.tag === 'msg' && alert_js.chatid === props.chat.chatid && alert_js.owner === props.chat.members[0].id) {
                store.pushChatMessage(props.chat.chatid, alert_js)
                setAlerts([...alerts, alert_js])
            }
        }
    }, [store.alert])

    useEffect(() => {
        if(props.globalSeenHandler && alerts.length) {
            const gsi = props.globalSeenHandler.map((msg:IMessage) => msg._id)
            const result:IMessage[] = []
            for(var i=0;i < alerts.length;i++) {
                if(alerts[i] && !gsi.includes(alerts[i]._id)) result.push(alerts[i])
            }
            setAlerts(result)
        }
    }, [props.globalSeenHandler])
    

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
                        {online ? translate("g.statuses.online") : translate("g.statuses.offline")}
                    </div>
                </div>
            </div>
            {
                alerts.length > 0 && <div className={cl.ChatListItem_alerts}>
                    {alerts.length}
                </div>
            }
        </button>
    )
}

export default observer(ChatListItem)