import { getBaseMaxWeight, type Character } from "./character.svelte"

export class Item {
  type = "item"
  id: string
  name: string = $state("")
  _weight: number | null = $state(null)
  rarity: number

  get weight() {
    return this._weight;
  }

  constructor(name: string, weight: number | null, rarity?: number, id?: string) {
    this.id = id ?? crypto.randomUUID()
    this.name = name;
    this._weight = weight;
    this.rarity = rarity ?? 0;
  }

  clone() {
    return new Item(this.name, this._weight, this.rarity);
  }

  serialize() {
    return {
      type: "item",
      id: this.id,
      name: this.name,
      weight: this._weight,
      rarity: this.rarity,
    }
  }

  static deserialize(c: any) {
    if (!c) return null;
    return new Item(c.name, c.weight, c.rarity, c.id);
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
        case "liquid":
          return LiquidContainer.deserialize(c);
      }
      return Item.deserialize(c);
    }) as Item[];
  }

  toString() {
    return this.name;
  }

  toStringWeight() {
    const weight = this._weight ? `[${this.weight}kg]` : '';
    return this.name + ' ' + weight;
  }
}

export class MeleeWeapon extends Item {
  type = "melee"
  damage: string;
  info: string | null;
  twoHanded: boolean;

  constructor(name: string, weight: number | null, rarity: number, damage: string, info: string | null, twoHanded?: boolean, id?: string) {
    super(name, weight, rarity, id);
    this.damage = damage;
    this.info = info ?? null;
    this.twoHanded = twoHanded ?? false;
  }

  clone() {
    return new MeleeWeapon(this.name, this._weight, this.rarity, this.damage, this.info, this.twoHanded);
  }

  serialize() {
    return {
      type: "melee",
      id: this.id,
      name: this.name,
      weight: this._weight,
      rarity: this.rarity,
      damage: this.damage,
      info: this.info,
      twoHanded: this.twoHanded,
    }
  }

  static deserialize(c: any) {
    return new MeleeWeapon(c.name, c.weight, c.rarity, c.damage, c.info, c.twoHanded, c.id);
  }
}

export class LiquidContainer extends Item {
  type = "liquid"
  current: number = $state(0);
  capacity: number;
  weightPerUnit: number;

  constructor(name: string, weight: number | null, rarity: number, capacity: number, weightPerUnit: number, current?: number, id?: string) {
    super(name, weight, rarity, id);
    this.current = current ?? capacity;
    this.capacity = capacity;
    this.weightPerUnit = weightPerUnit;
  }

  override get weight() {
    return parseFloat(((this._weight ?? 0) + (this.current * this.weightPerUnit)).toFixed(2));
  }

  clone() {
    return new LiquidContainer(this.name, this._weight, this.rarity, this.capacity, this.weightPerUnit, this.current);
  }

  serialize() {
    return {
      type: "liquid",
      id: this.id,
      name: this.name,
      weight: this._weight,
      rarity: this.rarity,
      capacity: this.capacity,
      weightPerUnit: this.weightPerUnit,
      current: this.current,
    }
  }

  static deserialize(c: any) {
    return new LiquidContainer(c.name, c.weight, c.rarity, c.capacity, c.weightPerUnit, c.current, c.id);
  }
}

export class RangedWeapon extends Item {
  type = "ranged"
  hit = "Firearms";
  damage: string;
  range: number;
  rate: number;
  ammo: AmmoItem | null;
  info: string | null;

  constructor(name: string, weight: number | null, rarity: number, hit: string, damage: string, range: number, rate: number, info: string | null, id?: string) {
    super(name, weight, rarity, id);
    this.hit = hit ?? "Firearms";
    this.damage = damage ?? "1 Pierce";
    this.range = range ?? 10;
    this.rate = rate ?? 1;
    this.ammo = null;
    this.info = info ?? null;
  }

  static loaded(name: string, weight: number | null, rarity: number, hit: string, damage: string, range: number, rate: number, capacity: number, reloadTurns: number, info: string | null, id?: string) {
    const weapon = new RangedWeapon(name, weight, rarity, hit, damage, range, rate, info, id);
    weapon.ammo = new AmmoItem(`${name} Ammo`, 0.5, 0, capacity, capacity, reloadTurns);
    return weapon;
  }

  clone() {
    const weapon = new RangedWeapon(this.name, this._weight, this.rarity, this.hit, this.damage, this.range, this.rate, this.info);
    weapon.ammo = this.ammo;
    return weapon;
  }

  serialize() {
    return {
      type: "ranged",
      id: this.id,
      name: this.name,
      weight: this._weight,
      rarity: this.rarity,
      hit: this.hit,
      damage: this.damage,
      ammo: this.ammo?.serialize() ?? null,
      range: this.range,
      rate: this.rate,
      info: this.info,
    }
  }

