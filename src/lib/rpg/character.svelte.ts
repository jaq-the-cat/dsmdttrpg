import { db, objectToOrdered, orderedToObject, orderedToSvelte, svelteToOrdered, type OrderedMap } from "$lib/db";
import { SvelteMap } from "svelte/reactivity";
import { Container, pockets } from "./items.svelte";
import { doc, setDoc, type Firestore } from "firebase/firestore";
import { ItemList } from "./itemList.svelte";
import type { About, Attribute, Bars, Proficiencies, Stats } from "./attributes.svelte";

export enum Species {
  Human = "Human",
  Avian = "Avian Drone",
  Disassembly = "Disassembly Drone",
  Solver = "Solver Drone",
  Worker = "Worker Drone",
}

export class Character {
  firestore?: Firestore
  id: string | undefined = $state(undefined);

  async upload(field: string, value: string | number | SvelteMap<string, any> | Attribute | Container[] | null) {
    if (!this.id || !db.firestore) return;
    let data
    if (value == null || typeof value !== 'object') {
      data = { [field]: value }
    } else if (Array.isArray(value)) {
      data = { [field]: Container.serializeList(value) }
    } else if (value instanceof SvelteMap) {
      data = { [field]: svelteToOrdered(value) }
    } else {
      data = { [field]: objectToOrdered(value) }
    }
    setDoc(doc(db.firestore, "sheets", this.id), data, { merge: true });
  }

  async uploadMultiple(data: { [field: string]: string | number | boolean | SvelteMap<string, any> | object | any[] | null }) {
    if (!this.id || !db.firestore) return;
    for (const key in data) {
      const el = data[key]
      if (el && typeof el === 'object') {
        if (Array.isArray(el))
          data[key] = Container.serializeList(el)
        else if (el instanceof SvelteMap)
          data[key] = svelteToOrdered(el)
        else
          data[key] = objectToOrdered(el)
      }
    }
    setDoc(doc(db.firestore, "sheets", this.id), data, { merge: true });
  }

  checkItemWasRemoved(itemId: string) {
    if (!this.id || !db.firestore) return;

    let data: { [key: string]: null } = {}
    if (this.left === itemId) {
      data.left = null;
    }
    if (this.leftShoulder === itemId) {
      data.leftShoulder = null;
    }
    if (this.right === itemId) {
      data.right = null;
    }
    if (this.rightShoulder === itemId) {
      data.rightShoulder = null;
    }
    if (this.front === itemId) {
      data.front = null;
    }
    if (this.back === itemId) {
      data.back = null;
    }
    return data;
  }

  overrides: { [key: string]: number | string | null } = {
    maxHp: null,
  }

  currentHp = $state(0);

  species = $state(Species.Worker);

  about: About = $state({
    "Name": "",
    "Height": "",
    "Weight": "",
    "Gender": "",
    "Alignment": "",
  });

  biography: string = $state("");
  appearance: string = $state("");
  fna: string = $state("");

  stats: Stats = $state({
    "Vitality": 6,
    "Agility": 6,
    "Strength": 6,
    "Dexterity": 6,
    "Charisma": 6,
    "Perception": 6,
    "Intelligence": 6,
  })

  proficiencies: Proficiencies = {
    "Athletics": " ",
    "Acrobatics": " ",
    "Stealth": " ",
    "Flying": " ",
    "Firearms": " ",
    "Persuasion": " ",
    "Intimidation": " ",
    "Investigation": " ",
    "Knowledge": " ",
    "Technology": " ",
    "Melee": " ",
    "Explosives": " ",
    "Medicine": " ",
    "Mechanics": " ",
    "Willpower": " ",
  }

  hideProficiency(key: string) {
    if (key === "Willpower" && (this.species !== Species.Solver && this.species !== Species.Disassembly)) {
      return true;
    }
    else if (key === "Flying" && (this.species !== Species.Solver && this.species !== Species.Disassembly && this.species !== Species.Avian)) {
      return true;
    }
    return false;
  }

  bars: Bars = $state(getBars(this.species));
  speed = $state(getSpeed(this.species));

  twoHanding = $state(false);
  patched = $state(false);

  containers: Container[] = $state([
    pockets(this)
  ]);

  itemList: ItemList = $state(new ItemList(this.containers))

  left: string | null = $state(null);
  leftShoulder: string | null = $state(null);
  right: string | null = $state(null);
  rightShoulder: string | null = $state(null);
  front: string | null = $state(null);
  back: string | null = $state(null);

  maxWeight = $state(this.getMaxWeight());

  get weight() {
    const value = this.containers.reduce((totalWeight, value) => totalWeight + (value.weight ?? 0), 0);
    return parseFloat(value.toFixed(2));
  }

  getMaxWeight() {
    const value = this.containers.reduce((totalCapacity, value) => totalCapacity + (value.carry ?? 0), 0);
    return parseFloat(value.toFixed(2));
  }

  refresh() {
    this.speed = getSpeed(this.species);
    this.bars = getBars(this.species);
    this.maxWeight = this.getMaxWeight();
  }

  serialize() {
    return {
      overrides: this.overrides,
      currentHp: this.currentHp,

      species: this.species,
      biography: this.biography,
      appearance: this.appearance,
      fna: this.fna,

      about: objectToOrdered(this.about),
      stats: objectToOrdered(this.stats),
      proficiencies: objectToOrdered(this.proficiencies),
      bars: objectToOrdered(this.bars),
      speed: svelteToOrdered(this.speed),

      left: this.left,
      leftShoulder: this.leftShoulder,
      right: this.right,
      rightShoulder: this.rightShoulder,
      back: this.back,
      front: this.front,

      patched: this.patched,
      twoHanding: this.twoHanding,
      containers: Container.serializeList(this.containers),
    }
  }

