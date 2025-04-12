import { db, orderedToSvelte, svelteToOrdered, type OrderedMap } from "$lib/db";
import { SvelteMap } from "svelte/reactivity";
import { Container, ddWeapon, Item, pockets } from "./items.svelte";
import { doc, setDoc, type Firestore } from "firebase/firestore";
import { ItemList } from "./itemList.svelte";

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

  async upload(field: string, value: string | number | SvelteMap<string, any> | Container[] | null) {
    if (!this.id || !db.firestore) return;
    let data
    if (value == null || typeof value !== 'object') {
      data = { [field]: value }
    } else if (Array.isArray(value)) {
      data = { [field]: Container.serializeList(value) }
    } else {
      data = { [field]: svelteToOrdered(value) }
    }
    setDoc(doc(db.firestore, "sheets", this.id), data, { merge: true });
  }

  async uploadMultiple(data: { [field: string]: string | number | SvelteMap<string, any> | any[] | null }) {
    if (!this.id || !db.firestore) return;
    for (const key in data) {
      const el = data[key]
      if (el && typeof el === 'object') {
        if (Array.isArray(el))
          data[key] = Container.serializeList(el)
        else
          data[key] = svelteToOrdered(el)
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

  // async uploadRemovedItem() {
  //   if (!this.id || !db.firestore) return;
  //   const data = {
  //     "containers": Container.serializeList(this.containers),
  //     "left": this.left,
  //     "leftShoulder": this.leftShoulder,
  //     "right": this.right,
  //     "rightShoulder": this.rightShoulder,
  //     "front": this.front,
  //     "back": this.back,
  //   }
  //   setDoc(doc(db.firestore, "sheets", this.id), data, { merge: true });
  // }

  currentHp = $state(0);

  species = $state(Species.Worker);

  about = new SvelteMap([
    ["Name", "",],
    ["Height", ""],
    ["Weight", "",],
    ["Gender", "",],
    ["Alignment", ""],
  ]);

  biography: string = $state("");
  appearance: string = $state("");
  fna: string = $state("");

  stats = $state(new SvelteMap([
    ["Vitality", 6],
    ["Agility", 6],
    ["Strength", 6],
    ["Dexterity", 6],
    ["Charisma", 6],
    ["Perception", 6,],
    ["Intelligence", 6],
  ]));

  proficiencies = new SvelteMap([
    ["Athletics", " "],
    ["Acrobatics", " "],
    ["Stealth", " "],
    ["Flying", " "],
    ["Firearms", " "],
    ["Persuasion", " "],
    ["Intimidation", " "],
    ["Investigation", " "],
    ["Knowledge", " "],
    ["Technology", " "],
    ["Melee", " "],
    ["Explosives", " "],
    ["Medicine", " "],
    ["Mechanics", " "],
    ["Willpower", " "],
  ]);

  bars = $state(getBars(this.species));
  speed = $state(getSpeed(this.species));

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

  weight = $state(this.getWeight());
  maxWeight = $state(this.getMaxWeight());

  getWeight() {
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
    this.weight = this.getWeight();
    this.maxWeight = this.getMaxWeight();
  }

  serialize() {
    return {
      currentHp: this.currentHp,
      species: this.species,
      biography: this.biography,
      appearance: this.appearance,
      fna: this.fna,

      about: svelteToOrdered(this.about),
      stats: svelteToOrdered(this.stats),
      proficiencies: svelteToOrdered(this.proficiencies),
      bars: svelteToOrdered(this.bars),
      speed: svelteToOrdered(this.speed),

      left: this.left,
      leftShoulder: this.leftShoulder,
      right: this.right,
      rightShoulder: this.rightShoulder,
      back: this.back,
      front: this.front,

      containers: Container.serializeList(this.containers),
    }
  }

  static deserialize(doc: any) {
    if (!doc) return
    const char = new Character();
    char.currentHp = doc.currentHp ?? 0;
    char.species = doc.species ?? Species.Worker;
    char.biography = doc.biography ?? "";
    char.appearance = doc.appearance ?? "";
    char.fna = doc.fna ?? "";
    char.about = orderedToSvelte(doc.about ?? []);
    char.stats = orderedToSvelte(doc.stats ?? []);
    char.proficiencies = orderedToSvelte(doc.proficiencies ?? []);
    char.bars = orderedToSvelte(doc.bars ?? []);
    char.speed = orderedToSvelte(doc.speed ?? []);
    char.containers = Container.deserializeList(doc.containers);

    char.weight = char.getWeight()
    char.maxWeight = char.getMaxWeight()
    char.itemList.refresh(char.containers)

    char.left = doc.left ?? null;
    char.leftShoulder = doc.leftShoulder ?? null;
    char.right = doc.right ?? null;
    char.rightShoulder = doc.rightShoulder ?? null;
    char.front = doc.front ?? null;
    char.back = doc.back ?? null;
    return char;
  }
}

// export function initializeInventory(character: Character) {
//   if (character.species === Species.Disassembly) {
//     character.containers.at(0)!.add([
//       ddWeapon('Claws'),
//       ddWeapon('MP5'),
//       ddWeapon('Laser'),
//       ddWeapon('Missile'),
//       ddWeapon('Ninja Stars'),
//       ddWeapon('EMP'),

//     ])
//   }
// }

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
    case Species.Worker:
      return new SvelteMap([
        ["Walk", 5],
        ["Run", 10],
        ["Jump", 2],
      ]);
  }
}

export function getBars(species: Species) {
  switch (species) {
    case Species.Human:
      return new SvelteMap([
        ["Blood", 10],
        ["Sanity", 10],
      ]);
    case Species.Avian:
    case Species.Worker:
      return new SvelteMap([
        ["Fresh Oil", 10],
        ["Used Oil", 10],
        ["Sanity", 10],
      ]);
    case Species.Solver:
    case Species.Disassembly:
      return new SvelteMap([
        ["Used Oil", 9],
        ["Absolute Solver", 1],
        ["Heat", 0],
      ]);
  }
}

export function getBaseMaxWeight(character: Character) {
  switch (character.species) {
    case Species.Human:
      return 5 + character.stats.get('Strength')! * 2
    case Species.Avian:
    case Species.Worker:
    case Species.Solver:
      return 5 + character.stats.get('Strength')! * 3
    case Species.Disassembly:
      return 5 + character.stats.get('Strength')! * 4
  }
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