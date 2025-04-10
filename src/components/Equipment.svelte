<script lang="ts">
  import { invalidText } from "$lib";
  import { Character, excludeIntangible } from "$lib/rpg/character.svelte";
  import { Container, Item } from "$lib/rpg/items.svelte";

  let { character = $bindable() as Character } = $props();

  let newItem = $state({ name: "", weight: 1 });

  let selectedContainer = $state(0);
  let container = $derived(character.containers[selectedContainer]);

  let itemList = $derived.by(() => {
    let list: string[] = [];
    character.containers.forEach((container) => {
      if (excludeIntangible(container.name)) list.push(container.name);

      container.inventory.forEach((item) => {
        list.push(item.name);
      });
    });
    return list;
  });

  function addItem() {
    container.inventoryText += `${newItem.name} ${newItem.weight}kg, `;
    container.inventory.push(new Item(newItem.name, newItem.weight));
    newItem.name = "";
    newItem.weight = 1;
    character.weight = character.getWeight();
  }

  function addContainer() {
    character.containers.push(new Container(newItem.name, newItem.weight));
    newItem.name = "";
    newItem.weight = 1;
    character.weight = character.getWeight();
    character.maxWeight = character.getMaxWeight();
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
      <input bind:value={newItem.name} type="text" />
      <input bind:value={newItem.weight} type="number" />
      <button onclick={() => addItem()}>Add as Item</button>
      <button onclick={() => addContainer()}>Add as Container</button>
      <textarea
        bind:value={
          () => container.inventoryText,
          (v) => {
            container.inventoryText = v;
            container.refreshInventory();
            character.weight = character.getWeight();
          }
        }
      ></textarea>
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
      {#each itemList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Right Hand</span>
    <select>
      <option value={undefined}></option>
      {#each itemList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Front</span>
    <select>
      <option value={undefined}></option>
      {#each itemList as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
    <span>Back</span>
    <select>
      <option value={undefined}></option>
      {#each itemList as item}
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

    select {
      grid-column: 1 / 3;
    }

    textarea {
      grid-column: 1 / 3;
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

  textarea {
    resize: none;
    width: 100%;
    height: 10lh;
  }
</style>
