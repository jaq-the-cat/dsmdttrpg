<script lang="ts">
  import { Character } from "$lib/rpg/character.svelte";
  import Sheet from "../components/sheet/Sheet.svelte";

  let character = $state(new Character());
</script>

<Sheet bind:character />

<style lang="scss">
</style>
