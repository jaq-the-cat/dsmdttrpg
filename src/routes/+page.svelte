<script lang="ts">
  import { Character } from "$lib/characters/base.svelte";
  import Sheet from "../components/Sheet.svelte";

  let character = $state(new Character());
</script>

{#if character}
  <Sheet bind:character />
{:else}
  <h1>Not Found</h1>
{/if}

<style lang="scss">
</style>
