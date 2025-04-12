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
      }
      return Item.deserialize(c);
    });
  }

  toString() {
    return this.name;
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

export type RangedHit = "Firearms" | "Technology"

export class RangedWeapon extends Item {
  type = "ranged"
  hit: RangedHit = "Firearms";
  damage: string;
  range: number
  rate: number
  capacity: number
  reloadTurns: number
  info: string | null;

  constructor(name: string, weight: number | null, hit: RangedHit, damage: string, range: number, rate: number, capacity: number, reloadTurns: number, info: string | null, id?: string) {
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

export type EquipOn = "hand" | "shoulder" | "front" | "back"

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
}

export const ddWeapon = (name: string) => new Item(name, null);

export const pockets = (character: Character) => new Container("Pockets", getBaseMaxWeight(character));