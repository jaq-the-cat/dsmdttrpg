<script lang="ts">
  import { Character, Species } from "$lib/rpg/infra/character.svelte";
  import Stats from "./cards/Stats.svelte";
  import Proficiencies from "./cards/Proficiencies.svelte";
  import Bars from "./cards/Bars.svelte";
  import Speed from "./cards/Speed.svelte";
  import Equipment from "./cards/Equipment.svelte";
  import About from "./cards/About.svelte";
  import { initializeFromCharacterAndSpecies } from "$lib/rpg/infra/species/from.svelte";
  import RulebookSnippet from "./cards/dialogs/RulebookSnippet.svelte";
  import Innate from "./cards/Innate.svelte";
  import { innate } from "$lib/rpg/instances/innate.svelte";
  import SpeciesRb from "../rulebook/snippets/species/species.svelte";

  let { character = $bindable() as Character } = $props();
  let items = $derived(innate[character.species]);

  let speciesRb = $state(false);
</script>

<main id="sheet">
  <div id="species">
    <RulebookSnippet title="Species" bind:open={speciesRb}>
      <SpeciesRb />
    </RulebookSnippet>
    <select
      value={character.species}
      onchange={(ev) => {
        const newCharacter = initializeFromCharacterAndSpecies(
          character,
          ev.currentTarget.value as Species
        );
        character = newCharacter;
        character.uploadMultiple({
          species: character.species,
          proficiencies: character.proficiencies,
          modifiers: character.modifiers,
          bars: character.bars,
          speed: character.speed,
        });
      }}
    >
      {#each Object.values(Species) as species}
        <option value={species}>{species}</option>
      {/each}
    </select>
    {#each character.modifiers as modifText}
      <ul>
        <li>{modifText}</li>
      </ul>
    {/each}
  </div>
  <Stats bind:character />
  <Proficiencies bind:character />
  <Bars bind:character />
  <Speed bind:character />
  <Innate {items} />
  <Equipment bind:character />
  <About bind:character />
</main>

<style lang="scss">
  #species {
    grid-area: species;

    li {
      max-width: 40ch;
    }
  }

  main {
    // grid-template-columns: 1fr 1fr 1fr minmax(max-content, 1fr);
    grid-template-columns: 1fr 1fr 2fr 2fr;
    // grid-template-areas:
    //   "species speed bars          enemyList"
    //   "about   speed bars          equipment"
    //   "about   stats proficiencies equipment"
    //   "about   stats proficiencies equipment";
    grid-template-areas:
      "species species   speed     bars         "
      "about   about     stats     proficiencies"
      "innate  equipment equipment equipment";
  }

  @media (max-width: 1720px) {
    main {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(min-content, 5);
      grid-template-areas:
        "species   bars      speed"
        "species   innate    speed"
        "about     stats     proficiencies"
        "about     stats     proficiencies"
        "equipment equipment equipment";
    }
  }

  @media (max-width: 1300px) {
    main {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: min-content max-content auto;
      grid-template-areas:
        "species   stats"
        "about     stats"
        "about     stats"
        "about     proficiencies"
        "about     proficiencies"
        "bars      speed"
        "innate    speed"
        "equipment equipment";
    }
  }

  @media (max-width: 930px) {
    main {
      grid-template-columns: auto;
      grid-template-rows: auto;
      grid-template-areas:
        "species"
        "about"
        "speed"
        "stats"
        "proficiencies"
        "bars"
        "innate"
        "equipment";
    }
  }
</style>
