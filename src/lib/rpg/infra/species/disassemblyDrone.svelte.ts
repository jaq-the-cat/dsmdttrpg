import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class DisassemblyDrone extends Character {
  species = $state(Species.Disassembly);

  modifiers = [
    "-2 Stealth while Visor and Sensors are turned on. Toggle with an Action. Limits vision to 3m.",
    "+2 to Passive Perception and Investigation rolls while their headband sensors are turned on.",
    "+1 to all Damage rolls.",
  ]

  override bars: Bars = $state({
    "Used Oil": 9,
    "Absolute Solver": 1,
    "Heat": 0,
  });

  override speed: Speed = $state({
    "Walk": 5,
    "Run": 12,
    "Jump": 2,
    "Flying": 20,
  });

  override getMaxHp() {
    return Math.floor(8 + this.stats.Vitality * 2)
  }

  override getBaseMaxWeight() {
    return 5 + this.stats.Strength * 4
  }

  constructor() {
    super()
  }
}