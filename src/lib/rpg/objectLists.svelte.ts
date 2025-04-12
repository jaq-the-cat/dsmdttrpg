import { Container, Healing, MeleeWeapon, RangedWeapon } from "./items.svelte"

export const prefabs: { [type: string]: (Container | MeleeWeapon | RangedWeapon | Healing)[] } = {
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
    new MeleeWeapon("Screwdriver", 0.1, "1d4 + Strength Pierce", null),
    new MeleeWeapon("Work Hammer", 0.1, "1d4 + Strength Blunt", null),
    new MeleeWeapon("Wrench", 0.1, "1d4 + Strength Blunt", null),
    new MeleeWeapon("Knife", 0.1, "1d6 + Strength + 1 Slash", null),
    new MeleeWeapon("Machete", 0.5, "1d6 + Strength + 2 Slash", "-1 Block"),
    new MeleeWeapon("Sword", 1, "1d6 + Strength + 1 Slash", "-1 Hit, -1 Block"),
    new MeleeWeapon("Axe", 2, "1d10 + Strength + 3 Slash", null),
    new MeleeWeapon("Chainsaw", 4, "1d12 + Strength + 1 Slash", "+1 Hit, uses 200mL Oil per Hit"),
    new MeleeWeapon("Improv. Metal Shield", 5, "1 Strike", "-3 Block"),
    new MeleeWeapon("JCJ Titanium Shield", 8, "3 Strike", "-4 Block"),
  ],
  'Ranged': [
    new RangedWeapon("Pistol", 1, "Firearms", "6 Pierce", 10, 1, 12, 1, null),
    new RangedWeapon("Revolver", 1, "Firearms", "10 Pierce", 10, 1, 6, 2, null),
    new RangedWeapon("Submachine Gun", 2, "Firearms", "2 Pierce", 10, 6, 30, 1, null),
    new RangedWeapon("Rifle", 2, "Firearms", "3 Pierce", 20, 5, 28, 1, null),
    new RangedWeapon("Assault Rifle", 3, "Firearms", "4 Pierce", 30, 4, 32, 1, null),
    new RangedWeapon("Battle Rifle", 3, "Firearms", "5 Pierce", 30, 5, 24, 1, null),
    new RangedWeapon("Sniper Rifle", 5, "Firearms", "20 Pierce", 50, 1, 4, 1, "+ 2 Hit under 10m, -1 Hit above 10m, -2 Hit above 20m"),
    new RangedWeapon("Improvised Railgun", 1, "Technology", "22 Energy", 15, 1, 1, 4, null),
    new RangedWeapon("JCJ Railgun", 2, "Technology", "28 Energy", 15, 1, 1, 2, null),
    new RangedWeapon("Sentinel Gun", null, "Technology", "Bootloops in a 5m cone", 5, 1, 1, 1, "Looking away costs your reaction"),
    new RangedWeapon("Grenade", null, "Technology", "Bootloops in a 5m cone", 5, 1, 1, 1, "Looking away costs your reaction"),
    new RangedWeapon("EMP Grenade", null, "1d15", "1d12 + Explosives + 1 Explosive", 5, 1, 1, 1, "Explodes after 1 turn"),
  ],
  'DD': [
    new MeleeWeapon("Sword", null, "1d6 + Strength + 1 Slash", "-1 Hit, -1 Block"),
    new MeleeWeapon("Claws", null, "1d8 + Strength + 2 Slash", "Rate up to 2"),
    new MeleeWeapon("Chainsaw", null, "1d12 + Strength + 1 Slash", "+1 Hit, uses 1L Used Oil per Hit"),
    new RangedWeapon("Laser", null, "Firearms", "6 Energy", 20, 1, 2, 1, "One arm at a time"),
    new RangedWeapon("Missile", null, "Firearms", "8 Explosive", 20, 1, 1, 2, "Tracking"),
    new RangedWeapon("Ninja Star", null, "Athletics", "4 Pierce", 10, 1, 1, 1, null),
    new RangedWeapon("EMP", null, "Technology", "Bootloops all in 5m", 5, 1, 1, 1, "Bootloops self on failure. Difficulty 10"),
  ],
  'Healing': [
    new Healing("Bandage", 0.05, "humans", "4 HP", null, null),
    new Healing("First Aid Kit", 0.5, "humans", "10 HP", "Medicine check, difficulty is missing HP", null),
    new Healing("MedKit", 1, "humans", "15 HP", "Revives", "Medicine Proficiency"),
    new Healing("Surgical Kit", 2, "humans", "25 HP", "Revives", "Medicine Expertise"),

    new Healing("Basic Repair Kit", 2, "drones", "4 HP", null, null),
    new Healing("Repair Kit", 2, "drones", "10 HP", "Mechanics check, difficulty is missing HP", null),
    new Healing("JCJ Sp. WD Repair Kit", 3, "drones", "15 HP", "Revives", "Mechanics Proficiency"),
  ],
}