  static deserialize(doc: any) {
    if (doc == null) return doc;
    const char = new Character();
    if (doc.id) char.id = doc.id;

    char.overrides = {
      maxHp: doc.overrides?.maxHp ?? null
    };
    char.currentHp = doc.currentHp ?? 0;

    char.species = doc.species ?? Species.Worker;
    char.biography = doc.biography ?? "";
    char.appearance = doc.appearance ?? "";
    char.fna = doc.fna ?? "";
    char.about = orderedToObject(doc.about ?? []);
    char.stats = orderedToObject(doc.stats ?? []);
    char.proficiencies = orderedToObject(doc.proficiencies ?? {}) as any;
    char.bars = orderedToObject(doc.bars ?? []);
    char.speed = orderedToSvelte(doc.speed ?? []);
    char.containers = Container.deserializeList(doc.containers);

    char.patched = doc.patched ?? false;
    char.twoHanding = doc.twoHanding ?? false;
    char.maxWeight = char.getMaxWeight()
    char.itemList.refresh(char.containers)

    char.left = doc.left ?? null;
    char.right = doc.right ?? null;

    char.leftShoulder = doc.leftShoulder ?? null;
    char.rightShoulder = doc.rightShoulder ?? null;
    char.front = doc.front ?? null;
    char.back = doc.back ?? null;

    return char;
  }
}

export function getSpeed(species: Species) {
  switch (species) {
    case Species.Human:
      return new SvelteMap([
        ["Walk", 5],
        ["Run", 8],
        ["Jump", 2],
        ["Swimming", 2],
      ]);
    case Species.Avian:
      return new SvelteMap([
        ["Walk", 5],
        ["Run", 10],
        ["Jump", 5],
        ["Flight (Hor)", 30],
        ["Flight (Ver)", 15],
      ]);
    case Species.Disassembly:
      return new SvelteMap([
        ["Walk", 5],
        ["Run", 12],
        ["Jump", 5],
        ["Flight (Hor)", 20],
        ["Flight (Ver)", 10],
      ]);
    case Species.Solver:
      return new SvelteMap([
        ["Walk", 5],
        ["Run", 10],
        ["Jump", 2],
        ["Flight (Hor)", 20],
        ["Flight (Ver)", 10],
      ]);
    case Species.Worker:
      return new SvelteMap([
        ["Walk", 5],
        ["Run", 10],
        ["Jump", 2],
      ]);
  }
}

export function getMaxHp(character: Character) {
  if (character.overrides.maxHp) return character.overrides.maxHp as number;
  switch (character.species) {
    case Species.Human:
      return Math.floor(6 + character.stats.Vitality * 1.4)
    case Species.Avian:
    case Species.Worker:
    case Species.Solver:
      return Math.floor(8 + character.stats.Vitality * 1.6)
    case Species.Disassembly:
      return Math.floor(10 + character.stats.Vitality * 2)
  }
}

export function getBars(species: Species): Bars {
  switch (species) {
    case Species.Human:
      return {
        "Blood": 10,
        "Sanity": 10,
      }
    case Species.Avian:
    case Species.Worker:
      return {
        "Fresh Oil": 10,
        "Used Oil": 0,
        "Sanity": 10,
      };
    case Species.Solver:
    case Species.Disassembly:
      return {
        "Used Oil": 9,
        "Absolute Solver": 1,
        "Heat": 0,
      };
  }
}

export function getBaseMaxWeight(character: Character) {
  switch (character.species) {
    case Species.Human:
      return 5 + character.stats.Strength * 2
    case Species.Avian:
    case Species.Worker:
    case Species.Solver:
      return 5 + character.stats.Strength * 3
    case Species.Disassembly:
      return 5 + character.stats.Strength * 4
  }
}

export function getSpeciesModifiers(species: Species) {
  switch (species) {
    case Species.Worker:
      return [
        "-1 Stealth while Visor is turned on. Toggle with an Action. Limits vision to 3m.",
        "+1 Expertises during Character Creation and increase limit from 2 to 3."]
    case Species.Avian:
    case Species.Solver:
      return [
        "-1 Stealth while Visor is turned on. Toggle with an Action. Limits vision to 3m."]
    case Species.Disassembly:
      return [
        "-2 Stealth while Visor and Headbands are turned on. Toggle with an Action. Limits vision to 3m.",
        "+1 to Passive Perception and Investigation rolls due to their headband sensors",
        "+1 to all Melee Damage rolls."]
  }
  return [];

}

export function getProfModifier(value: string) {
  if (value === 'P') return '+2';
  else if (value === 'E') return '+3';
  return '  '
}

export function getProfStat(skill: string) {
  switch (skill) {
    case "Athletics":
      return "VIT"
    case "Acrobatics":
    case "Stealth":
    case "Flying":
      return "AGI"
    case "Firearms":
      return "DEX"
    case "Persuasion":
    case "Intimidation":
      return "CHA"
    case "Investigation":
      return "PER"
    case "Knowledge":
    case "Technology":
      return "INT"
    case "Melee":
      return "STR/DEX"
    case "Explosives":
    case "Medicine":
    case "Mechanics":
      return "INT + DEX"
    case "Willpower":
      return "STR/CHA/INT"
  }
}