import { AmmoItem, Container, Healing, Item, LiquidContainer, MeleeWeapon, RangedWeapon, Throwable } from "../infra/items.svelte"
import { Rarity } from "../rarity.svelte"


import { weapons } from "./weapons.svelte"

export const prefabs: { [type: string]: (Container | Item)[] } = {
  'Containers': [
    new Container("Fanny Pack", 6, Rarity.Common, undefined, undefined, ["front"], 16),
    new Container("Purse", 8, Rarity.Common, undefined, undefined, ["hand", "shoulder"], 20),
    new Container("Suitcase", 10, Rarity.Rare, undefined, undefined, ["hand"], 24),
    new Container("Satchel", 20, Rarity.VeryRare, undefined, undefined, ["hand", "shoulder", "back"], 30),
    new Container("Backpack", 30, Rarity.SuperRare, undefined, undefined, ["hand", "back"], 40),
    new Container("Hiking Back", 40, Rarity.UltraRare, undefined, undefined, ["back"], 60, true),
    new Container("Shopping Cart", 100, Rarity.VeryRare, undefined, undefined, ["hand"], 200, true)
  ],
  'Melee': Object.values(weapons.Melee),
  'Ranged': Object.values(weapons.Ranged),
  'Throwable': Object.values(weapons.Throwable),
  'Ammo': [
    AmmoItem.default("Pistol", Rarity.Rare, 12, 1),
    AmmoItem.default("Revolver", Rarity.VeryRare, 6, 2),
    AmmoItem.default("Submachine Gun", Rarity.VeryRare, 30, 1),
    AmmoItem.default("Semi-Auto Shotgun", Rarity.SuperRare, 10, 1),
    AmmoItem.default("Pump Shotgun", Rarity.SuperRare, 6, 1),
    AmmoItem.default("Rifle", Rarity.SuperRare, 28, 1),
    AmmoItem.default("Assault Rifle", Rarity.SuperRare, 32, 1),
    AmmoItem.default("Battle Rifle", Rarity.UltraRare, 24, 1),
    AmmoItem.default("Sniper Rifle", Rarity.Waow, 4, 1),
    AmmoItem.default("Improvised Railgun", Rarity.SuperRare, 1, 4),
    AmmoItem.default("JCJ Railgun", Rarity.Waow, 1, 2),
    AmmoItem.default("Sentinel Gun", Rarity.UltraRare, 1, 1),
  ],
  'Healing': [
    new Healing("Bandage", 0.05, Rarity.Rare, "Humans", "4 HP", null, null),
    new Healing("First Aid Kit", 0.5, Rarity.VeryRare, "Humans", "10 HP", "Medicine check, difficulty is missing HP", null),
    new Healing("MedKit", 1, Rarity.VeryRare, "Humans", "15 HP", "Yes", "Medicine Proficiency"),
    new Healing("Surgical Kit", 2, Rarity.SuperRare, "Humans", "25 HP", "Yes", "Medicine Expertise"),

    new Healing("Basic Repair Kit", 2, Rarity.VeryRare, "Drones", "4 HP", null, null),
    new Healing("Repair Kit", 2, Rarity.SuperRare, "Drones", "10 HP", "Mechanics check, difficulty is missing HP", null),
    new Healing("JCJ Sp. WD Repair Kit", 3, Rarity.UltraRare, "Drones", "15 HP", "Yes", "Mechanics Proficiency"),

    new Healing("Solver Nanite Paste", null, Rarity.Waow, "Both", "100% HP + 2 HP for 5 turns", "Yes", null),
  ],
  'Oil': [
    new Item("Battery Pack", 1, Rarity.Uncommon),

    new LiquidContainer("Oil Bottle (200mL)", 0.1, Rarity.Common, 0.2, 0.8),
    new LiquidContainer("Oil Bottle (500mL)", 0.2, Rarity.Uncommon, 0.5, 0.8),
    new LiquidContainer("Oil Jug (1L)", 0.4, Rarity.Rare, 1, 0.8),
    new LiquidContainer("Oil Jerrycan (10L)", 0.6, Rarity.SuperRare, 10, 0.8),

    new LiquidContainer("Gasoline Jerrycan (10L)", 0.6, Rarity.UltraRare, 10, 0.6),
    new LiquidContainer("Diesel Jerrycan (10L)", 0.6, Rarity.SuperRare, 10, 0.7),
  ],
  'Human Food': [
    new Item("Stale Bread", 0.2, Rarity.Common),
    new Item("Fresh Bread", 0.3, Rarity.Uncommon),
    new Item("Cold Pizza", 0.5, Rarity.SuperRare),
    new Item("Hot Pizza", 0.5, Rarity.UltraRare),
    new Item("Burger", 0.6, Rarity.Rare),

    new LiquidContainer("Water Bottle (200mL)", 0.1, Rarity.Common, 0.2, 1),
    new LiquidContainer("Water Bottle (500mL)", 0.2, Rarity.Uncommon, 0.5, 1),
    new LiquidContainer("Water Jug (1L)", 0.4, Rarity.Rare, 1, 1),
  ],
  'Resources': [
    new Item("WD Head", 10, Rarity.Rare),
    new Item("WD Leg", 5, Rarity.Rare),
    new Item("WD Arm", 5, Rarity.Rare),
    new Item("WD Body", 40, Rarity.SuperRare),
    new Item("AD Head", 8, Rarity.Rare),
    new Item("AD Leg", 4, Rarity.Rare),
    new Item("AD Arm", 4, Rarity.Rare),
    new Item("AD Body", 30, Rarity.SuperRare),
    new Item("DD Arm", 30, Rarity.UltraRare),
    new Item("DD Leg", 30, Rarity.UltraRare),
    new Item("Industrial-Grade Glue", 0.1, Rarity.Uncommon),
    new Item("Tape", 0.1, Rarity.Common),
    new Item("Box of Screws", 2, Rarity.Common),
    new Item("Silencer", 0.1, Rarity.Rare),
    new Item("Metal Sheet", 0.4, Rarity.Common),
    new Item("Metal Rod", 0.1, Rarity.Common),
    new Item("Gun Barrel", 0.2, Rarity.Common),
    new Item("Gun Grip", 0.1, Rarity.Common),
    new Item("Hollow Titanium Tube", 0.1, Rarity.Uncommon),
    new Item("Computer Parts", 0.2, Rarity.Uncommon),
    new Item("Nail", 0.2, Rarity.Uncommon),
    new Item("High Energy Capacitor", 0.2, Rarity.Rare),
    new Item("Low Energy Capacitor", 0.2, Rarity.Uncommon),
  ],
  'Disassmebly Drone': Object.values(weapons.Disassembly),
  'Avian Drone': Object.values(weapons.Avian),
  'Solver Drone': Object.values(weapons.Solver),
}