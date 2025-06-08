import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class SolverDrone extends Character {
  species = $state(Species.Solver);

  modifiers = [
    "-1 Stealth while Visor is turned on. Toggle with an Action. Limits vision to 3m.",
  ]

  override bars: Bars = $state({
    "Used Oil": 9,
    "Absolute Solver": 1,
    "Heat": 0,
  });

  override speed: Speed = $state({
    "Walk": 5,
    "Run": 10,
    "Jump": 2,
    "Flying": 20,
  });

  patched = $state(false)

  override getMaxHp() {
    return Math.floor(8 + this.stats.Vitality * 1.6)
  }

  override getBaseMaxWeight() {
    return 5 + this.stats.Strength * 3
  }

  override serializeExtra() {
    return {
      "patched": this.patched
    }
  }

  override deserializeExtra(doc: any) {
    this.patched = doc.patched ?? false;
  }

  static override from(other: Character) {
    const obj = new SolverDrone()
    obj.stats = other.stats;
    for (let [k, v] of Object.entries(obj.proficiencies)) {
      if (k in other.proficiencies)
        obj.proficiencies[k] = other.proficiencies[k]
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