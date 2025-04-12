import { orderedToSvelte, svelteToOrdered } from "$lib/db";
import { SvelteMap } from "svelte/reactivity";
import { Container, ddWeapon, pockets } from "./items.svelte";

export enum Species {
    Human = "Human",
    Avian = "Avian Drone",
    Disassembly = "Disassembly Drone",
    Solver = "Solver Drone",
    Worker = "Worker Drone",
}

export class Character {
    id: string | undefined = $state(undefined)

    currentHp = $state(0)

    species = $state(Species.Worker)

    about = new SvelteMap([
        ["Name", "",],
        ["Height", ""],
        ["Weight", "",],
        ["Gender", "",],
        ["Alignment", ""],
    ])

    biography: string = $state("")
    fna: string = $state("")

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

    bars = $state(getBars(this.species))
    speed = $state(getSpeed(this.species))

    containers: Container[] = $state(initializeSpeciesInventory(this.species))

    left: string | null = $state(null)
    right: string | null = $state(null)
    front: string | null = $state(null)
    back: string | null = $state(null)

    weight = $state(this.getWeight())
    maxWeight = $state(this.getMaxWeight())

    getWeight() {
        const value = this.containers.reduce((totalWeight, value) => totalWeight + (value.weight ?? 0), 0);
        return parseFloat(value.toFixed(2));
    }

    getMaxWeight() {
        const value = getBaseMaxWeight(this) + this.containers.reduce((totalCapacity, value) => totalCapacity + (value.carry ?? 0), 0);
        return parseFloat(value.toFixed(2));
    }

    refresh() {
        this.speed = getSpeed(this.species);
        this.bars = getBars(this.species);
        this.weight = this.getWeight();
        this.maxWeight = this.getMaxWeight();
        this.containers = initializeSpeciesInventory(this.species);
    }

    serialize() {
        return {
            currentHp: this.currentHp,
            species: this.species,
            biography: this.biography,
            fna: this.fna,

            about: svelteToOrdered(this.about),
            stats: svelteToOrdered(this.stats),
            proficiencies: svelteToOrdered(this.proficiencies),
            bars: svelteToOrdered(this.bars),
            speed: svelteToOrdered(this.speed),

            left: this.left,
            right: this.right,
            back: this.back,
            front: this.front,

            containers: Container.serializeList(this.containers),

            weight: this.weight,
        }
    }

    static deserialize(doc: any) {
        if (!doc) return
        const char = new Character();
        char.currentHp = doc.currentHp;
        char.species = doc.species;
        char.biography = doc.biography;
        char.fna = doc.fna;
        char.about = orderedToSvelte(doc.about ?? []);
        char.stats = orderedToSvelte(doc.stats ?? []);
        char.proficiencies = orderedToSvelte(doc.proficiencies ?? []);
        char.bars = orderedToSvelte(doc.bars ?? []);
        char.speed = orderedToSvelte(doc.speed ?? []);
        char.containers = Container.deserializeList(doc.containers);
        char.left = doc.left;
        char.right = doc.right;
        char.front = doc.front;
        char.back = doc.back;
        char.weight = doc.weight;
        return char;
    }
}


export function excludeIntangible(name: string) {
    return (name !== "Pockets" && name !== "Right Hand" && name !== "Left Hand");
}

export function initializeSpeciesInventory(species: Species) {
    switch (species) {
        case Species.Disassembly:
            return [
                pockets().add([
                    ddWeapon('Claws'),
                    ddWeapon('MP5'),
                    ddWeapon('Laser'),
                    ddWeapon('Missile'),
                    ddWeapon('Ninja Stars'),
                    ddWeapon('EMP'),
                ]),
            ]
        case Species.Solver:
            return [
                pockets(),
            ]
        default:
            return [
                pockets(),
            ]
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