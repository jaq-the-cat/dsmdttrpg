<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/character.svelte";
  import { Container, Item } from "$lib/rpg/items.svelte";

  let { character = $bindable() as Character } = $props();

  let newItem = $state({ name: "", weight: 1 });

  let selectedContainer = $state(0);
  let container = $derived(character.containers[selectedContainer]);

  function addItem() {
    container.inventory.push(new Item(newItem.name, newItem.weight));
    newItem.name = "";
    newItem.weight = 1;
    character.weight = character.getWeight();
  }

  function addContainer() {
    character.containers.push(new Container(newItem.name, newItem.weight));
    newItem.name = "";
    newItem.weight = 1;
    character.maxWeight = character.getMaxWeight();
  }

  function removeItem(container: Container, index: number) {
    container.inventory.splice(index, 1);
    character.weight = character.getWeight();
  }
</script>

<div id="equipment">
  <h2>Equipment</h2>
  <section>
    <div class="container">
      <select bind:value={selectedContainer}>
        {#each character.containers as container, i}
          <option value={i}>
            {container.name}
            {container.carry ? `(${container.carry}kg)` : ""}
          </option>
        {/each}
      </select>
      <div class="newItem">
        <input class="newItemName" bind:value={newItem.name} type="text" />
        <input
          class="newItemWeight"
          bind:value={newItem.weight}
          type="number"
        />
      </div>
      <button class="addItem" onclick={() => addItem()}>Add as Item</button>
      <button class="addContainer" onclick={() => addContainer()}>
        Add as Container
      </button>
      <div class="itemList">
        {#each container.inventory as item, index}
          <div class="itemName">
            {item.name}
          </div>
          <div class="itemWeight">
            {#if item.weight}
              [{item.weight}kg]
            {/if}
          </div>
          <button onclick={() => removeItem(container, index)}>Delete</button>
        {/each}
      </div>
    </div>
    <span class="weight">
      <span
        style={character.weight < 0 || character.weight > character.maxWeight
          ? invalidText
          : ""}
      >
        {character.weight}
      </span>
      <div>
        / {character.maxWeight} kg
      </div>
    </span>
  </section>
  <h2>Equipped</h2>
  <div class="equipped">
    <span>Left Hand</span>
    <select bind:value={character.left}>
      <option value={undefined}></option>
      {#each character.itemList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Right Hand</span>
    <select bind:value={character.right}>
      <option value={undefined}></option>
      {#each character.itemList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Front</span>
    <select bind:value={character.front}>
      <option value={undefined}></option>
      {#each character.itemList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Back</span>
    <select bind:value={character.back}>
      <option value={undefined}></option>
      {#each character.itemList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </div>
</div>

<style scoped lang="scss">
  .equipped {
    display: grid;
    grid-template-columns: 10ch auto;
    gap: 5px;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;

    .newItem {
      display: flex;
      gap: 5px;
      justify-content: space-between;
      grid-column: 1 / 3;

      .newItemName {
        flex-grow: 2;
      }

      .newItemWeight {
        min-width: 6ch;
        max-width: 30%;
      }
    }

    .addItem {
      grid-column: 1;
    }

    .addContainer {
      grid-column: 2;
    }

    select {
      grid-column: 1 / 3;
    }

    .itemList {
      display: grid;
      max-width: 100%;
      grid-template-columns: min-content auto min-content;
      max-height: 40vh;
      overflow-y: auto;
      grid-column: 1 / 4;
      gap: 5px;
      column-gap: 10px;

      .itemName,
      .itemWeight {
        justify-self: start;
        align-self: center;
      }

      .itemWeight {
        justify-self: end;
      }

      button {
        padding: 5px 20px;
      }
    }
  }
  #equipment {
    grid-area: equipment;
  }

  .weight {
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-template-rows: 1fr;
    column-gap: 1ch;
  }

  section {
    margin-bottom: 5px;
    // display: grid;
    // grid-template-columns: 11ch auto;
    gap: 5px;
  }
</style>
