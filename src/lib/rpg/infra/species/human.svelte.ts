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

  constructor() {
    super()
    delete this.proficiencies.Flying
  }
}