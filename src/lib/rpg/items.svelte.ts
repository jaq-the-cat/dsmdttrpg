export class Item {
    id: string
    name: string = $state("")
    weight: number | null

    constructor(name: string, weight: number | null, id?: string) {
        this.id = id ?? crypto.randomUUID()
        this.name = name;
        this.weight = weight;
    }

    static serializeList(items: Item[]) {
        return items.map(item => ({
            id: item.id,
            name: item.name,
            weight: item.weight
        }))
    }

    static deserializeList(list: any[]) {
        return list.map(c => new Item(
            c.name, c.weight, c.id,
        ))
    }

    toString() {
        return this.name;
    }
}

export class Container {
    id: string
    name: string
    carry: number | null;
    inventory: Item[] = $state([]);

    constructor(name: string, carry: number | null, items?: Item[], id?: string) {
        this.id = id ?? crypto.randomUUID()
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
        const value = this.inventory.reduce((totalWeight, item) => totalWeight + (item.weight ?? 0), 0)
        return parseFloat(value.toFixed(2))
    }

    static serializeList(containers: Container[]) {
        return containers.map(c => ({
            id: c.id,
            name: c.name,
            carry: c.carry,
            inventory: Item.serializeList(c.inventory)
        }))
    }

    static deserializeList(list: any[]) {
        return list.map(c => new Container(
            c.name,
            c.carry,
            Item.deserializeList(c.inventory),
            c.id,
        ))
    }

    toString() {
        return `${this.name}` + (this.carry ? ` (${this.weight}/${this.carry}kg)` : '')
    }
}

export const ddWeapon = (name: string) => new Item(name, null);

export const hand = (name?: string) => new Container(name ?? "Hand", null);
export const pockets = (name?: string) => new Container(name ?? "Pockets", null);
export const shopping = (name?: string) => new Container(name ?? "Shopping Bag", 4);
export const fanny = (name?: string) => new Container(name ?? "Fanny Pack", 6);
export const purse = (name?: string) => new Container(name ?? "Purse", 8);
export const suit = (name?: string) => new Container(name ?? "Suitcase", 10);
export const satchel = (name?: string) => new Container(name ?? "Satchel", 20);
export const backpack = (name?: string) => new Container(name ?? "Backpack", 30);
export const hiking = (name?: string) => new Container(name ?? "Hiking Bag", 40);
export const cart = (name?: string) => new Container(name ?? "Shopping Cart", 100);