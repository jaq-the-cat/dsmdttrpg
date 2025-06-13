<script lang="ts">
  import { Character, Species } from "$lib/rpg/infra/character.svelte";
  import { db } from "$lib/db.js";
  import { docStore } from "sveltefire";
  import Sheet from "../../../components/sheet/Sheet.svelte";
  import { goto } from "$app/navigation";
  import { initializeFromSpecies } from "$lib/rpg/infra/species/from.svelte";
  let { data } = $props();

  let character: { char?: Character | null } = $state({
    char: undefined,
  });

  let docRef = docStore(db.firestore!, `sheets/${data.slug}`);
  docRef.subscribe((value) => {
    if (!value) return;
    if (!character.char) character.char = initializeFromSpecies(value.species);
    Character.deserialize(value, character.char);
    if (character.char) character.char.id = data.slug;
  });

  let name = $derived(character.char?.about.Name ?? "New");
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet | {name}</title>
</svelte:head>

{#if character.char}
  <header class="sheetLinks">
    <button
      onclick={() => {
        goto(`/`);
      }}>Create New</button
    >
    <button
      onclick={() =>
        navigator.clipboard.writeText(
          `https://fleshandoil.vercel.app/sheet/${character.char!.id}`
        )}>Share Link</button
    >
  </header>
  <Sheet bind:character={character.char} />
{:else if character.char === undefined}
  <h2>Loading...</h2>
{:else if character.char === null}
  <h2>404</h2>
{/if}

<style lang="scss">
  header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 20px;
    margin-bottom: 10px;
    button {
      font-size: 1.1rem;
      display: inline-block;
      margin-bottom: 10px;
      border: 1px solid #9fe644;
      padding: 10px;
    }
  }
</style>
