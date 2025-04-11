import type { Item, Container } from "./items.svelte";

export class ItemList {
    private _list: (Item | Container)[] = $state([])

    refresh(containers: Container[]) {
        this._list = []
        containers.at(0)?.inventory.forEach((item => this._list.push(item)))
        containers.slice(1).forEach((container) => {
            this._list.push(container)
            container.inventory.forEach((item) => {
                this._list.push(item);
            });
        });
    }

    get list() { return this._list };

    push(item: Item | Container) {
        return this._list.push(item)
    }

    remove(index: number) {
        this._list.splice(index, 1);
    }

    findIndex(item: Item | Container) {
        return this._list.findIndex((listItem) => listItem.toString() == item.toString());
    }

    removeElement(item: Item | Container) {
        const index = this.findIndex(item)
        this.remove(index);
        return index;
    }
}