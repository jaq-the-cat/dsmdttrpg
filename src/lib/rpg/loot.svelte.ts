import type { AmmoItem, Container, Item, LiquidContainer, RangedWeapon } from "./items.svelte"
import { prefabs } from "./objectLists.svelte"

export type WhatLoot = Item | RangedWeapon | AmmoItem | LiquidContainer | Container

export function getLoot(investigation: number, lookFor: string[]): undefined | [string, WhatLoot] {
    if (!lookFor.length) return;
    const table = lookFor.at(Math.floor(Math.random() * lookFor.length))!;
    const available = prefabs[table]?.filter(item => item.rarity <= investigation);
    const item = available?.at(Math.floor(Math.random() * available.length))
    if (item) {
        return [table, item];
    }
}