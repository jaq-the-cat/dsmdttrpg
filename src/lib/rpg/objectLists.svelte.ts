import { AmmoItem, Container, Healing, Item, LiquidContainer, MeleeWeapon, RangedWeapon } from "./items.svelte"

export enum Rarity {
    Common = 6,
    Uncommon = 10,
    Rare = 12,
    VeryRare = 14,
    SuperRare = 16,
    UltraRare = 18,
    Waow = 20,
    Impossible = 99,
}

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
    'Melee': [
        new MeleeWeapon("Screwdriver", 0.1, Rarity.Common, "1d4 + Strength Pierce", null),
        new MeleeWeapon("Work Hammer", 0.1, Rarity.Common, "1d4 + Strength Blunt", null),
        new MeleeWeapon("Wrench", 0.1, Rarity.Common, "1d4 + Strength Blunt", null),
        new MeleeWeapon("Knife", 0.1, Rarity.Uncommon, "1d6 + Strength + 1 Slash", null),
        new MeleeWeapon("Machete", 0.5, Rarity.Rare, "1d6 + Strength + 2 Slash", "-1 Block"),
        new MeleeWeapon("Sword", 1, Rarity.Rare, "1d6 + Strength + 1 Slash", "-1 Hit, -1 Block", true),
        new MeleeWeapon("Axe", 2, Rarity.VeryRare, "1d10 + Strength + 3 Slash", null, true),
        new MeleeWeapon("Chainsaw", 4, Rarity.SuperRare, "1d12 + Strength + 1 Slash", "+1 Hit, uses 200mL Oil per Hit", true),
        new MeleeWeapon("Improv. Metal Shield", 5, Rarity.Rare, "1 Strike", "-3 Block"),
        new MeleeWeapon("JCJ Titanium Shield", 8, Rarity.VeryRare, "3 Strike", "-4 Block"),
    ],
    'Ranged': [
        RangedWeapon.loaded("Pistol", 1, Rarity.VeryRare, "Firearms", "6 Pierce", 10, 1, 12, 1, null),
        RangedWeapon.loaded("Revolver", 1, Rarity.VeryRare, "Firearms", "10 Pierce", 10, 1, 6, 2, null),
        RangedWeapon.loaded("Submachine Gun", 2, Rarity.SuperRare, "Firearms", "2 Pierce", 10, 6, 30, 1, null),
        RangedWeapon.loaded("Rifle", 2, Rarity.SuperRare, "Firearms", "3 Pierce", 20, 5, 28, 1, null),
        RangedWeapon.loaded("Assault Rifle", 3, Rarity.SuperRare, "Firearms", "4 Pierce", 30, 4, 32, 1, null),
        RangedWeapon.loaded("Battle Rifle", 3, Rarity.UltraRare, "Firearms", "5 Pierce", 30, 5, 24, 1, null),
        RangedWeapon.loaded("Sniper Rifle", 5, Rarity.UltraRare, "Firearms", "20 Pierce", 50, 1, 4, 1, "+ 2 Hit under 10m, -1 Hit above 10m, -2 Hit above 20m"),
        RangedWeapon.loaded("Improvised Railgun", 1, Rarity.UltraRare, "Technology", "22 Energy", 15, 1, 1, 4, null),
        RangedWeapon.loaded("JCJ Railgun", 2, Rarity.Waow, "Technology", "28 Energy", 15, 1, 1, 2, null),
        RangedWeapon.loaded("Sentinel Gun", 4, Rarity.SuperRare, "Technology", "Bootloops in a 5m cone", 5, 1, 1, 1, "Looking away costs your reaction"),
        RangedWeapon.loaded("Grenade", 1, Rarity.SuperRare, "1d15", "1d12 + Explosives + 1 Explosive", 5, 1, 1, 1, "Explodes after 1 turn"),
        RangedWeapon.loaded("EMP Grenade", 1, Rarity.VeryRare, "Technology", "Bootloops in a 5m cone", 5, 1, 1, 1, "Explodes after 1 turn"),
    ],
    'Ammo': [
        AmmoItem.default("Pistol", Rarity.Rare, 12, 1),
        AmmoItem.default("Revolver", Rarity.VeryRare, 6, 2),
        AmmoItem.default("Submachine Gun", Rarity.VeryRare, 30, 1),
        AmmoItem.default("Rifle", Rarity.SuperRare, 28, 1),
        AmmoItem.default("Assault Rifle", Rarity.SuperRare, 32, 1),
        AmmoItem.default("Battle Rifle", Rarity.UltraRare, 24, 1),
        AmmoItem.default("Sniper Rifle", Rarity.Waow, 4, 1),
        AmmoItem.default("Improvised Railgun", Rarity.SuperRare, 1, 4),
        AmmoItem.default("JCJ Railgun", Rarity.Waow, 1, 2),
        AmmoItem.default("Sentinel Gun", Rarity.UltraRare, 1, 1),
        AmmoItem.default("Grenade", Rarity.VeryRare, 1, 1),
        AmmoItem.default("EMP Grenade", Rarity.SuperRare, 1, 1),
    ],
    'DD': [
        new MeleeWeapon("Claws", null, Rarity.Common, "1d8 + Strength + 2 Slash", "Rate up to 2"),
        new MeleeWeapon("Sword", null, Rarity.VeryRare, "1d6 + Strength + 1 Slash", "-1 Hit, -1 Block"),
        new MeleeWeapon("Chainsaw", null, Rarity.VeryRare, "1d12 + Strength + 1 Slash", "+1 Hit, uses 1L Used Oil per Hit"),
        RangedWeapon.loaded("Laser", null, Rarity.VeryRare, "Firearms", "6 Energy", 20, 1, 2, 1, "One arm at a time"),
        RangedWeapon.loaded("Missile", null, Rarity.SuperRare, "Firearms", "8 Explosive", 20, 1, 1, 2, "Tracking"),
        RangedWeapon.loaded("Ninja Star", null, Rarity.Rare, "Athletics", "4 Pierce", 10, 1, 1, 1, null),
        RangedWeapon.loaded("EMP", null, Rarity.Waow, "Technology", "Bootloops all in 5m", 5, 1, 1, 1, "Bootloops self on failure. Difficulty 10"),
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
        new Item("WD Parts", 5, Rarity.Rare),
        new Item("WD Body", 40, Rarity.SuperRare),
    ],
}