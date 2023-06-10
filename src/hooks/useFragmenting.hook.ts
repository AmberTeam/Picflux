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
                if ((i - start) % fragmentLength === 0) {
                    fragments[fragmentIndex].id = messages[i]._id
                }
                fragments[fragmentIndex].messages.push({ ...messages[i], last: i === messages.length - 1 })
            }
            return fragments
        }
        return []
    }
    const setNewFragments = (newFragments: IFragment[]) => {
        const isInvalid = newFragments.some((fragment, index) => fragment.messages.length !== fragmentLength && index < newFragments.length - 1)
        if (!isInvalid) {
            setFragments(newFragments)
        }
    }
    const updateFragments = (method: "push" | "unshift" | "none" | "replace", newMessages: IMessage[]) => {
        if (method !== "none") {
            if (method === "push") {
                if (newMessages.length) {
                    setFragments(previousFragments => {
                        const lastFragment = previousFragments[previousFragments.length - 1]
                        let index = 0
                        if (lastFragment) {
                            while (newMessages[index] && lastFragment.messages.length < fragmentLength) {
                                lastFragment.messages.push(newMessages[index])
                                index++
                            }
                        }
                        const nextFragments = fragmentMessages(newMessages, index)
                        return [...previousFragments, ...nextFragments]
                    })
                }
            }
            else if (method === "unshift") {
                if (newMessages.length) {
                    setFragments(previousFragments => {                        
                        if (newMessages.length % fragmentLength === 0) {
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
                    })
                }
            }
            else if (method === "replace") {
                setFragments(() => {  
                    if (newMessages.length) return [{ id: newMessages[0]._id, messages: newMessages }]
                    else return []
                })
            }
            return []
        }
    }
    return { fragments, updateFragments, setNewFragments }
}