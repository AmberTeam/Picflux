import React, { useEffect, useState, useContext } from 'react'
import { idText, ObjectType } from 'typescript'
import {Context} from "../"

export const useTranslation = () => {

    const {store} = useContext(Context)

    const [lang, setLang] = useState<typeof store.lang>(store.lang)

    const reduceWayToSteps = (way: string) => {
        var steps: any = way.split(".")
        steps.map((step: any) => {
            step = {el: step, isArrCaller: false}
        })
        return {steps, num: steps.length}
    }

    const translate = (way: any) => {
        const steps = reduceWayToSteps(way)
        const langO:ObjectType = lang as any;
        var result: any = langO[ steps.steps[0] as keyof typeof langO ]
        for(var i = 1;steps.num > i;i++) {
            result = result[ steps.steps[i] ]
        }
        return result
    }

    const decodeLangPackByName = (lang_name: string) => {
        return store.predefineLang(lang_name)
    }

    const setLanguage = (lang_name: string) => {
        let lang = store.predefineLang(lang_name)
        store.setLang(lang)
    }

    useEffect(() => {
        setLang(store.lang)
    }, [store.lang])

    return {translate, setLanguage, currLang: lang, decodeLangPackByName}
}