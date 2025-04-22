
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