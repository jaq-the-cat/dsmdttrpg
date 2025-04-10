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

export function orderedToSvelte<K, V>(omap: OrderedMap<K, V>): SvelteMap<K, V> {
    let map = new SvelteMap<K, V>();
    console.log(omap)
    omap.forEach((entry) => map.set(entry.key, entry.value))
    return map;
}