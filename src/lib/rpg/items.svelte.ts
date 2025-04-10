export class Item {
    name: string
    weight?: number

    constructor(name: string, weight?: number) {
        this.name = name;
        this.weight = weight;
    }

    static serializeList(items: Item[]) {
        return items.map(item => ({
            name: item.name,
            weight: item.weight
        }))
    }

    static deserializeList(list: any[]) {
        return list.map(c => new Item(
            c.name, c.weight,
        ))
    }
}

export class Container {
    name: string
    carry?: number;
    inventory: Item[] = $state([]);

    constructor(name: string, carry?: number, items?: Item[]) {
        this.name = name;
        this.carry = carry;
        if (items)
            this.inventory = items
    }

    add(list: Item[]) {
        list.forEach((item) => {
            this.inventory.push(item)
        })
        return this;
    }

    get weight() {
        return this.inventory.reduce((totalWeight, item) => totalWeight + (item.weight ?? 0), 0)
    }

    static serializeList(containers: Container[]) {
        return containers.map(c => ({
            name: c.name,
            carry: c.carry,
            inventory: Item.serializeList(c.inventory)
        }))
    }

    static deserializeList(list: any[]) {
        return list.map(c => new Container(
            c.name,
            c.carry,
            Item.deserializeList(c.inventory)
        ))
    }
}

export const ddWeapon = (name: string) => new Item(name, undefined);

export const hand = (name?: string) => new Container(name ?? "Hand", undefined);
export const pockets = (name?: string) => new Container(name ?? "Pockets", 5);
export const shopping = (name?: string) => new Container(name ?? "Shopping Bag", 4);
export const fanny = (name?: string) => new Container(name ?? "Fanny Pack", 6);
export const purse = (name?: string) => new Container(name ?? "Purse", 8);
export const suit = (name?: string) => new Container(name ?? "Suitcase", 10);
export const satchel = (name?: string) => new Container(name ?? "Satchel", 20);
export const backpack = (name?: string) => new Container(name ?? "Backpack", 30);
export const hiking = (name?: string) => new Container(name ?? "Hiking Bag", 40);
export const cart = (name?: string) => new Container(name ?? "Shopping Cart", 100);