<script lang="ts">
  import { Character, Species } from "$lib/rpg/infra/character.svelte";
  import Stats from "./Stats.svelte";
  import Proficiencies from "./Proficiencies.svelte";
  import Bars from "./Bars.svelte";
  import Speed from "./Speed.svelte";
  import Equipment from "./Equipment.svelte";
  import About from "./About.svelte";
  import { initializeFromCharacterAndSpecies } from "$lib/rpg/infra/species/from.svelte";
  import RulebookSnippet from "./RulebookSnippet.svelte";

  let { character = $bindable() as Character } = $props();
  let snippetOpen = $state(true);
</script>

<main id="sheet">
  <div id="species">
    <h2>Species</h2>
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
    grid-template-columns: 1fr 1fr 1fr minmax(max-content, 1fr);
    grid-template-rows: min-content 8rem auto;
    grid-template-areas:
      "species speed bars          equipment"
      "about   speed bars          equipment"
      "about   stats proficiencies equipment"
      "about   stats proficiencies equipment";
  }

  @media (max-width: 1720px) {
    main {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(min-content, 5);
      grid-template-areas:
        "species   bars      speed"
        "species   bars      speed"
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
        "equipment";
    }
  }
</style>
