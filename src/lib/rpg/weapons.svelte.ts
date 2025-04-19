import { MeleeWeapon, RangedWeapon, Throwable } from "./items.svelte";
import { Rarity } from "./objectLists.svelte";

export const weapons = {
    'Melee': {
        "Screwdriver": new MeleeWeapon("Screwdriver", 0.1, Rarity.Common, "1d4 + Strength Pierce", null),
        "Work Hammer": new MeleeWeapon("Work Hammer", 0.1, Rarity.Common, "1d4 + Strength Blunt", null),
        "Wrench": new MeleeWeapon("Wrench", 0.1, Rarity.Common, "1d4 + Strength Blunt", null),
        "Knife": new MeleeWeapon("Knife", 0.1, Rarity.Uncommon, "1d6 + Strength + 1 Slash", null),
        "Machete": new MeleeWeapon("Machete", 0.5, Rarity.Rare, "1d6 + Strength + 2 Slash", "-1 Block"),
        "Sword": new MeleeWeapon("Sword", 1, Rarity.Rare, "1d6 + Strength + 1 Slash", "-1 Hit, -1 Block", true),
        "Axe": new MeleeWeapon("Axe", 2, Rarity.VeryRare, "1d10 + Strength + 3 Slash", null, true),
        "Chainsaw": new MeleeWeapon("Chainsaw", 4, Rarity.SuperRare, "1d12 + Strength + 1 Slash", "+1 Hit, uses 200mL Oil per Hit", true),
        "Improv. Metal Shield": new MeleeWeapon("Improv. Metal Shield", 5, Rarity.Rare, "1 Strike", "-3 Block"),
        "JCJ Titanium Shield": new MeleeWeapon("JCJ Titanium Shield", 8, Rarity.VeryRare, "3 Strike", "-4 Block"),
    },
    'Ranged': {
        "Pistol": RangedWeapon.loaded("Pistol", 1, Rarity.VeryRare, "Firearms", "6 Pierce", 10, 1, 12, 1, null),
        "Revolver": RangedWeapon.loaded("Revolver", 1, Rarity.VeryRare, "Firearms", "10 Pierce", 10, 1, 6, 2, null),
        "SMG": RangedWeapon.loaded("Submachine Gun", 2, Rarity.SuperRare, "Firearms", "2 Pierce", 10, 6, 30, 1, null),
        "Rifle": RangedWeapon.loaded("Rifle", 2, Rarity.SuperRare, "Firearms", "3 Pierce", 20, 5, 28, 1, null),
        "Assault Rifle": RangedWeapon.loaded("Assault Rifle", 3, Rarity.SuperRare, "Firearms", "4 Pierce", 30, 4, 32, 1, null),
        "Battle Rifle": RangedWeapon.loaded("Battle Rifle", 3, Rarity.UltraRare, "Firearms", "5 Pierce", 30, 5, 24, 1, null),
        "Sniper Rifle": RangedWeapon.loaded("Sniper Rifle", 5, Rarity.UltraRare, "Firearms", "20 Pierce", 50, 1, 4, 1, "+ 2 Hit under 10m, -1 Hit above 10m, -2 Hit above 20m"),
        "Improvised Railgun": RangedWeapon.loaded("Improvised Railgun", 1, Rarity.UltraRare, "Technology", "22 Energy", 15, 1, 1, 4, null),
        "JCJ Railgun": RangedWeapon.loaded("JCJ Railgun", 2, Rarity.Waow, "Technology", "28 Energy", 15, 1, 1, 2, null),
        "Sentinel Gun": RangedWeapon.loaded("Sentinel Gun", 4, Rarity.SuperRare, "Technology", "Bootloops in a 5m cone", 5, 1, 1, 1, "Looking away costs your reaction"),

    },
    'Throwable': {
        "Grenade": new Throwable("Grenade", 1, Rarity.SuperRare, "1d12 + Explosives + 1 Explosive", "1d15", "Explodes after 1 Turn."),
        "EMP Grenade": new Throwable("EMP Grenade", 1, Rarity.VeryRare, "Bootloops in a 5m cone", "1d15", "Explodes after 1 Turn."),
        "Ninja Star": new Throwable("Ninja Star", null, Rarity.Waow, "4 Pierce", "10"),
    },
}