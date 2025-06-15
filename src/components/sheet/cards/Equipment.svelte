<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/infra/character.svelte";
  import { Container, Item } from "$lib/rpg/infra/items.svelte";
  import { prefabs } from "$lib/rpg/instances/objectLists.svelte";
  import EquipmentSlot from "./EquipmentSlot.svelte";
  import InspectItem from "./dialogs/InspectItem.svelte";

  let { character = $bindable() as Character } = $props();

  let newItem = $state({ name: "", weight: 1 });

  let containers = $derived(character.containers);
  let selectedContainer = $state(0);
  let container = $derived(containers[selectedContainer]);

  let itemInspect: Item | null = $state(null);

  let selectedPrefabCategory = $state("Containers");
  let selectedPrefab = $state(0);

  function addItem() {
    let item = new Item(newItem.name, newItem.weight);
    container.addOne(item);
    character.itemList.refresh(containers);
    character.upload("containers", containers);
  }

  function addContainer() {
    const newContainer = new Container(newItem.name, newItem.weight, 1);
    containers.push(newContainer);
    character.itemList.push(newContainer);
    newItem.name = "";
    newItem.weight = 1;
    character.itemList.refresh(containers);
    character.upload("containers", containers);
    selectedContainer = containers.length - 1;
  }

  function addPrefab(item: Item | Container) {
    const cloned = item.clone();
    if ("inventory" in cloned) {
      containers.push(cloned);
      selectedContainer = containers.length - 1;
    } else {
      container.addOne(cloned);
    }
    character.itemList.refresh(containers);
    character.upload("containers", containers);
  }

  function removeContainer(index: number) {
    if (index === 0) return;
    const container = containers.splice(index, 1)[0];

    let equipmentRemoved: { [key: string]: null } = {};
    container.inventory.forEach((item) => {
      character.itemList.removeElement(item);
      equipmentRemoved = {
        ...equipmentRemoved,
        ...character.checkItemWasRemoved(item.id),
      };
    });
    character.itemList.removeElement(container);
    equipmentRemoved = {
      ...equipmentRemoved,
      ...character.checkItemWasRemoved(container.id),
    };

    character.uploadMultiple({
      containers,
      ...equipmentRemoved,
    });

    character.maxWeight = character.getMaxWeight();
    selectedContainer = index - 1;
  }

  function removeItem(item: Item, index: number) {
    container.inventory.splice(index, 1);
    character.itemList.removeElement(item);

    const equipmentRemoved = character.checkItemWasRemoved(item.id);

    character.uploadMultiple({
      containers,
      ...equipmentRemoved,
    });
  }

  function inspectClicked(item: Item) {
    itemInspect = item;
  }

  function transferItem(item: Item, targetContainerIndex: number | null) {
    if (targetContainerIndex === null) return;
    let index = container.inventory.findIndex(
      (itemCheck) => itemCheck.toString() === item.toString()
    );
    container.inventory.splice(index, 1);
    character.itemList.removeElement(item);
    if (character.left === item.name) character.left = null;
    if (character.right === item.name) character.right = null;
    if (character.front === item.name) character.front = null;
    if (character.back === item.name) character.back = null;
    containers[targetContainerIndex].inventory.push(item);
    character.itemList.refresh(containers);
    itemInspect = null;
    character.upload("containers", containers);
  }
</script>

