<script lang="ts">
  import { Character, getSpeed, Species } from "$lib/characters/base.svelte";
  import { setContext } from "svelte";
  import Stats from "../components/Stats.svelte";
  import Bars from "../components/Bars.svelte";
  import Proficiencies from "../components/Proficiencies.svelte";
  import HP from "../components/HP.svelte";
  import Speed from "../components/Speed.svelte";
  import Equipment from "../components/Equipment.svelte";
  import About from "../components/About.svelte";

  let character = $state(new Character());
</script>

<main id="sheet">
  <div id="species">
    <h2>Species</h2>
    <select
      value={character.species}
      onchange={(ev) => {
        character.species = ev.currentTarget.value as Species;
        character.refresh();
      }}
    >
      {#each Object.values(Species) as species}
        <option value={species}>{species}</option>
      {/each}
    </select>
  </div>
  <Stats bind:character />
  <Proficiencies bind:character />
  <HP bind:character />
  <Speed bind:character />
  <Equipment bind:character />
  <About bind:character />
  <header>
    <h1>Murder Drones: Flesh & Oil</h1>
  </header>
  <!-- <Bars bind:character /> -->
</main>

<style lang="scss">
  header {
    grid-area: header;
    h1 {
      text-align: center;
      text-shadow: 2px 2px 5px rgb(89, 107, 65);
    }
  }

  #species {
    grid-area: species;
  }

  main {
    max-height: 100%;
    font-size: 1.2em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: min-content 8rem auto;
    grid-template-areas:
      "header   speed hp species"
      "about speed hp equipment"
      "about stats proficiencies equipment"
      "about stats proficiencies equipment";
    gap: 15px;
  }

  @media (max-width: 1720px) {
    header {
      display: none;
    }
    main {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(min-content, 5);
      grid-template-areas:
        "species   hp speed"
        "about     hp speed"
        "about     stats proficiencies"
        "about     stats proficiencies"
        "equipment equipment equipment";
    }
  }

  @media (max-width: 1300px) {
    header {
      display: block;
    }
    main {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: min-content max-content auto;
      grid-template-areas:
        "species   header"
        "hp        speed"
        "about     stats"
        "about     stats"
        "about proficiencies"
        "about proficiencies"
        "equipment equipment";
    }
  }

  @media (max-width: 930px) {
    main {
      grid-template-columns: auto;
      grid-template-rows: auto;
      grid-template-areas:
        "header"
        "species"
        "about"
        "stats"
        "speed"
        "hp"
        "proficiencies"
        "equipment";
    }
  }
</style>
