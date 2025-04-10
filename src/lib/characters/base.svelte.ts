import { SvelteMap } from "svelte/reactivity";

export enum Species {
    Human = "Human",
    Avian = "Avian Drone",
    Disassembly = "Disassembly Drone",
    Solver = "Solver Drone",
    Worker = "Worker Drone",
}

export class Character {
    currentHp = 0

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

    stats = new SvelteMap([
        ["Vitality", 6],
        ["Agility", 6],
        ["Strength", 6],
        ["Dexterity", 6,],
        ["Charisma", 6],
        ["Perception", 6,],
        ["Intelligence", 6],
    ]);

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

    left: string = ""
    right: string = ""
    inventory: string = $state("Hands, Hands, fill")
    inventoryList = $derived(this.inventory.replaceAll(", ", ",").split(","))

    weight = $state(0)
    maxWeight = $state(0)

    constructor() {
    }

    refresh() {
        this.speed = getSpeed(this.species);
        this.bars = getBars(this.species);
        this.maxWeight = getBaseMaxWeight(this)
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
            return 5 + character.stats.get('Strength')! * 3
        case Species.Avian:
        case Species.Worker:
        case Species.Solver:
            return 5 + character.stats.get('Strength')! * 4
        case Species.Disassembly:
            return 5 + character.stats.get('Strength')! * 5
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