import { Species } from "./character.svelte"

type SpeciesDescription = {
  stats: { [key: string]: string }
  description?: [string, string?]
  special?: string
  resistances?: string
  vulnerabilities?: string
}

export const rulebook = [
  ["Attributes", ""],
]

export const species: { [key: string]: SpeciesDescription } = {
  [Species.Human]: {
    resistances: "Pierce and Energy",
    stats: {
      "HP": "2 + Vitality * 2",
      "Blood": "10",
      "Sanity": "10",
    },
  },
  [Species.Worker]: {
    stats: {
      "HP": "4 + Vitality * 2",
      "Fresh Oil": "10",
      "Used Oil": "10",
      "Sanity": "10",
    },
    resistances: "Strike",
    vulnerabilities: "Energy",
  },
  [Species.Solver]: {
    stats: {
      "HP": "4 + Vitality * 2",
      "Absolute Solver": "10",
      "Used Oil": "10 - Absolute Solver",
      "Heat": "10",
    },
    resistances: "Strike",
    vulnerabilities: "Energy",
  },
  [Species.Disassembly]: {
    special: "-2 Stealth while Visor and Sensors are turned on. Toggle with an Action." +
      "+ 1 to Passive Perception and Investigation rolls due to their headband sensors " +
      "and a +1 to all Damage rolls.",
    stats: {
      "HP": "4 + Vitality * 2",
      "Absolute Solver": "10",
      "Used Oil": "10 - Absolute Solver",
      "Heat": "10",
    },
    resistances: "Strike",
    vulnerabilities: "Energy",
  },
  [Species.Avian]: {
    description: ["Winged Drones made by JCJenson as long-distance messengers and light-load" +
      "carriers when radio and internet are unavailable or otherwise unable to be used. They" +
      " are about as tall as Disassembly Drones with retractable feathered wings coming from " +
      "their arms. Although usually pacifists, Avian Drones are far from defenseless, being " +
      "equipped with claws on their hands and dangerous talons on their feet, and will attack " +
      "if threatened or provoked.", "Design by weebie"],
    special: "+1 Stealth and Flying",
    stats: {
      "HP": "4 + Vitality * 2",
      "Fresh Oil": "10",
      "Used Oil": "10",
      "Sanity": "10",
    },
    resistances: "Strike",
    vulnerabilities: "Energy",
  },
}