  static deserialize(c: any) {
    const wpn = new RangedWeapon(c.name, c.weight, c.rarity, c.hit, c.damage, c.range, c.rate, c.info, c.id);
    wpn.ammo = AmmoItem.deserialize(c.ammo);
    return wpn;
  }
}

export type Ammo = {
}

export class AmmoItem extends Item {
  type = "ammo"
  current: number = $state(0);
  capacity: number;
  reloadTurns: number;

  constructor(name: string, weight: number | null, rarity: number, current: number, capacity: number, reloadTurns: number, id?: string) {
    super(name, weight, rarity, id);
    this.current = current
    this.capacity = capacity
    this.reloadTurns = reloadTurns
  }

  clone() {
    return new AmmoItem(this.name, this._weight, this.rarity, this.current, this.capacity, this.reloadTurns);
  }

  serialize() {
    return {
      type: "ammo",
      id: this.id,
      name: this.name,
      weight: this._weight,
      rarity: this.rarity,
      current: this.current,
      capacity: this.capacity,
      reloadTurns: this.reloadTurns,
    }
  }

  static deserialize(c: any) {
    if (!c) return null;
    return new AmmoItem(c.name, c.weight, c.rarity, c.current, c.capacity, c.reloadTurns, c.id);
  }
}

export type EquipOn = "hand" | "shoulder" | "front" | "back";

export class Healing extends Item {
  type = "heal";
  worksOn: "Humans" | "Drones" | "Both";
  heal: string;
  revive: string | null;
  requirements: string | null;

  constructor(name: string, weight: number | null, rarity: number, worksOn: "Humans" | "Drones" | "Both", heal: string, revive: string | null, requirements: string | null, id?: string) {
    super(name, weight, rarity, id);
    this.worksOn = worksOn;
    this.heal = heal;
    this.revive = revive;
    this.requirements = requirements;
  }

  clone() {
    return new Healing(this.name, this._weight, this.rarity, this.worksOn, this.heal, this.revive, this.requirements);
  }

  serialize() {
    return {
      type: "heal",
      id: this.id,
      name: this.name,
      weight: this._weight,
      rarity: this.rarity,
      worksOn: this.worksOn,
      heal: this.heal,
      revive: this.revive,
      requirements: this.requirements,
    }
  }

  static deserialize(c: any) {
    return new Healing(c.name, c.weight, c.rarity, c.worksOn, c.heal, c.revive, c.requirements, c.id);
  }

}
export class Container {
  type = "container"
  id: string
  name: string
  carry: number | null = $state(null);
  equipOn: EquipOn[] = [];
  maxItems: number | null = null;
  rarity: number;
  twoHanded: boolean

  inventory: Item[] = $state([]);

  constructor(name: string, carry: number | null, rarity: number, items?: Item[], id?: string, equipOn?: EquipOn[], maxItems?: number | null, twoHanded?: boolean) {
    this.id = id ?? crypto.randomUUID()
    this.name = name;
    this.carry = carry;
    if (items)
      this.inventory = items
    this.equipOn = equipOn ?? [];
    this.rarity = rarity ?? 0;
    this.maxItems = maxItems ?? null;
    this.twoHanded = twoHanded ?? false;
  }

  clone() {
    return new Container(this.name, this.carry, this.rarity, this.inventory, this.id, this.equipOn, this.maxItems, this.twoHanded);
  }

  addOne(item: Item) {
    if (!this.maxItems || this.inventory.length < this.maxItems) {
      this.inventory.push(item);
    }
  }

  add(list: Item[]) {
    list.forEach((item) => {
      this.inventory.push(item)
    })
    return this;
  }

  get weight() {
    const value = this.inventory.reduce((totalWeight, item) => totalWeight + (item._weight ?? 0), 0)
    return parseFloat(value.toFixed(2))
  }

  static serializeList(containers: Container[]) {
    return containers.map(c => ({
      id: c.id,
      name: c.name,
      carry: c.carry,
      rarity: c.rarity,
      equipOn: c.equipOn,
      inventory: Item.serializeList(c.inventory),
      maxItems: c.maxItems,
      twoHanded: c.twoHanded
    }))
  }

  static deserialize(c: any) {
    return new Container(
      c.name,
      c.carry,
      c.rarity,
      Item.deserializeList(c.inventory),
      c.id,
      c.equipOn,
      c.maxItems,
      c.twoHanded,
    )
  }

  static deserializeList(list: any[]) {
    return list.map(c => Container.deserialize(c));
  }

  toString() {
    return `${this.name}` + (this.carry ? ` [${this.weight}/${this.carry}kg]` : '')
  }

  toStringWeight() {
    return `${this.name}` + (this.carry ? ` [${this.carry}kg]` : '')
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

export const pockets = (character: Character) => new Container("Pockets", getBaseMaxWeight(character), 0);