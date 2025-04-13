<script lang="ts">
  import { Character } from "$lib/rpg/character.svelte";
  import Sheet from "../components/sheet/Sheet.svelte";

  let character = $state(new Character());
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet</title>
</svelte:head>

<Sheet bind:character />

<style lang="scss">
</style>
