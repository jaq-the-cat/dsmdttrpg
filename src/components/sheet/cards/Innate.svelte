<script lang="ts">
  import { Item } from "$lib/rpg/infra/items.svelte";
  import WeaponInspect from "./dialogs/WeaponInspect.svelte";

  let { items = $bindable() } = $props();

  let itemInspect: Item | null = $state(null);
  function inspectClicked(item: Item) {
    itemInspect = item;
  }
</script>

{#if items}
  <div id="innate">
    <WeaponInspect bind:itemInspect />
    <h2>Innate</h2>
    <div class="abList">
      {#each Object.entries(items) as [name, item]}
        <button
          class="itemDetails"
          onclick={() => {
            inspectClicked(item as Item);
          }}
        >
          <span class="itemName">{name}</span>
        </button>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  #innate {
    grid-area: innate;
  }
  .abList {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
</style>
