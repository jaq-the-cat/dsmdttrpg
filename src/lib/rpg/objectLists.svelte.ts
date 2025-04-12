import { Container, MeleeWeapon, RangedWeapon, type EquipOn } from "./items.svelte"

export const prefabs: { [type: string]: (Container | MeleeWeapon | RangedWeapon)[] } = {
  'Containers': [
    new Container("Fanny Pack", 6, undefined, undefined, ["front"]),
    new Container("Purse", 8, undefined, undefined, ["hand", "shoulder"]),
    new Container("Suitcase", 10, undefined, undefined, ["hand"]),
    new Container("Satchel", 20, undefined, undefined, ["hand", "shoulder", "back"]),
    new Container("Backpack", 30, undefined, undefined, ["hand", "back"]),
    new Container("Hiking Back", 40, undefined, undefined, ["back"]),
    new Container("Shopping Cart", 100, undefined, undefined, ["hand"])
  ],
  'Melee': [
    // Melee
    new MeleeWeapon("Screwdriver", 0.1, "1d4 + Strength Pierce", null),
    new MeleeWeapon("Work Hammer", 0.1, "1d4 + Strength Blunt", null),
    new MeleeWeapon("Wrench", 0.1, "1d4 + Strength Blunt", null),
    new MeleeWeapon("Knife", 0.1, "1d6 + Strength + 1 Slash", null),
    new MeleeWeapon("Machete", 0.5, "1d6 + Strength + 2 Slash", "-1 Block"),
    new MeleeWeapon("Sword", 1, "1d6 + Strength + 1 Slash", "-1 Hit, -1 Block"),
    new MeleeWeapon("Axe", 2, "1d10 + Strength + 3 Slash", null),
    new MeleeWeapon("Chainsaw", 4, "1d12 + Strength + 1 Slash", "+1 Hit, requires 200mL Oil per Hit"),
    new MeleeWeapon("Improv. Metal Shield", 5, "1 Strike", "-3 Block"),
    new MeleeWeapon("JCJ Titanium Shield", 8, "3 Strike", "-4 Block"),
  ],
  'Ranged': [
    // Ranged
    new RangedWeapon("Pistol", 1, "Firearms", "6 Pierce", 10, 1, 12, 1, null),
    new RangedWeapon("Revolver", 1, "Firearms", "10 Pierce", 10, 1, 6, 2, null),
    new RangedWeapon("Submachine Gun", 2, "Firearms", "2 Pierce", 10, 6, 30, 1, null),
    new RangedWeapon("Rifle", 2, "Firearms", "3 Pierce", 20, 5, 28, 1, null),
    new RangedWeapon("Assault Rifle", 3, "Firearms", "4 Pierce", 30, 4, 32, 1, null),
    new RangedWeapon("Battle Rifle", 3, "Firearms", "5 Pierce", 30, 5, 24, 1, null),
    new RangedWeapon("Sniper Rifle", 5, "Firearms", "20 Pierce", 50, 1, 4, 1, "+ 2 Hit under 10m, -1 Hit above 10m, -2 Hit above 20m"),
    new RangedWeapon("Improvised Railgun", 1, "Technology", "22 Energy", 15, 1, 1, 4, null),
    new RangedWeapon("JCJ Railgun", 2, "Technology", "28 Energy", 15, 1, 1, 2, null),
  ]
}