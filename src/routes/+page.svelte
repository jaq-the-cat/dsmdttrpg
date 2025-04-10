<script lang="ts">
  import { Character } from "$lib/characters/base.svelte";
  import Sheet from "../components/Sheet.svelte";

  let character = $state(new Character());
</script>

{#if character}
  <Sheet bind:character />
{/if}

<style lang="scss">
</style>
