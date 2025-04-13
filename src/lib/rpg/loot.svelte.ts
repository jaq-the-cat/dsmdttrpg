import type { Container, Item } from "./items.svelte"
import { prefabs } from "./objectLists.svelte"

export type WhatLoot = Item | Container
export enum LootTable {
  Melee = "Melee",
  Ranged = "Ranged",
  HealingDrone = "Drone Healing",
  HealingHuman = "Human Healing",
  Resources = "Resources"
}

export const lootTables: Map<LootTable, WhatLoot[]> = new Map([
  [LootTable.Melee, prefabs["Melee"]],
  [LootTable.Ranged, prefabs["Ranged"]],
  [LootTable.HealingHuman, prefabs["Healing"].filter((h: any) => h.worksOn === "Both" || h.worksOn === "Humans")],
  [LootTable.HealingDrone, prefabs["Healing"].filter((h: any) => h.worksOn === "Both" || h.worksOn === "Drones")],
  [LootTable.Resources, prefabs["Resources"]],
])

export function getLoot(investigation: number, lookFor: LootTable[]): undefined | [LootTable, WhatLoot] {
  if (!lookFor.length) return;
  const table = lookFor.at(Math.floor(Math.random() * lookFor.length))!;
  const available = lootTables.get(table)?.filter(item => item.rarity <= investigation);
  const item = available?.at(Math.floor(Math.random() * available.length))
  if (item) {
    return [table, item];
  }
}