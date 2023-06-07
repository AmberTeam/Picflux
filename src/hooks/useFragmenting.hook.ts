import { useState } from "react"
import { IMessage } from "../interfaces/IMessage"
import { IFragment } from "../pages/Inbox/Chat/MessageList"

export default function useFragmenting(fragmentLength: number) {
    const [fragments, setFragments] = useState<IFragment[]>([])
    const fragmentMessages = (messages: IMessage[], start = 0): IFragment[] => {
        if (messages.length) {
            const numberOfFragments: number = Math.ceil((messages.length - start) / fragmentLength)
            const fragments: IFragment[] = Array.from({ length: numberOfFragments }, () => {
                return {
                    id: "",
                    messages: []
                }
            })
            for (let i = start; i < messages.length; i++) {
                const fragmentIndex = Math.floor(i / fragmentLength)
                if((i - start) % fragmentLength === 0) {
                    fragments[fragmentIndex].id = messages[i]._id
                }
                fragments[fragmentIndex].messages.push({ ...messages[i], last: i === messages.length - 1 })
            }
            return fragments
        }
        return []
    }
    const updateFragments = (method: "push" | "unshift" | "none" | "replace", newMessages: IMessage[]) => {
        if (method !== "none" && newMessages.length) {
            setFragments(previousFragments => {
                if (method === "push") {
                    const lastFragment = previousFragments[previousFragments.length - 1]
                    let index = 0
                    if(lastFragment) {
                        while (newMessages[index] && lastFragment.messages.length < fragmentLength) {
                            lastFragment.messages.push(newMessages[index])
                            index++
                        }
                    }
                    const nextFragments = fragmentMessages(newMessages, index)
                    return [...previousFragments, ...nextFragments]
                }
                else if(method === "unshift") {
                    if(newMessages.length % fragmentLength === 0) {
                        const newFragments = fragmentMessages(newMessages)
                        return [...newFragments, ...previousFragments]
                    }
                    else {
                        const previousMessages: IMessage[] = previousFragments.reduce((acc: IMessage[], fragment) => {
                            return [...acc, ...fragment.messages]
                        }, [])
                        const fragments = fragmentMessages([...newMessages, ...previousMessages])
                        return fragments
                    }
                }
                else {
                    return [{id: newMessages[0]._id, messages: newMessages}]
                }
            })
        }
        else if(method === "replace") {
            setFragments([])
        }
    }
    return { fragments, updateFragments }
}