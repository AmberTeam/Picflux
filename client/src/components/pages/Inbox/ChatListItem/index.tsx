import { observer } from "mobx-react-lite"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../../../.."
import { IChat } from "../../../../models/IDirect"
import { IUserMin } from "../../../../models/IUser"

interface IChatListItemProps {
    chat: IChat
    handler: (arg:string) => void
}

const ChatListItem:FC<IChatListItemProps> = (props:IChatListItemProps) => {

    const {wsc, store} = useContext(Context)
    const [online, setOnline] = useState<boolean>(false)

    useEffect(() => {
        if(store.isSocketAuth && props.chat.members.length) {
            if(props.chat.members[0].status) setOnline(props.chat.members[0].status === 1 ? true : false)
            wsc.addListener('update-status', (e:any) => {
                if(e.payload.uid === props.chat.members[0].id) setOnline(true)
            })
            wsc.send('session-init', {uid:props.chat.members[0].id})
        }
    }, [store.isSocketAuth])


    return (
        <div>
            {props.chat.members.map((member) => 
                <button key={member.id} onClick={() => props.handler(props.chat.chatid)}>
                    <span>{member.username}</span>
                    <div>{online ? "online" : "offline"}</div>
                    <img src={member.avatar} style={{width: 25}}/>
                </button>
            )}
        </div>
    )
}

export default observer(ChatListItem)