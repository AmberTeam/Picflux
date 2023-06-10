import { useEffect } from "react"
import { useNavigate, useOutletContext, useParams, redirect, useSubmit, ActionFunctionArgs, Params, ParamParseKey } from "react-router-dom"
import { IChat } from "../../interfaces/IDirect"
import InboxService from "../../services/InboxService"

const path = "/inbox/create/:id"
interface Args extends ActionFunctionArgs {
params: Params<ParamParseKey<typeof path>>
}

export async function createChatAction({ params }: Args) {
    if(params.id) {
        const response = await InboxService.createChat([params.id])
        if (response.data) {
            return redirect(`/inbox/${response.data.chatid}`)
        }
    }
    return redirect("/inbox")
}

const CreateChat = () => {
    const params = useParams<"id">()
    const { chats } = useOutletContext<{ chats: IChat[] }>()
    const navigate = useNavigate()
    const submit = useSubmit()
    const searchChat = () => {
        return chats.find(chat => chat.members.some(member => member.id === params.id))
    }
    useEffect(() => {
        if(params.id) {
            const chat = searchChat()
            if(chat) {
                navigate(`/inbox/${chat.chatid}`)
            }
            else {
                submit(null, {
                    method: "post"
                })
            }
        }
    }, [chats, params.id])
    return (
        <div>Creating chat...</div>
    )    
}

export default CreateChat