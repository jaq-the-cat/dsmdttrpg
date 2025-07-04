import { Enemy } from "../infra/enemy.svelte";
import { innate } from "./innate.svelte";
import { weapons } from "./weapons.svelte";

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
      weapons.Ranged.Rifle,
      weapons.Ranged["Pump Shotgun"],
    ], [], {
      "Firearms": 2,
    }, {
      "Passive Perception": 14,
    }),
    "JCJ Private Soldier [NC]": new Enemy(12, [
      weapons.Melee.Knife,
      weapons.Ranged.Revolver,
      weapons.Ranged["Assault Rifle"],
      weapons.Ranged["Semi-Auto Shotgun"],
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
      weapons.Ranged["Semi-Auto Shotgun"],
      weapons.Ranged["JCJ Railgun"],
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
      weapons.Ranged["Assault Rifle"],
      weapons.Ranged["Semi-Auto Shotgun"],
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
      weapons.Ranged["Assault Rifle"],
      weapons.Ranged["Semi-Auto Shotgun"],
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
      weapons.Ranged["Assault Rifle"],
      weapons.Ranged["Semi-Auto Shotgun"],
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
      weapons.Ranged.Pistol,
      weapons.Ranged["Pump Shotgun"],
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
      weapons.Ranged["Pump Shotgun"],
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
      weapons.Ranged["Pump Shotgun"],
      weapons.Ranged["Semi-Auto Shotgun"],
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
    }),
    "Insane Worker Drone": new Enemy(12, [], [
      weapons.Melee.Knife,
      weapons.Melee.Machete,
      weapons.Melee.Axe,
      weapons.Ranged["Sentinel Gun"],
      weapons.Throwable["EMP Grenade"],
      innate["Worker Drone"]["Knife Tail"]
    ], {
      "Strength": 2,
      "Stealth": 4,
    }, {
      "Passive Perception": 15,
      "Persuasion Resistance": 99,
      "Intimidation Resistance": 16,
    }),
  },
  "Solver Drones": {
    "Solver Drone": new Enemy(12, [
      innate["Solver Drone"]["Solver Translate"],
      innate["Solver Drone"]["Solver Transform"],
      innate["Solver Drone"]["Solver Teleport"]
    ], [], {
      "Absolute Solver": 2,
      "Stealth": 3,
    }, {
      "Passive Perception": 10,
      "Persuasion Resistance": 14,
      "Intimidation Resistance": 14,
    }),
    "Controlled Solver Drone": new Enemy(14, [
      innate["Solver Drone"]["Solver Tail"],
      innate["Solver Drone"]["Solver Stabbies"],
    ], [
      innate["Solver Drone"]["Solver Claws"],
    ], {
      "Strength": 2,
      "Stealth": 3,
      "Absolute Solver": 5,
    }, {
      "Passive Perception": 16,
      "Persuasion Resistance": 16,
      "Intimidation Resistance": 16,
    }),
    "Centipede Drone": new Enemy(14, [], [
      innate["Solver Drone"]["Solver Translate"],
      innate["Solver Drone"]["Solver Transform"],
      innate["Solver Drone"]["[null]"],
      innate["Solver Drone"]["Solver Stabbies"],
    ], {
      "Strength": 5,
      "Absolute Solver": 5,
    }, {
      "Passive Perception": 12,
      "Persuasion Resistance": 99,
      "Intimidation Resistance": 99,
    }, "Can create holograms to hide itself and make you see anything it’d like, using its Absolute Solver bonus as the Stealth roll."),
  },
  "Disassembly Drones": {
    "Disassembly Drone": new Enemy(14, [
      innate["Disassembly Drone"].Claws,
      innate["Disassembly Drone"].Sword,
      innate["Disassembly Drone"].Chainsaw,
      innate["Disassembly Drone"].SMG,
      innate["Disassembly Drone"].Laser,
      innate["Disassembly Drone"].Missile,
      innate["Disassembly Drone"]["Ninja Star"],
      innate["Disassembly Drone"].EMP,
    ], [], {
      "Strength": 2,
      "Dexterity": 2,
      "Firearms": 2,
      "Acrobatics": 1,
      "Absolute Solver": 3,
      "Against Worker and Solver Drones": 1,
    }, {
      "Passive Perception": 15,
      "Persuasion Resistance": 14,
      "Intimidation Resistance": 16,
    }, "If Blood or Oil has been spilled during combat, increase Persuasion & Intimidation resistance to 18."),
  },
  "Non-Canon Species": {
    "Avian Drone": new Enemy(14, [
      innate["Avian Drone"].Wings,
      innate["Avian Drone"]["Small Claws"],
      innate["Avian Drone"]["Talon Dive"],
      innate["Avian Drone"]["Talon Strike"],
    ], [], {
      "Strength": 2,
      "Flying": 2,
      "Stealth": 2,
    }, {
      "Passive Perception": 16,
    }),
    "Wasp Drone (Worker)": new Enemy(30, [
      innate["Avian Drone"].Wings,
      weapons.Wasp.Stinger,
      weapons.Wasp["Wasp Bite"],
    ], [], {
      "Strength": 4,
      "Agility": 2,
      "Flying": 4,
      "Stealth": 2,
    }, {
      "Passive Perception": 16,
    }, "Hive Mind"),
    "Wasp Drone (Disassembly)": new Enemy(40, [
      innate["Avian Drone"].Wings,
      weapons.Wasp.Stinger,
      weapons.Wasp["Wasp Bite"],
      innate["Disassembly Drone"].Claws,
      innate["Disassembly Drone"].Sword,
      innate["Disassembly Drone"].Chainsaw,
      innate["Disassembly Drone"].SMG,
      innate["Disassembly Drone"].Laser,
      innate["Disassembly Drone"].Missile,
      innate["Disassembly Drone"]["Ninja Star"],
      innate["Disassembly Drone"].EMP,
    ], [], {
      "Strength": 4,
      "Agility": 2,
      "Flying": 4,
      "Stealth": 2,
    }, {
      "Passive Perception": 16,
    }, "Hive Mind"),
  },
  "Sentinel": {
    "Sentinel": new Enemy(24, [weapons.Sentinel["Sentinel Flash"], weapons.Sentinel["Sentinel Bite"]], [], {
      "Strength": 2,
      "Technology": 4,
      "Stealth": -1,
      "Acrobatics": 2,
      "All Drones": 2,
    }, {
      "Passive Perception": 12,
      "Persuasion Resistance": 18,
      "Intimidation Resistance": 99,
    }),
  },
  "Unique": {
    // "name": new Enemy(14, [weapons.Melee.Knife], [
    //     weapons.Ranged.Pistol,
    //     weapons.Ranged.Revolver,
    // ], {
    //     "Strength": 1,
    //     "Firearms": 3,
    // }, {
    //     "Passive Perception": 14,
    //     "Persuasion Resistance": 16,
    //     "Intimidation Resistance": 16,
    // }),
    // "name": new Enemy(14, [weapons.Melee.Knife], [
    //     weapons.Ranged.Pistol,
    //     weapons.Ranged.Revolver,
    // ], {
    //     "Strength": 1,
    //     "Firearms": 3,
    // }, {
    //     "Passive Perception": 14,
    //     "Persuasion Resistance": 16,
    //     "Intimidation Resistance": 16,
    // }),
    // "name": new Enemy(14, [weapons.Melee.Knife], [
    //     weapons.Ranged.Pistol,
    //     weapons.Ranged.Revolver,
    // ], {
    //     "Strength": 1,
    //     "Firearms": 3,
    // }, {
    //     "Passive Perception": 14,
    //     "Persuasion Resistance": 16,
    //     "Intimidation Resistance": 16,
    // }),
  },
}