<script lang="ts">
  import { Character } from "$lib/rpg/character.svelte";
  import { db } from "$lib/db.js";
  import { docStore } from "sveltefire";
  import Sheet from "../../../components/sheet/Sheet.svelte";
  import { goto } from "$app/navigation";
  let { data } = $props();

  let character: { char?: Character | null } = $state({
    char: undefined,
  });

  let docRef = docStore(db.firestore!, `sheets/${data.slug}`);
  docRef.subscribe((value) => {
    character.char = Character.deserialize(value);
    if (character.char) character.char.id = data.slug;
  });

  let name = $derived(character.char?.about.get("Name") ?? "New");
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet | {name}</title>
</svelte:head>

{#if character.char}
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
  <Sheet bind:character={character.char} />
{:else if character.char === undefined}
  <h2>Loading...</h2>
{:else if character.char === null}
  <h2>404</h2>
{/if}

<style lang="scss">
  button {
    font-size: 1.1rem;
    display: inline-block;
    margin-bottom: 10px;
    border: 1px solid #9fe644;
    padding: 5px;
  }
</style>
