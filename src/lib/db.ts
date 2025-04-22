import type { Firestore } from 'firebase/firestore'
import { SvelteMap } from 'svelte/reactivity'

export let db: {
    firestore?: Firestore
} = {
}

export type OrderedMap<K, V> = { key: K, value: V }[]

export function svelteToOrdered<K, V>(map: SvelteMap<K, V>): OrderedMap<K, V> {
    let omap: OrderedMap<K, V> = []
    map.forEach((v, k) => omap.push({
        key: k,
        value: v,
    }))
    return omap;
}
export function objectToOrdered(obj: { [key: string]: any }): OrderedMap<string, any> {
    let omap: OrderedMap<string, any> = []
    Object.entries(obj).forEach(([key, value]) => omap.push({
        key,
        value,
    }))
    return omap;
}

export function orderedToSvelte<K, V>(omap: OrderedMap<K, V>): SvelteMap<K, V> {
    let map = new SvelteMap<K, V>();
    omap.forEach((entry) => map.set(entry.key, entry.value))
    return map;
}
export function orderedToObject(omap: OrderedMap<string, any>): any {
    let obj: { [key: string]: any } = {}
    omap.forEach((entry) => obj[entry.key] = entry.value);
    return obj;
}