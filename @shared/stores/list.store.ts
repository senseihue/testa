import { atom } from 'jotai'
import type { PrimitiveAtom } from 'jotai'

// Replicating IStoreListParams interface locally or importing it if shared types are accessible
// Assuming shared types might not be directly compatible if they are Vue-specific, but define it here for clarity or reuse.
// If this file is in the same project, we can reuse the type if it's just an interface.
// Based on grep results: interface IStoreListParams extends Record<string, any>

export interface IStoreListParams extends Record<string, any> {
    page: number
    size: number
    total: number
    keyword: string
}

export const createListParamsAtom = <T = IStoreListParams>(params: T) => {
    return atom({
        page: 0,
        size: 10,
        total: 0,
        keyword: "",
        ...params,
    })
}

export const createListAtoms = <T>() => {
    const loadingAtom = atom(false)
    const itemsAtom = atom<T[]>([])
    const filteredItemsAtom = atom<T[]>([])

    return { loadingAtom, itemsAtom, filteredItemsAtom }
}

export const createListStore = <T, P = IStoreListParams>() => {
    const { loadingAtom, itemsAtom, filteredItemsAtom } = createListAtoms<T>()
    const paramsAtom = createListParamsAtom<P>({} as P)

    return {
        loadingAtom,
        itemsAtom,
        filteredItemsAtom,
        paramsAtom,
    }
}
