import type { AmmoItem, Container, Item, LiquidContainer, RangedWeapon } from "./infra/items.svelte"
import { Rarity } from "./rarity.svelte"
import { prefabs } from "./instances/objectLists.svelte"

export type WhatLoot = Item | RangedWeapon | AmmoItem | LiquidContainer | Container

// const rarityTable = [
//   [Rarity.Common, 10],
//   [Rarity.Uncommon, 8],
//   [Rarity.Rare, 6],
//   [Rarity.VeryRare, 6],
//   [Rarity.SuperRare, 5],
//   [Rarity.UltraRare, 4],
//   [Rarity.Waow, 3],
// ]

export function getLoot(investigation: number, lookFor: string[]): undefined | [string, WhatLoot] {
  if (!lookFor.length) return;
  const table = lookFor.at(Math.floor(Math.random() * lookFor.length))!;
  const available = prefabs[table]?.filter(item => item.rarity <= investigation);
  const item = available?.at(Math.floor(Math.random() * available.length))
  if (item) {
    return [table, item];
  }
}