<!-- <script lang="ts">
  import { invalidText } from "$lib";
  import { Character, Species } from "$lib/rpg/character.svelte";
  import type { Container } from "$lib/rpg/items.svelte";

  type Props = {
    name: string;
    container: Container;
    containerOptions: Container[];
  };

  let { name, container = $bindable(), containerOptions }: Props = $props();

  let newItem = $state({ name: "", weight: 1 });

  function onSubmit() {
    // character.inventory += ", " + newItem.name;
    // newItem.name = "";
  }
</script>

<section class="container">
  <span>{name}</span>
  <span class="type">Type</span>
  <select bind:value={() => container.name, (v) => (container = v)}>
    {#each containerOptions as containerOption}
      <option value={containerOption}>{containerOption.name}</option>
    {/each}
  </select>
</section> -->