<div id="equipment">
  <header>
    <h2>Equipment</h2>
    <span
      style={character.weight < 0 || character.weight > character.maxWeight
        ? invalidText
        : ""}
    >
      {character.weight}/{character.maxWeight} kg
    </span>
  </header>
  <h2>Add Custom Item</h2>
  <div class="newItem">
    <div class="newItemInputs">
      <input class="newItemName" bind:value={newItem.name} type="text" />
      <input class="newItemWeight" bind:value={newItem.weight} type="number" />
    </div>
    <button class="addItem" onclick={() => addItem()}>Add as Item</button>
    <button class="addContainer" onclick={() => addContainer()}>
      Add as Container
    </button>
  </div>
  <h2>Add Prefab</h2>
  <div class="addPrefab">
    <select bind:value={selectedPrefab} class="prefabSelect">
      {#each prefabs[selectedPrefabCategory] as prefab, i}
        <option value={i}>{prefab.toStringWeight()}</option>
      {/each}
    </select>
    <select
      bind:value={selectedPrefabCategory}
      onchange={() => (selectedPrefab = 0)}
      class="prefabCategory"
    >
      {#each Object.keys(prefabs) as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
    <button
      class="prefabAdd"
      onclick={() => addPrefab(prefabs[selectedPrefabCategory][selectedPrefab])}
      >Add Prefab</button
    >
  </div>
  <h2>Container</h2>
  <div class="containerSelect">
    <select bind:value={selectedContainer}>
      {#each containers as container, i}
        <option value={i}>{container}</option>
      {/each}
    </select>
    <button class="delete" onclick={() => removeContainer(selectedContainer)}
      >DEL</button
    >
  </div>
  <div class="itemList">
    {#each container.inventory as item, index}
      <button
        class="itemDetails"
        onclick={() => {
          inspectClicked(item);
        }}
      >
        <span class="itemName">{item}</span>
        <span class="itemWeight">
          {#if item.weight}
            [{item.weight}kg]
          {/if}
        </span>
      </button>
      <button class="delete" onclick={() => removeItem(item, index)}>DEL</button
      >
    {/each}
  </div>
  <h2>Equipped</h2>
  <div class="equipped">
    <EquipmentSlot
      slotName="Left Hand"
      fieldName="left"
      bind:character
      bind:slot={character.left}
    />
    <EquipmentSlot
      slotName="Right Hand"
      fieldName="right"
      bind:character
      bind:slot={character.right}
    />
    <EquipmentSlot
      slotName="Left Shoulder"
      fieldName="leftShoulder"
      bind:character
      bind:slot={character.leftShoulder}
    />
    <EquipmentSlot
      slotName="Right Shoulder"
      fieldName="rightShoulder"
      bind:character
      bind:slot={character.rightShoulder}
    />
    <EquipmentSlot
      slotName="Front"
      fieldName="front"
      bind:character
      bind:slot={character.front}
    />
    <EquipmentSlot
      slotName="Back"
      fieldName="back"
      bind:character
      bind:slot={character.back}
    />
  </div>
</div>

<InspectItem
  bind:itemInspect
  bind:containers={character.containers}
  bind:character
  {transferItem}
/>

<style scoped lang="scss">
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .newItem {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    justify-content: stretch;

    .newItemInputs {
      grid-column: 1 / 3;
      display: flex;
      column-gap: 5px;

      .newItemName {
        flex-grow: 2;
      }
    }

    .newItemWeight {
      min-width: 6ch;
      max-width: 30%;
    }

    .addContainer {
      grid-column: 2 / 3;
    }
  }

  .addPrefab {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    .prefabSelect {
      grid-column: 1 / 3;
    }
    .prefabCategory {
      grid-column: 1;
    }
    .prefabAdd {
      grid-column: 2;
    }
  }

  .containerSelect {
    grid-column: 1 / 3;
    display: flex;
    flex-direction: row;

    column-gap: 5px;

    select {
      flex-grow: 2;
    }
  }

  .delete {
    padding: 5px 15px;
  }

  .itemList {
    display: grid;
    max-width: 100%;
    grid-template-columns: auto min-content;
    max-height: 40vh;
    overflow-y: auto;
    grid-column: 1 / 4;
    gap: 5px;

    .itemDetails {
      text-align: start;
      padding-left: 5px;
    }

    .itemName {
      justify-self: start;
      align-self: center;
      width: 100%;
    }

    .itemWeight {
      justify-self: end;
      align-self: center;
    }
  }

  .equipped {
    display: grid;
    grid-template-columns: max-content auto;
    gap: 5px;
  }

  #equipment {
    grid-area: equipment;

    > * {
      margin-bottom: 5px;
    }
  }

  h2 {
    grid-column: 1 / 3;
    margin: 0;
  }
</style>
