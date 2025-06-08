import { Species, Character } from "../character.svelte"
import { AvianDrone } from "./avianDrone.svelte"
import { DisassemblyDrone } from "./disassemblyDrone.svelte"
import { Human } from "./human.svelte"
import { SolverDrone } from "./solverDrone.svelte"
import { WorkerDrone } from "./workerDrone.svelte"

export function initializeFromSpecies(species: Species): Character {
  switch (species) {
    case Species.Avian:
      return new AvianDrone()
    case Species.Disassembly:
      return new DisassemblyDrone()
    case Species.Human:
      return new Human()
    case Species.Solver:
      return new SolverDrone()
    case Species.Worker:
      return new WorkerDrone()
  }
}
export function initializeFromCharacterAndSpecies(character: Character, species: Species) {
  switch (species) {
    case Species.Avian:
      return AvianDrone.from(character)
    case Species.Disassembly:
      return DisassemblyDrone.from(character)
    case Species.Human:
      return Human.from(character)
    case Species.Solver:
      return SolverDrone.from(character)
    case Species.Worker:
      return WorkerDrone.from(character)
  }
}