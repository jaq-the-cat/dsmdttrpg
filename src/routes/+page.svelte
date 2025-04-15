<script lang="ts">
  import { goto } from "$app/navigation";
  import { db } from "$lib/db";
  import { Character } from "$lib/rpg/character.svelte";
  import { addDoc, collection } from "firebase/firestore";
  import Sheet from "../components/sheet/Sheet.svelte";

  let character = $state(new Character());

  async function save() {
    const doc = await addDoc(
      collection(db.firestore!, "sheets"),
      character.serialize()
    );
    character.id = doc.id;
    goto(`/sheet/${doc.id}`);
  }
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet</title>
</svelte:head>

<header class="sheetLinks">
  <button onclick={save}>Create</button>
</header>

<Sheet bind:character />

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
