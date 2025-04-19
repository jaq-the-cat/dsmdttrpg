import { MeleeWeapon, RangedWeapon, type Item } from "./items.svelte"
import { prefabs, Rarity } from "./objectLists.svelte"
import { weapons } from "./weapons.svelte"

class Enemy {
    maxHp: number
    description?: string
    guaranteedWeapons: Item[]
    possibleWeapons: Item[]
    stats: [string, number][]
    passive: [string, number][]

    constructor(maxHp: number, guaranteedWeapons: Item[], possibleWeapons: Item[], stats: { [key: string]: number }, passive: { [key: string]: number }, description?: string) {
        this.maxHp = maxHp;
        this.guaranteedWeapons = guaranteedWeapons;
        this.possibleWeapons = possibleWeapons;
        this.stats = Object.entries(stats);
        this.passive = Object.entries(passive);
        this.description = description;
    }
}

export const enemyLists: { [category: string]: { [enemy: string]: Enemy } } = {
    "Humans": {
        "Human Civilian": new Enemy(4, [], [
            weapons.Melee.Knife,
            weapons.Ranged.Pistol,
            weapons.Ranged.Revolver,
            weapons.Ranged.SMG,
        ], {
        }, {
            "Passive Perception": 8,
            "Intimidation Resistance (Drones)": 10,
        }),
        "JCJ Security [NC]": new Enemy(6, [
            weapons.Ranged.Pistol,
        ], [], {}, {
            "Passive Perception": 14,
        }),
        "JCJ Mercenary [NC]": new Enemy(6, [
            weapons.Melee.Knife,
            weapons.Ranged.Pistol,
            weapons.Ranged.Rifle
        ], [], {
            "Firearms": 2,
        }, {
            "Passive Perception": 14,
        }),
        "JCJ Private Soldier [NC]": new Enemy(12, [
            weapons.Melee.Knife,
            weapons.Ranged.Revolver,
            weapons.Ranged["Assault Rifle"],
        ], [], {
            "Against Solver Drones": 1,
            "Firearms": 3,
        }, {
            "Passive Perception": 15,
            "Persuasion Resistance": 15,
            "Intimidation Resistance": 15,
        }, "Private Military Security soldier hired by JCJenson after the Gala Incident and the discovery of the AbsoluteSolver Anomaly. Received Special Training against Solver Drones."),
        "JCJ Private Commander [NC]": new Enemy(12, [
            weapons.Melee.Knife,
            weapons.Ranged.Revolver,
            weapons.Ranged["Assault Rifle"],
        ], [], {
            "Against Solver Drones": 1,
            "Against Disassembly Drones": 1,
            "Firearms": 3,
        }, {
            "Passive Perception": 15,
            "Persuasion Resistance": 15,
            "Intimidation Resistance": 15,
        }, "Private Military Security commander hired by JCJenson after the Gala Incident and the discovery of the AbsoluteSolver Anomaly. Received Special Training against Solver Drones and Disassembly Drones."),
        "Marine": new Enemy(10, [
            weapons.Melee.Knife,
            weapons.Ranged.Pistol,
            weapons.Ranged["Assault Rifle"]
        ], [], {
            "Strength": 1,
            "Firearms": 3,
        }, {
            "Passive Perception": 14,
            "Persuasion Resistance": 16,
            "Intimidation Resistance": 16,
        }),
        "Marine Captain": new Enemy(10, [
            weapons.Melee.Knife,
            weapons.Ranged.Pistol,
            weapons.Ranged["Assault Rifle"]
        ], [], {
            "Strength": 1,
            "Firearms": 3,
        }, {
            "Passive Perception": 16,
            "Persuasion Resistance": 16,
            "Intimidation Resistance": 16,
        }),
        "Marine Commander": new Enemy(12, [
            weapons.Melee.Knife,
            weapons.Ranged.Revolver,
            weapons.Ranged["Assault Rifle"]
        ], [], {
            "Strength": 1,
            "Firearms": 4,
        }, {
            "Passive Perception": 16,
            "Persuasion Resistance": 18,
            "Intimidation Resistance": 18,
        }),
        "Marine Sniper": new Enemy(12, [
            weapons.Ranged.Pistol,
            weapons.Ranged["Sniper Rifle"]
        ], [], {
            "Firearms": 5,
            "Stealth": 2,
        }, {
            "Passive Perception (Sniper Rifle equipped)": 6,
            "Persuasion Resistance": 14,
            "Intimidation Resistance": 14,
        })
    },
    "Worker Drones": {
        "Worker Drone": new Enemy(10, [], [
            weapons.Melee.Knife,
            weapons.Ranged.Pistol
        ], {
            "Firearms": 1,
            "Stealth": 1,
        }, {
            "Passive Perception": 8,
        }),
        "Trader Worker Drone [NC]": new Enemy(10, [weapons.Melee.Knife], [
            weapons.Ranged.Pistol,
            weapons.Ranged.Revolver,
            weapons.Ranged.SMG,
            weapons.Ranged.Rifle,
            weapons.Ranged["Assault Rifle"],
            weapons.Ranged["Improvised Railgun"],
        ], {
            "Firearms": 2,
            "Stealth": 3,
        }, {
            "Passive Perception": 14,
            "Persuasion Resistance": 16,
        }),
        "WDF Worker Drone": new Enemy(14, [weapons.Melee.Knife], [
            weapons.Ranged.Pistol,
            weapons.Ranged.Revolver,
            weapons.Ranged.SMG,
            weapons.Ranged.Rifle,
            weapons.Ranged["Assault Rifle"],
            weapons.Ranged["Battle Rifle"],
            weapons.Ranged["Sniper Rifle"],
            weapons.Ranged["Improvised Railgun"],
            weapons.Ranged["JCJ Railgun"],
        ], {
            "Strength": 1,
            "Firearms": 3,
            "Attack Bonus against DDs & JCJ": 1,
        }, {
            "Passive Perception": 14,
            "Persuasion Resistance": 16,
            "Persuasion Resistance (against DDs & JCJ)": 20,
            "Intimidation Resistance": 16,
        })
    },
    "Custom Species": {},
    "Solver Drones": {},
    "Disassembly Drones": {},
    "Sentinel": {},
    "Unique": {},
}