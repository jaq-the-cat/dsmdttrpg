export type Attribute = {
    [key: string]: any
}

export type About = { [key: string]: string } & {
    "Name": string,
    "Height": string,
    "Weight": string,
    "Gender": string,
    "Alignment": string,
}

export type HumanBars = {
    "Blood": number,
    "Sanity": number,
}

export type DroneBars = {
    "Fresh Oil": number,
    "Used Oil": number,
    "Sanity": number
}

export type SolverBars = {
    "Used Oil": number,
    "Absolute Solver": number
    "Heat": number
}

export type Bars = {
    [key: string]: number
} & (HumanBars | DroneBars | SolverBars)

export type Stats = {
    [key: string]: number,
    "Vitality": number,
    "Agility": number,
    "Strength": number,
    "Dexterity": number,
    "Charisma": number,
    "Perception": number,
    "Intelligence": number,
}

type Proficiency = " " | "P" | "E"
export type Proficiencies = {
    [key: string]: Proficiency,
    "Athletics": Proficiency,
    "Acrobatics": Proficiency,
    "Stealth": Proficiency,
    "Flying": Proficiency,
    "Firearms": Proficiency,
    "Persuasion": Proficiency,
    "Intimidation": Proficiency,
    "Investigation": Proficiency,
    "Knowledge": Proficiency,
    "Technology": Proficiency,
    "Melee": Proficiency,
    "Explosives": Proficiency,
    "Medicine": Proficiency,
    "Mechanics": Proficiency,
    "Willpower": Proficiency,
}