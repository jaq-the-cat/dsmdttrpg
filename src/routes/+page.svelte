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
  * {
    font-family: "Courier New", Courier, monospace;
  }

  header {
    grid-area: header;
    h1 {
      text-align: center;
      text-shadow: 2px 2px 5px rgb(89, 107, 65);
    }
  }

  main {
    max-height: 100%;
    font-size: 1.2em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: min-content 8rem auto;
    // grid-template-areas:
    //   "species speed         equipment header"
    //   "stats   speed         equipment about"
    //   "stats   proficiencies equipment about"
    //   "hp   proficiencies equipment about";
    grid-template-areas:
      "header   speed hp species"
      "about speed hp equipment"
      "about stats proficiencies equipment"
      "about stats proficiencies equipment";
    gap: 15px;
  }

  :global(.separator) {
    border: 0;
    height: 0;
    margin: 0;
    padding: 0;
    display: block;
    height: 15px;
  }

  :global(main) {
    :global(h2) {
      margin: 0 0 10px 0;
    }

    :global(ul) {
      margin: 0;
      padding: 0;
      min-height: 100px;
      list-style-type: none;
    }

    > :global(div) {
      padding: 20px;
      border: 1px solid #9fe644;
      box-shadow: 2px 2px 4px 0 #9fe644;
    }
  }

  #species {
    grid-area: species;
  }
</style>
