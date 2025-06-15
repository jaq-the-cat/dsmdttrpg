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
      return Character.trans(new AvianDrone(), character)
    case Species.Disassembly:
      return Character.trans(new DisassemblyDrone(), character)
    case Species.Human:
      return Character.trans(new Human(), character)
    case Species.Solver:
      return Character.trans(new SolverDrone(), character)
    case Species.Worker:
      return Character.trans(new WorkerDrone(), character)
  }
}