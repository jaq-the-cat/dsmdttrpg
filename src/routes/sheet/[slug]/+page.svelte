<script lang="ts">
  import { Character } from "$lib/rpg/character.svelte";
  import { db } from "$lib/db.js";
  import { docStore } from "sveltefire";
  import Sheet from "../../../components/sheet/Sheet.svelte";
  let { data } = $props();

  let character: { char?: Character | null } = $state({
    char: undefined,
  });

  let docRef = docStore(db.firestore!, `sheets/${data.slug}`);
  docRef.subscribe((value) => {
    character.char = Character.deserialize(value);
    if (character.char) character.char.id = data.slug;
  });
</script>

{#if character.char}
  <Sheet bind:character={character.char} />
{:else if character.char === undefined}
  <h2>Loading...</h2>
{:else if character.char === null}
  <h2>404</h2>
{/if}
