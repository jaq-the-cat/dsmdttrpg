<script lang="ts">
  import type { Character } from "$lib/rpg/character.svelte";
  import type {
    AmmoItem,
    Container,
    Healing,
    Item,
    LiquidContainer,
    MeleeWeapon,
    RangedWeapon,
  } from "$lib/rpg/items.svelte";

  let {
    itemInspect = $bindable(),
    containers = $bindable(),
    character = $bindable(),
    transferItem,
  }: {
    itemInspect:
      | Item
      | MeleeWeapon
      | RangedWeapon
      | LiquidContainer
      | Healing
      | AmmoItem
      | null;
    containers: Container[];
    character: Character;
    transferItem: (item: Item, containerIndex: number | null) => void;
  } = $props();

  let transferToContainer = $state(0);
</script>

{#if itemInspect}
  <div
    class="modal inspect"
    style={itemInspect === null ? "display: none" : ""}
  >
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
    {:else if "range" in itemInspect!}
      <h2>Hit</h2>
      <span>{itemInspect.hit ?? ""}</span>
      <h2>Damage</h2>
      <span>{itemInspect.damage}</span>
      <h2>Ammo</h2>
      {#if itemInspect.ammo}
        <span class="inputs">
          <input
            min="0"
            max={itemInspect.ammo.current}
            type="number"
            bind:value={itemInspect.ammo.current}
            onfocusout={() => character.upload("containers", containers)}
          />
          /
          <span>{itemInspect.ammo.capacity}</span>
        </span>
        <h2>Reload</h2>
        <span
          >{itemInspect.ammo.reloadTurns}
          {itemInspect.ammo.reloadTurns != 1 ? "Turns" : "Turn"}</span
        >
        <button
          onclick={() => {
            const result = (itemInspect as RangedWeapon).tryReload(
              containers,
              itemInspect as RangedWeapon
            );
            if (!result) {
              alert("No Ammo :(");
            } else {
              character.upload("containers", containers);
            }
          }}>Reload</button
        >
      {:else}
        <span>No Clip</span>
      {/if}
      <h2>Stats</h2>
      <span>{itemInspect.range} Range</span>
      <span>{itemInspect.rate} Rate</span>
    {:else if "heal" in itemInspect!}
      <h2>Heal</h2>
      <span>{itemInspect.heal ?? ""}</span>
      <h2>Works On</h2>
      <span>{itemInspect.worksOn ?? ""}</span>
      {#if itemInspect.revive}
        <h2>Revive</h2>
        <span>{itemInspect.revive}</span>
      {/if}
      {#if itemInspect.requirements}
        <h2>Requirements</h2>
        <span>{itemInspect.requirements}</span>
      {/if}
    {:else if "current" in itemInspect!}
      <h2>Current</h2>
      <input
        type="number"
        bind:value={
          () => (itemInspect as LiquidContainer).current,
          (v) => {
            if (v < 0 || v > (itemInspect as LiquidContainer).capacity) return;
            (itemInspect as LiquidContainer).current = v;
          }
        }
        onfocusout={() => character.upload("containers", containers)}
        step={itemInspect.type === "liquid" ? 0.1 : 1}
        min="0"
        max={itemInspect.capacity}
      />
      <h2>Capacity</h2>
      <span>{itemInspect.capacity ?? ""}</span>
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
{/if}

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

    .inputs {
      display: flex;
      justify-content: stretch;
      align-items: center;
      column-gap: 10px;
    }
    input {
      // max-width: 10ch;
      flex-grow: 2;
    }

    button.transferBtn {
      margin-top: auto;
    }
  }
</style>
