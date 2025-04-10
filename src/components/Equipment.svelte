<script lang="ts">
  import { Character, Species } from "$lib/characters/base.svelte";

  let { character = $bindable() as Character } = $props();

  let newItem = $state({ name: "" });

  function onSubmit() {
    character.inventory.push(newItem.name);
    newItem.name = "";
  }
</script>

<div id="equipment">
  <h2>Equipment</h2>
  <section>
    <span>Left Hand:</span>
    <select>
      {#each character.inventory as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Right Hand:</span>
    <select>
      {#each character.inventory as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </section>
  <div id="newItem">
    <input type="text" bind:value={newItem.name} />
    <button onclick={onSubmit}>Add Item</button>
  </div>
  <ul>
    {#each Object.values(character.inventory) as item}
      <li>
        <span>{item}</span>
      </li>
    {/each}
  </ul>
</div>

<style scoped lang="scss">
  #equipment {
    grid-area: equipment;
  }

  section {
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 11ch auto;
    gap: 5px;
  }

  #newItem {
    margin-bottom: 5px;
  }

  ul {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 25lh;
  }
</style>
