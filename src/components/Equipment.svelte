<script lang="ts">
  import { Character, Species } from "$lib/characters/base.svelte";

  let { character = $bindable() as Character } = $props();

  let newItem = $state({ name: "" });

  function onSubmit() {
    character.inventory += ", " + newItem.name;
    newItem.name = "";
  }
</script>

<div id="equipment">
  <h2>Equipment</h2>
  <section>
    <span>Left Hand</span>
    <select>
      {#each character.inventoryList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Right Hand</span>
    <select>
      {#each character.inventoryList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Weight</span>
    <span class="weight">
      <input type="text" bind:value={character.weight} />
      /
      <input type="text" bind:value={character.maxWeight} />
    </span>
    <button onclick={onSubmit}>Add Item</button>
    <input type="text" bind:value={newItem.name} />
  </section>
  <textarea bind:value={character.inventory}></textarea>
</div>

<style scoped lang="scss">
  #equipment {
    grid-area: equipment;
  }

  .weight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 5px;

    input {
      width: 100%;
    }
  }

  section {
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 11ch auto;
    gap: 5px;
  }

  textarea {
    resize: vertical;
    width: 100%;
    height: 10lh;
  }
</style>
