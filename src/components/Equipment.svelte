<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/character.svelte";
  import { ItemList } from "$lib/rpg/itemList.svelte";
  import { Container, Item } from "$lib/rpg/items.svelte";
  import EquipmentSlot from "./EquipmentSlot.svelte";

  let { character = $bindable() as Character } = $props();

  let newItem = $state({ name: "", weight: 1 });

  let containers = $derived(character.containers);
  let selectedContainer = $state(0);
  let container = $derived(containers[selectedContainer]);

  let itemList = $state(new ItemList(character.containers));

  let itemToTransfer: Item | null = $state(null);
  let transferToContainer: number = $state(0);

  function addItem() {
    let item = new Item(newItem.name, newItem.weight);
    container.inventory.push(item);
    character.weight += newItem.weight;
    itemList.refresh(containers);
    character.upload("containers", containers);
  }

  function addContainer() {
    const newContainer = new Container(newItem.name, newItem.weight);
    containers.push(newContainer);
    character.maxWeight += newItem.weight;
    itemList.push(newContainer);
    newItem.name = "";
    newItem.weight = 1;
    itemList.refresh(containers);
    character.upload("containers", containers);
  }

  function removeContainer(index: number) {
    if (index === 0) return;
    const container = containers.splice(index, 1)[0];
    container.inventory.forEach((item) => itemList.removeElement(item));
    itemList.removeElement(container);

    character.weight = character.getWeight();
    character.maxWeight = character.getMaxWeight();
    selectedContainer = index - 1;
    character.upload("containers", containers);
  }

  function removeItem(item: Item, index: number) {
    container.inventory.splice(index, 1);
    itemList.removeElement(item);
    if (character.left === item.name) character.left = null;
    if (character.right === item.name) character.right = null;
    if (character.front === item.name) character.front = null;
    if (character.back === item.name) character.back = null;
    character.weight = character.getWeight();
    character.upload("containers", containers);
  }

  function transferClicked(item: Item) {
    itemToTransfer = item;
  }

  function transferItem(item: Item, targetContainerIndex: number | null) {
    if (targetContainerIndex === null) return;
    let index = container.inventory.findIndex(
      (itemCheck) => itemCheck.toString() === item.toString()
    );
    container.inventory.splice(index, 1);
    itemList.removeElement(item);
    if (character.left === item.name) character.left = null;
    if (character.right === item.name) character.right = null;
    if (character.front === item.name) character.front = null;
    if (character.back === item.name) character.back = null;
    character.weight = character.getWeight();
    containers[targetContainerIndex].inventory.push(item);
    itemList.refresh(containers);
    itemToTransfer = null;
    character.upload("containers", containers);
  }
</script>

<div id="equipment">
  <h2>Equipment</h2>
  <section>
    <div class="container">
      <div class="containerSelect">
        <select bind:value={selectedContainer}>
          {#each containers as container, i}
            <option value={i}>{container}</option>
          {/each}
        </select>
        <button onclick={() => removeContainer(selectedContainer)}
          >Delete</button
        >
      </div>
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
          <span class="itemName">
            <input
              type="text"
              onfocusout={() => character.upload("containers", containers)}
              bind:value={
                () => item.name,
                (v) => {
                  item.name = v;
                }
              }
            /></span
          >
          <div class="itemWeight">
            {#if item.weight}
              [{item.weight}kg]
            {/if}
          </div>
          <button onclick={() => transferClicked(item)}>TRF</button>
          <button onclick={() => removeItem(item, index)}>DEL</button>
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
    <EquipmentSlot
      slotName="Left Hand"
      fieldName="left"
      bind:character
      bind:itemList
      bind:slot={character.left}
    />
    <EquipmentSlot
      slotName="Left Shoulder"
      fieldName="leftShoulder"
      bind:character
      bind:itemList
      bind:slot={character.leftShoulder}
    />
    <EquipmentSlot
      slotName="Right Hand"
      fieldName="right"
      bind:character
      bind:itemList
      bind:slot={character.right}
    />
    <EquipmentSlot
      slotName="Right Shoulder"
      fieldName="rightShoulder"
      bind:character
      bind:itemList
      bind:slot={character.rightShoulder}
    />
    <EquipmentSlot
      slotName="Front"
      fieldName="front"
      bind:character
      bind:itemList
      bind:slot={character.front}
    />
    <EquipmentSlot
      slotName="Back"
      fieldName="back"
      bind:character
      bind:itemList
      bind:slot={character.back}
    />
  </div>
</div>

<div class="transfer" style={itemToTransfer === null ? "display: none" : ""}>
  <h2>Transfer Item</h2>
  <span class="itemToTransfer">{itemToTransfer}</span>
  <h2>To</h2>
  <select bind:value={transferToContainer}>
    {#each containers as container, i}
      <option value={i}>{container}</option>
    {/each}
  </select>
  <button
    class="transferBtn"
    onclick={() => transferItem(itemToTransfer!, transferToContainer)}
    >Transfer</button
  >
  <button class="cancel" onclick={() => (itemToTransfer = null)}>Cancel</button>
</div>

<style scoped lang="scss">
  .transfer {
    grid-area: equipment;
    width: 75%;
    margin-top: 5rem;
    align-self: flex-start;
    justify-self: center;
    opacity: 95%;
    background-color: #080e00;
    padding: 20px;
    border: 1px solid #9fe644;
    box-shadow: 2px 2px 4px 0 #9fe644;

    display: flex;
    flex-direction: column;

    row-gap: 5px;

    * {
      margin: 0;
    }

    .itemToTransfer {
      font-size: 2rem;
      text-align: center;
    }

    select {
      font-size: 1.5rem;
      text-align: center;
      padding: 10px 0;
    }

    button {
      display: block;
      width: 100%;
      padding: 10px 0;
    }

    button.transferBtn {
      margin-top: auto;
    }
  }

  .containerSelect {
    display: flex;
    flex-direction: row;

    column-gap: 5px;

    select {
      flex-grow: 2;
    }
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;

    .containerSelect {
      grid-column: 1 / 3;
    }

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

    .itemList {
      display: grid;
      max-width: 100%;
      grid-template-columns: auto auto min-content min-content;
      max-height: 40vh;
      overflow-y: auto;
      grid-column: 1 / 4;
      gap: 5px;
      column-gap: 10px;

      .itemName {
        justify-self: start;
        align-self: center;
        width: 100%;
      }

      input {
        position: relative;
        top: 2px;
        padding: 0;
        border: 0;
        background: none;
        border-bottom: 1px dashed transparent;
      }

      input:focus {
        outline: none;
        border-color: #9fe644;
      }

      .itemWeight {
        justify-self: end;
        justify-self: start;
        align-self: center;
      }

      button {
        padding: 5px 15px;
      }
    }
  }

  .equipped {
    display: grid;
    grid-template-columns: max-content minmax(auto, 30ch);
    gap: 5px;
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
    gap: 5px;
  }
</style>
