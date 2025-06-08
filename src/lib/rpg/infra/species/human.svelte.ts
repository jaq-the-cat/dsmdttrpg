import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class Human extends Character {
  species = $state(Species.Human);

  modifiers = [
    "+1 Expertises during Character Creation and increase limit from 2 to 3."
  ]

  override bars: Bars = $state({
    "Blood": 10,
    "Sanity": 10,
  });

  override speed: Speed = $state({
    "Walk": 5,
    "Run": 8,
    "Jump": 2,
    "Swim": 2,
  });

  override getMaxHp() {
    return Math.floor(6 + this.stats.Vitality * 1.4)
  }

  override getBaseMaxWeight() {
    return 5 + this.stats.Strength * 2
  }

  static override from(other: Character) {
    const obj = new Human()
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
    delete this.proficiencies.Flying
  }
}