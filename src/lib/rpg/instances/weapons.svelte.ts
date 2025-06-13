import { MeleeWeapon, RangedWeapon, Throwable } from "../infra/items.svelte";
import { Rarity } from "../rarity.svelte";

export const weapons = {
  'Melee': {
    "Bone Saw": new MeleeWeapon("Bone Saw", 0.1, Rarity.Common, "1d4 + Strength Slash", null),
    "Screwdriver": new MeleeWeapon("Screwdriver", 0.1, Rarity.Common, "1d4 + Strength Pierce", null),
    "Work Hammer": new MeleeWeapon("Work Hammer", 0.1, Rarity.Common, "1d4 + Strength Blunt", null),
    "Hidden Dagger": new MeleeWeapon("Small Dagger", 0.1, Rarity.Common, "1d6 + Strength Slash", "Can be equipped without using an action. Can be used to perform an Assassination."),
    "Wrench": new MeleeWeapon("Wrench", 0.1, Rarity.Common, "1d4 + Strength Blunt", null),
    "Knife": new MeleeWeapon("Knife", 0.1, Rarity.Uncommon, "1d4 + Strength + 4 Slash", "Can be used to perform an Assassination."),
    "Machete": new MeleeWeapon("Machete", 0.5, Rarity.Rare, "1d4 + Strength + 6 Slash", "-1 Block"),
    "Sword": new MeleeWeapon("Sword", 1, Rarity.Rare, "1d4 + Strength + 6 Slash", "-2 Hit, -2 Block"),
    "Axe": new MeleeWeapon("Axe", 2, Rarity.VeryRare, "1d10 + Strength + 4 Slash", null, true),
    "Chainsaw": new MeleeWeapon("Chainsaw", 4, Rarity.SuperRare, "1d12 + Strength + 8 Slash", "+1 Hit, uses 200mL Oil per Hit", true),
    "Improv. Metal Shield": new MeleeWeapon("Improv. Metal Shield", 5, Rarity.Rare, "2 Strike", "-4 Block"),
    "JCJ Titanium Shield": new MeleeWeapon("JCJ Titanium Shield", 8, Rarity.VeryRare, "4 Strike", "-6 Block"),
  },
  'Ranged': {
    "Pistol": RangedWeapon.loaded("Pistol", 1, Rarity.VeryRare, "Firearms", "8 Pierce", 10, 1, 12, 1, null),
    "Revolver": RangedWeapon.loaded("Revolver", 1, Rarity.VeryRare, "Firearms", "10 Pierce", 10, 1, 6, 2, null),
    "SMG": RangedWeapon.loaded("Submachine Gun", 2, Rarity.SuperRare, "Firearms", "6 Pierce", 12, 6, 30, 1, "-1 Hit every 3 meters"),
    "Semi-Auto Shotgun": RangedWeapon.loaded("Semi-Auto Shotgun", 2, Rarity.SuperRare, "Firearms", "12 Pierce", 12, 2, 10, 1, "-1 Damage per meter"),
    "Pump Shotgun": RangedWeapon.loaded("Pump Shotgun", 2, Rarity.UltraRare, "Firearms", "24 Pierce", 12, 1, 6, 1, "-2 Damage per meter"),
    "Rifle": RangedWeapon.loaded("Rifle", 2, Rarity.SuperRare, "Firearms", "10 Pierce", 20, 1, 6, 1, null),
    "Assault Rifle": RangedWeapon.loaded("Assault Rifle", 3, Rarity.SuperRare, "Firearms", "10 Pierce", 30, 4, 32, 1, null),
    "Battle Rifle": RangedWeapon.loaded("Battle Rifle", 3, Rarity.UltraRare, "Firearms", "12 Pierce", 30, 3, 24, 1, null),
    "Sniper Rifle": RangedWeapon.loaded("Sniper Rifle", 5, Rarity.UltraRare, "Firearms", "24 Pierce", 50, 1, 4, 1, "+ 2 Hit under 10m, -1 Hit above 10m, -2 Hit above 20m"),
    "Improvised Railgun": RangedWeapon.loaded("Improvised Railgun", 1, Rarity.UltraRare, "Technology", "22 Energy", 15, 1, 1, 4, null),
    "JCJ Railgun": RangedWeapon.loaded("JCJ Railgun", 2, Rarity.Waow, "Technology", "28 Energy", 15, 1, 1, 2, null),
    "Sentinel Gun": RangedWeapon.loaded("Sentinel Gun", 4, Rarity.UltraRare, "Technology", "Bootloops in a 5m cone", 5, 1, 1, 1, "Looking away costs 2 Reactions"),
  },
  'Sentinel': {
    "Sentinel Flash": RangedWeapon.loaded("Sentinel Flash", null, Rarity.UltraRare, "Technology", "Bootloops in a 5m cone", 5, 1, 1, 1, "Looking away costs 2 Reactions"),
    "Sentinel Bite": new MeleeWeapon("Sentinel Bite", null, Rarity.Rare, "1d6 + 4 Pierce", null),
  },
  'Throwable': {
    "Grenade": new Throwable("Grenade", 1, Rarity.SuperRare, "1d12 + Explosives + 4 Explosive", "1d15", "Explodes after 1 Turn."),
    "EMP Grenade": new Throwable("EMP Grenade", 1, Rarity.VeryRare, "Bootloops in a 5m cone", "1d15", "Explodes after 1 Turn."),
    "Ninja Star": new Throwable("Ninja Star", null, Rarity.Waow, "10 + Strength Pierce", "10"),
  },
  'Wasp': {
    'Wasp Bite': new MeleeWeapon("Wasp Bite", null, Rarity.Rare, "6 + Strength Pierce", "+ 1d12 if attacking a Drone"),
    'Stinger': new MeleeWeapon("Stinger", null, Rarity.Rare, "6 + Strength Pierce", "+ 1d12 if attacking a Drone"),
  },
}