import { orderedToSvelte, svelteToOrdered } from "$lib/db";
import { SvelteMap } from "svelte/reactivity";
import { Container, EquipOn, hand, pockets } from "./items.svelte";

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

    left = $state(0)
    right = $state(0)
    front = $state(0)
    back = $state(0)
    // inventory: string = $state("Hands")
    // inventoryList = $derived(this.inventory.replaceAll(", ", ",").split(","))

    weight = $state(this.getWeight())
    maxWeight = $state(this.getMaxWeight())

    getWeight() {
        return this.containers.reduce((totalWeight, value) => totalWeight + (value.weight ?? 0), 0)
    }

    getMaxWeight() {
        return getBaseMaxWeight(this) + this.containers.reduce((totalCapacity, value) => totalCapacity + (value.carry ?? 0), 0)
    }

    constructor() {
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
            fna: this.fna,

            about: svelteToOrdered(this.about),
            stats: svelteToOrdered(this.stats),
            proficiencies: svelteToOrdered(this.proficiencies),
            bars: svelteToOrdered(this.bars),
            speed: svelteToOrdered(this.speed),

            // pockets: this.pockets,
            left: this.left,
            right: this.right,
            back: this.back,

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
        // char.pockets = doc.pockets;
        char.left = doc.left;
        char.right = doc.right;
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
                hand("Left Hand"),
                hand("Right Hand"),
                pockets(),
            ]
        case Species.Solver:
            return [
                hand("Left Hand"),
                hand("Right Hand"),
                hand("Tail"),
                pockets(),
            ]
        default:
            return [
                hand("Left Hand"),
                hand("Right Hand"),
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