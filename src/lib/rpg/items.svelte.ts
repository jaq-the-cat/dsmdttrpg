import { getBaseMaxWeight, type Character } from "./character.svelte"

export class Item {
  type = "item"
  id: string
  name: string = $state("")
  weight: number | null

  constructor(name: string, weight: number | null, id?: string) {
    this.id = id ?? crypto.randomUUID()
    this.name = name;
    this.weight = weight;
  }

  clone() {
    return new Item(this.name, this.weight, this.id);
  }

  serialize() {
    return {
      type: "item",
      id: this.id,
      name: this.name,
      weight: this.weight,
    }
  }

  static deserialize(c: any) {
    return new Item(c.name, c.weight, c.id);
  }

  static serializeList(items: Item[]) {
    return items.map(item => item.serialize());
  }

  static deserializeList(list: ({ type: string })[]) {
    return list.map(c => {
      switch (c.type) {
        case "melee":
          return MeleeWeapon.deserialize(c);
        case "ranged":
          return RangedWeapon.deserialize(c);
        case "heal":
          return Healing.deserialize(c);
      }
      return Item.deserialize(c);
    });
  }

  toString() {
    return this.name;
  }

  toStringWeight() {
    const weight = this.weight ? `(${this.weight}kg)` : '';
    return this.name + ' ' + weight;
  }
}

export class MeleeWeapon extends Item {
  type = "melee"
  damage: string;
  info: string | null;

  constructor(name: string, weight: number | null, damage: string, info: string | null, id?: string) {
    super(name, weight, id);
    this.damage = damage;
    this.info = info ?? null;
  }

  clone() {
    return new MeleeWeapon(this.name, this.weight, this.damage, this.info, this.id);
  }

  serialize() {
    return {
      type: "melee",
      id: this.id,
      name: this.name,
      weight: this.weight,
      damage: this.damage,
      info: this.info,
    }
  }

  static deserialize(c: any) {
    return new MeleeWeapon(c.name, c.weight, c.damage, c.info, c.id);
  }
}

export class RangedWeapon extends Item {
  type = "ranged"
  hit = "Firearms";
  damage: string;
  range: number
  rate: number
  capacity: number
  reloadTurns: number
  info: string | null;

  constructor(name: string, weight: number | null, hit: string, damage: string, range: number, rate: number, capacity: number, reloadTurns: number, info: string | null, id?: string) {
    super(name, weight, id);
    this.hit = hit ?? "Firearms";
    this.damage = damage ?? "1 Pierce";
    this.range = range ?? 10;
    this.rate = rate ?? 1;
    this.capacity = capacity ?? 6;
    this.reloadTurns = reloadTurns ?? 1;
    this.info = info ?? null;
  }

  clone() {
    return new RangedWeapon(this.name, this.weight, this.hit, this.damage, this.range, this.rate, this.capacity, this.reloadTurns, this.info);
  }

  serialize() {
    return {
      type: "ranged",
      id: this.id,
      name: this.name,
      weight: this.weight,
      hit: this.hit,
      damage: this.damage,
      range: this.range,
      rate: this.rate,
      capacity: this.capacity,
      reloadTurns: this.reloadTurns,
      info: this.info,
    }
  }

  static deserialize(c: any) {
    return new RangedWeapon(c.name, c.weight, c.hit, c.damage, c.range, c.rate, c.capacity, c.reloadTurns, c.info, c.id);
  }
}

export type EquipOn = "hand" | "shoulder" | "front" | "back";

export class Healing extends Item {
  type = "heal";
  worksOn: "Humans" | "Drones" | "Both";
  heal: string;
  revive: string | null;
  requirements: string | null;

  constructor(name: string, weight: number | null, worksOn: "Humans" | "Drones" | "Both", heal: string, revive: string | null, requirements: string | null, id?: string) {
    super(name, weight, id);
    this.worksOn = worksOn;
    this.heal = heal;
    this.revive = revive;
    this.requirements = requirements;
  }

  clone() {
    return new Healing(this.name, this.weight, this.worksOn, this.heal, this.revive, this.requirements);
  }

  serialize() {
    return {
      type: "heal",
      id: this.id,
      name: this.name,
      weight: this.weight,
      worksOn: this.worksOn,
      heal: this.heal,
      revive: this.revive,
      requirements: this.requirements,
    }
  }

  static deserialize(c: any) {
    return new Healing(c.name, c.weight, c.worksOn, c.heal, c.revive, c.requirements, c.id);
  }

}
export class Container {
  id: string
  name: string
  carry: number | null = $state(null);
  equipOn: EquipOn[] = [];

  inventory: Item[] = $state([]);

  constructor(name: string, carry: number | null, items?: Item[], id?: string, equipOn?: EquipOn[]) {
    this.id = id ?? crypto.randomUUID()
    this.name = name;
    this.carry = carry;
    if (items)
      this.inventory = items
    this.equipOn = equipOn ?? [];
  }

  clone() {
    return new Container(this.name, this.carry, this.inventory, this.id, this.equipOn);
  }

  add(list: Item[]) {
    list.forEach((item) => {
      this.inventory.push(item)
    })
    return this;
  }

  get weight() {
    const value = this.inventory.reduce((totalWeight, item) => totalWeight + (item.weight ?? 0), 0)
    return parseFloat(value.toFixed(2))
  }

  static serializeList(containers: Container[]) {
    return containers.map(c => ({
      id: c.id,
      name: c.name,
      carry: c.carry,
      equipOn: c.equipOn,
      inventory: Item.serializeList(c.inventory)
    }))
  }

  static deserializeList(list: any[]) {
    return list.map(c => new Container(
      c.name,
      c.carry,
      Item.deserializeList(c.inventory),
      c.id,
      c.equipOn,
    ))
  }

  toString() {
    return `${this.name}` + (this.carry ? ` (${this.weight}/${this.carry}kg)` : '')
  }

  toStringWeight() {
    return `${this.name}` + (this.carry ? ` (${this.carry}kg)` : '')
  }
}

export function allowedInSlot(item: Item | Container, slotName: string) {
  if (!('equipOn' in item) || !item.equipOn)
    return slotName === 'left' || slotName === 'right';
  switch (slotName) {
    case "left":
    case "right":
      return item.equipOn.includes("hand");
    case "leftShoulder":
    case "rightShoulder":
      return item.equipOn.includes("shoulder");
    case "front":
      return item.equipOn.includes("front");
    case "back":
      return item.equipOn.includes("back");
  }
  return true;
}

export const ddWeapon = (name: string) => new Item(name, null);

export const pockets = (character: Character) => new Container("Pockets", getBaseMaxWeight(character));