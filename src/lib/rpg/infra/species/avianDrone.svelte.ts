import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class AvianDrone extends Character {
  species = $state(Species.Avian);

  modifiers = [
    "-1 Stealth while Visor is turned on. Toggle with an Action. Limits vision to 3m.",
    "+1 Stealth and Flying.",
  ]

  override bars: Bars = $state({
    "Fresh Oil": 10,
    "Used Oil": 0,
    "Sanity": 10,
  });

  override speed: Speed = $state({
    "Walk": 5,
    "Run": 10,
    "Jump": 2,
    "Flying": 30,
  });

  override getMaxHp() {
    return Math.floor(8 + this.stats.Vitality * 1.6)
  }

  override getBaseMaxWeight() {
    return 5 + this.stats.Strength * 3
  }

  static override from(other: Character) {
    const obj = new AvianDrone()
    for (let k in obj.proficiencies) {
      if (k in other.proficiencies)
        obj.proficiencies[k] = other.proficiencies[k]
    }
    for (let k in obj.bars) {
      if (k in other.bars)
        obj.bars[k] = other.bars[k]
    }
    obj.stats = other.stats;
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