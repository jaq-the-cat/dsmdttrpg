<script lang="ts">
  import { Character, Species } from "$lib/rpg/character.svelte";
  import Stats from "./Stats.svelte";
  import Proficiencies from "./Proficiencies.svelte";
  import Bars from "./Bars.svelte";
  import Speed from "./Speed.svelte";
  import Equipment from "./Equipment.svelte";
  import About from "./About.svelte";
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
  }
</script>

<main id="sheet">
  <div id="species">
    <h2>Species</h2>
    <select
      value={character.species}
      onchange={(ev) => {
        character.species = ev.currentTarget.value as Species;
        character.refresh();
        save();
      }}
    >
      {#each Object.values(Species) as species}
        <option value={species}>{species}</option>
      {/each}
    </select>
  </div>
  <Stats bind:character />
  <Proficiencies bind:character />
  <Bars bind:character />
  <Speed bind:character />
  <Equipment bind:character />
  <About bind:character />
  <header>
    <h1>Murder Drones: Flesh & Oil</h1>
  </header>
</main>

<style lang="scss">
  header {
    grid-area: header;
    min-height: 2.5lh;
    text-align: center;
  }

  #species {
    grid-area: species;
  }

  main {
    grid-template-columns: 1fr 1fr 1fr max-content;
    grid-template-rows: min-content 8rem auto;
    grid-template-areas:
      "header speed bars          species"
      "about  speed bars          equipment"
      "about  stats proficiencies equipment"
      "about  stats proficiencies equipment";
  }

  @media (max-width: 1720px) {
    main {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(min-content, 5);
      grid-template-areas:
        "header    hp        speed"
        "species   hp        speed"
        "about     stats     proficiencies"
        "about     stats     proficiencies"
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
        "about     stats"
        "about     stats"
        "about     proficiencies"
        "about     proficiencies"
        "hp        speed"
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
        "speed"
        "stats"
        "proficiencies"
        "hp"
        "equipment";
    }
  }
</style>
