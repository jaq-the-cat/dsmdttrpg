import { MeleeWeapon, RangedWeapon, Throwable } from "./items.svelte";
import { Rarity } from "./rarity.svelte";

export const weapons = {
  'Melee': {
    "Bone Saw": new MeleeWeapon("Bone Saw", 0.1, Rarity.Common, "1d4 + Strength Slash", null),
    "Screwdriver": new MeleeWeapon("Screwdriver", 0.1, Rarity.Common, "1d4 + Strength Pierce", null),
    "Work Hammer": new MeleeWeapon("Work Hammer", 0.1, Rarity.Common, "1d4 + Strength Blunt", null),
    "Wrench": new MeleeWeapon("Wrench", 0.1, Rarity.Common, "1d4 + Strength Blunt", null),
    "Knife": new MeleeWeapon("Knife", 0.1, Rarity.Uncommon, "1d4 + Strength + 6 Slash", null),
    "Machete": new MeleeWeapon("Machete", 0.5, Rarity.Rare, "1d4 + Strength + 8 Slash", "-1 Block"),
    "Sword": new MeleeWeapon("Sword", 1, Rarity.Rare, "1d4 + Strength + 8 Slash", "-2 Hit, -2 Block"),
    "Axe": new MeleeWeapon("Axe", 2, Rarity.VeryRare, "1d10 + Strength + 4 Slash", null, true),
    "Chainsaw": new MeleeWeapon("Chainsaw", 4, Rarity.SuperRare, "1d12 + Strength + 6 Slash", "+1 Hit, uses 200mL Oil per Hit", true),
    "Improv. Metal Shield": new MeleeWeapon("Improv. Metal Shield", 5, Rarity.Rare, "2 Strike", "-4 Block"),
    "JCJ Titanium Shield": new MeleeWeapon("JCJ Titanium Shield", 8, Rarity.VeryRare, "4 Strike", "-6 Block"),
  },
  'Ranged': {
    "Pistol": RangedWeapon.loaded("Pistol", 1, Rarity.VeryRare, "Firearms", "8 Pierce", 10, 1, 12, 1, null),
    "Revolver": RangedWeapon.loaded("Revolver", 1, Rarity.VeryRare, "Firearms", "10 Pierce", 10, 1, 6, 2, null),
    "SMG": RangedWeapon.loaded("Submachine Gun", 2, Rarity.SuperRare, "Firearms", "6 Pierce", 12, 6, 30, 1, "-1 Hit every 3 meters"),
    "Semi-Auto Shotgun": RangedWeapon.loaded("Semi-Auto Shotgun", 2, Rarity.SuperRare, "Firearms", "12 Pierce", 12, 2, 10, 1, "-1 Damage per meter"),
    "Pump Shotgun": RangedWeapon.loaded("Pump Shotgun", 2, Rarity.UltraRare, "Firearms", "24 Pierce", 12, 1, 6, 1, "-2 Damage per meter"),
    "Rifle": RangedWeapon.loaded("Rifle", 2, Rarity.SuperRare, "Firearms", "6 Pierce", 20, 5, 28, 1, null),
    "Assault Rifle": RangedWeapon.loaded("Assault Rifle", 3, Rarity.SuperRare, "Firearms", "8 Pierce", 30, 4, 32, 1, null),
    "Battle Rifle": RangedWeapon.loaded("Battle Rifle", 3, Rarity.UltraRare, "Firearms", "12 Pierce", 30, 3, 24, 1, null),
    "Sniper Rifle": RangedWeapon.loaded("Sniper Rifle", 5, Rarity.UltraRare, "Firearms", "24 Pierce", 50, 1, 4, 1, "+ 2 Hit under 10m, -1 Hit above 10m, -2 Hit above 20m"),
    "Improvised Railgun": RangedWeapon.loaded("Improvised Railgun", 1, Rarity.UltraRare, "Technology", "22 Energy", 15, 1, 1, 4, null),
    "JCJ Railgun": RangedWeapon.loaded("JCJ Railgun", 2, Rarity.Waow, "Technology", "28 Energy", 15, 1, 1, 2, null),
    "Sentinel Gun": RangedWeapon.loaded("Sentinel Gun", 4, Rarity.SuperRare, "Technology", "Bootloops in a 5m cone", 5, 1, 1, 1, "Looking away costs your reaction"),
  },
  'Throwable': {
    "Grenade": new Throwable("Grenade", 1, Rarity.SuperRare, "1d12 + Explosives + 4 Explosive", "1d15", "Explodes after 1 Turn."),
    "EMP Grenade": new Throwable("EMP Grenade", 1, Rarity.VeryRare, "Bootloops in a 5m cone", "1d15", "Explodes after 1 Turn."),
    "Ninja Star": new Throwable("Ninja Star", null, Rarity.Waow, "10 + Strength Pierce", "10"),
  },
  'Human': {
    'Human Bite': new MeleeWeapon("Human Bite", null, Rarity.Rare, "1d4 + Strength + 2 Pierce",
      "When used on a Human, drain 2 Blood.When used on a Drone, damage is 1 and you take 1d4 + 2 Blunt instead. If target consents, damage is 1."),
  },
  'Worker': {
    'Worker Bite': new MeleeWeapon("Worker Bite", null, Rarity.Rare, "1d4 + Strength + 4 Pierce",
      "If used on a Worker Drone, drain 2 Fresh Oil. If used on a Human, remove 2 Blood. If target consents, damage is 1."),
    'Knife Tail': new MeleeWeapon("Knife Tail", 0, Rarity.VeryRare, "1d4 + Strength + 6 Slash", "+1 Successful Hits on hit"),
  },
  'Disassembly': {
    'Disassembly Bite': new MeleeWeapon("Disassembly Bite", null, Rarity.Rare, "1d8 + Strength + 6 Pierce",
      "If used on a Worker Drone, remove 1 Fresh Oil and drain 2 Used Oil. If used on a Human, remove 1 Blood and drain 1 Blood. If target consents, damage is 1. +1 Heat on success."),
    "Sword": new MeleeWeapon("Sword", null, Rarity.Rare, "1d6 + Strength + 8 Slash", "-2 Hit, -2 Block"),
    "Claws": new MeleeWeapon("Claws", null, Rarity.Rare, "1d6 + Strength + 6 Slash", "Rate up to 2"),
    "Chainsaw": new MeleeWeapon("Chainsaw", null, Rarity.VeryRare, "1d12 + Strength + 6 Slash", "+1 Hit, uses 1L Used Oil per Hit."),
    "SMG": RangedWeapon.loaded("Submachine Gun", null, Rarity.SuperRare, "Firearms", "4 Pierce", 10, 6, 30, 1, null),
    "Laser": RangedWeapon.loaded("Laser", null, Rarity.Waow, "Firearms", "14 Energy", 20, 1, 2, 1, null),
    "Missile": new RangedWeapon("Missile", null, Rarity.Waow, "Firearms", "16 Explosive", 20, 1, "Deals damage in a 1m radius"),
    "Ninja Star": new Throwable("Ninja Star", null, Rarity.Waow, "10 + Strength Pierce", "10"),
    "EMP": new RangedWeapon("EMP", null, Rarity.VeryRare, "Technology", "Bootloops all drones within 5 meters", 5, 1, "Bootloops self on failure. May only be used once per fight. Difficulty is 10 + Missing Health."),
  },
  'Avian': {
    'Wings': new MeleeWeapon("Wings", 0, 0, "None", "Increases Agility by +1."),
    'Small Claws': new MeleeWeapon("Small Claws", 0, 0, "1d6 + Strength + 4 Slash", null),
    'Talon Dive': new MeleeWeapon("Talon Dive", 0, 0, "1d6 + Strength + 6 Slash", "Must be initiated from flight. When used, move a maximum of 20 meters horizontally in the direction of the target."),
    'Talon Strike': new MeleeWeapon("Talon Dive", 0, 0, "1d6 + Strength + 4 Slash", null),
  },
  'Wasp': {
    'Stinger': new MeleeWeapon("Stinger", null, Rarity.Rare, "6 + Strength Pierce", "+ 1d12 if attacking a Drone"),
    'Wasp Bite': new MeleeWeapon("Wasp Bite", null, Rarity.Rare, "6 + Strength Pierce", "+ 1d12 if attacking a Drone"),
  },
  'Solver': {
    'Solver Bite': new MeleeWeapon("Solver Bite", null, Rarity.Rare, "1d6 + Strength + 6 Pierce",
      "If used on a Worker Drone, remove 1 Fresh Oil and drain 2 Used Oil. If used on a Human, remove 1 Blood and drain 1 Blood. If target consents, damage is 1. +1 Heat on success."),
    'Solver Translate': new RangedWeapon("Solver Translate", null, 0, "Absolute Solver", "None", 5, 0, "Move any object up to 5 meters from your position or throw it up to 10 meters from its position."),
    'Solver Transform': new RangedWeapon("Solver Transform", null, 0, "Absolute Solver", "1d6 + Absolute Solver Energy", 5, 0, "Crush any object, damaging or destroying it or dealing Energy damage to enemies."),
    'Solver Teleport': new RangedWeapon("Solver Teleport", null, 0, "Absolute Solver", "None", 15, 0, "During Combat, teleport anywhere you can see within 15m with an Absolute Solver roll of difficulty 5 + distance in meters. Out of Combat, teleport anywhere you can see within 15m for free or anywhere you’ve been before with an Absolute Solver roll of 16 difficulty."),
    '[null]': new RangedWeapon("[null]", null, 0, "Absolute Solver", "(Absolute Solver)d3 + 2 Energy", 5, 0, "Instantly erases any non-Enemy object. Increases Heat and Absolute Solver by 1 each time it is used."),
    'Solver Tail': new MeleeWeapon("Solver Tail", 0, Rarity.VeryRare, "1d6 + Strength + 4 Slash", "+1 Successful Hits on hit. May be used as an extra limb, flashlight or weapon. Lights up to 10m in front of the user in a cone. Range is 2m."),
    'Solver Claws': new MeleeWeapon("Solver Claws", 0, Rarity.VeryRare, "1d8 + Strength + 4 Slash", "Rate up to 2. If Both hands are claws, disable Solver Powers."),
    'Solver Stabbies': new MeleeWeapon("Solver Stabbies", 0, Rarity.VeryRare, "1d8 + Strength + 6 Pierce", "Rate 2. +1 Successful Hits on hit."),
  }
}