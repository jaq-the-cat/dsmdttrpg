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

  static override from(other: Character) {
    const obj = new DisassemblyDrone()
    obj.stats = other.stats;
    for (let k in obj.proficiencies) {
      if (k in other.proficiencies)
        obj.proficiencies[k] = other.proficiencies[k]
    }
    for (let k in obj.bars) {
      if (k in other.bars)
        obj.bars[k] = other.bars[k]
    }
    obj.about = other.about
    obj.biography = other.biography
    obj.appearance = other.appearance
    obj.fna = other.fna

    obj.twoHanding = other.twoHanding
    obj.containers = other.containers
    obj.itemList = other.itemList

    obj.left = other.left
    obj.leftShoulder = other.leftShoulder
    obj.right = other.right
    obj.rightShoulder = other.rightShoulder
    obj.front = other.front
    obj.back = other.back

    return obj
  }

  constructor() {
    super()
  }
}