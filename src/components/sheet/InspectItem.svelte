<script lang="ts">
  import type {
    Container,
    Healing,
    Item,
    MeleeWeapon,
    RangedWeapon,
  } from "$lib/rpg/items.svelte";

  let {
    itemInspect = $bindable(),
    containers = $bindable(),
    transferItem,
  }: {
    itemInspect: Item | MeleeWeapon | RangedWeapon | null;
    containers: Container[];
    transferItem: (item: Item, containerIndex: number | null) => void;
  } = $props();

  let transferToContainer = $state(0);
</script>

<div class="modal inspect" style={itemInspect === null ? "display: none" : ""}>
  <span class="itemToInspect"
    >{itemInspect}
    {#if itemInspect?.weight}
      <span>[{itemInspect!.weight}kg]</span>
    {/if}</span
  >
  {#if itemInspect?.type === "melee"}
    <h2>Damage</h2>
    <span>{(itemInspect as MeleeWeapon).damage}</span>
    {#if (itemInspect as MeleeWeapon).info}
      <h2>Difficulty</h2>
      <span>{(itemInspect as MeleeWeapon).info}</span>
    {/if}
  {:else if itemInspect?.type === "ranged"}
    <h2>Hit</h2>
    <span>{(itemInspect as RangedWeapon).hit ?? ""}</span>
    <h2>Damage</h2>
    <span>{(itemInspect as RangedWeapon).damage}</span>
    <h2>Stats</h2>
    <span>{(itemInspect as RangedWeapon).range} Range</span>
    <span>{(itemInspect as RangedWeapon).rate} Rate</span>
    <span>{(itemInspect as RangedWeapon).capacity} Capacity</span>
    <span>{(itemInspect as RangedWeapon).reloadTurns} Reload Turns</span>
  {:else if itemInspect?.type === "heal"}
    <h2>Heal</h2>
    <span>{(itemInspect as Healing).heal ?? ""}</span>
    <h2>Works On</h2>
    <span>{(itemInspect as Healing).worksOn ?? ""}</span>
    {#if (itemInspect as Healing).revive}
      <h2>Revive</h2>
      <span>{(itemInspect as Healing).revive}</span>
    {/if}
    {#if (itemInspect as Healing).requirements}
      <h2>Requirements</h2>
      <span>{(itemInspect as Healing).requirements}</span>
    {/if}
  {/if}
  <h2>Transfer</h2>
  <select bind:value={transferToContainer}>
    {#each containers as container, i}
      <option value={i}>{container}</option>
    {/each}
  </select>
  <button
    class="transferBtn"
    onclick={() => transferItem(itemInspect!, transferToContainer)}
    >Transfer</button
  >
  <button class="cancel" onclick={() => (itemInspect = null)}>Close</button>
</div>

<style lang="scss">
  .modal {
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

    .itemToInspect {
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
</style>
