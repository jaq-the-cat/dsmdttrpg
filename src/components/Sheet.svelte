<script lang="ts">
  import { Character, Species } from "$lib/rpg/character.svelte";
  import Stats from "../components/Stats.svelte";
  import Proficiencies from "../components/Proficiencies.svelte";
  import HP from "../components/HP.svelte";
  import Speed from "../components/Speed.svelte";
  import Equipment from "../components/Equipment.svelte";
  import About from "../components/About.svelte";
  import { db } from "$lib/db";
  import { addDoc, collection, doc, setDoc } from "firebase/firestore";
  import { goto } from "$app/navigation";

  let { character = $bindable() as Character } = $props();

  async function save() {
    if (character.id) {
      setDoc(doc(db.firestore!, "sheets", character.id), character.serialize());
    } else {
      const doc = await addDoc(
        collection(db.firestore!, "sheets"),
        character.serialize()
      );
      character.id = doc.id;
      goto(`/sheet/${doc.id}`);
    }
    alert("Saved!");
  }
</script>

<button
  onclick={() => {
    goto(`/`);
  }}>Create New</button
>
{#if character.id}
  <button
    onclick={() =>
      navigator.clipboard.writeText(
        `https://fleshandoil.vercel.app/sheet/${character.id}`
      )}>Share Link</button
  >
{/if}
<button onclick={save}>Save</button>

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
    <!-- <h1>Murder Drones: Flesh & Oil</h1> -->
  </header>
  <!-- <Bars bind:character /> -->
</main>

<style lang="scss">
  button {
    display: inline-block;
    margin-bottom: 5px;
    border: 1px solid #9fe644;
    padding: 5px;
  }
  header {
    grid-area: header;
    min-height: 2.5lh;
    text-align: center;
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
    main {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(min-content, 5);
      grid-template-areas:
        "header    hp speed"
        "species   hp speed"
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
