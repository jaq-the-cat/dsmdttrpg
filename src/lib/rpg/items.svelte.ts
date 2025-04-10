export enum EquipOn {
    Hand = "Hand", Hands = "Hands", Front = "Front", Back = "Back", Pockets = "Pockets"
}

export class Item {
    name: string
    weight: number

    constructor(name: string, weight: number) {
        this.name = name;
        this.weight = weight;
    }
}

export class Container {
    name: string
    equip: EquipOn;
    carry?: number;
    inventoryText: string = $state("");
    inventory: Item[];

    constructor(name: string, carry?: number, equip: EquipOn = EquipOn.Back) {
        this.name = name;
        this.carry = carry;
        this.equip = equip;
        this.inventory = []
    }

    refreshInventory() {
        this.inventory = []
        this.inventoryText.split(", ").forEach((name) => {
            const match = name.match(/\d*\.?\d+kg$/);
            if (match) {
                const weight = Number.parseFloat(match[0].match(/\d*\.?\d+/)![0])
                this.inventory.push(new Item(name, weight))
            }
        })
    }

    get weight() {
        return this.inventory.reduce((totalWeight, item) => totalWeight + item.weight, 0)
    }
}

export const hand = (name?: string) => new Container(name ?? "Hand", undefined, EquipOn.Hand);
export const pockets = (name?: string) => new Container(name ?? "Pockets", 5, EquipOn.Hand);
export const shopping = (name?: string) => new Container("Shopping Bag", 4, EquipOn.Hand)
export const fanny = (name?: string) => new Container("Fanny Pack", 6, EquipOn.Front);
export const purse = (name?: string) => new Container("Purse", 8);
export const suit = (name?: string) => new Container("Suitcase", 10);
export const satchel = (name?: string) => new Container("Satchel", 20);
export const backpack = (name?: string) => new Container("Backpack", 30);
export const hiking = (name?: string) => new Container("Hiking Bag", 40);
export const cart = (name?: string) => new Container("Shopping Cart", 100, EquipOn.Hands);