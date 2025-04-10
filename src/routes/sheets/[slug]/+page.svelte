<script lang="ts">
  import { Character } from "$lib/characters/base.svelte";
  import { db } from "$lib/db.js";
  import { Collection, Doc, docStore } from "sveltefire";
  import Sheet from "../../../components/Sheet.svelte";
  let { data } = $props();

  let docRef = docStore(db.firestore!, `sheets/${data.slug}`);
  let character: { char?: Character } = $state({
    char: undefined,
  });
  docRef.subscribe((value) => {
    character.char = Character.deserialize(value);
    if (character.char) character.char.id = data.slug;
  });
</script>

{#if character.char}
  <Sheet bind:character={character.char} />
{/if}
