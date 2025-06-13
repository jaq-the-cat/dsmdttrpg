<script lang="ts">
  import type {
    AmmoItem,
    Healing,
    Item,
    LiquidContainer,
    MeleeWeapon,
    RangedWeapon,
    Throwable,
  } from "$lib/rpg/infra/items.svelte";

  let {
    itemInspect = $bindable(),
  }: {
    itemInspect:
      | Item
      | MeleeWeapon
      | RangedWeapon
      | AmmoItem
      | Throwable
      | LiquidContainer
      | Healing
      | null;
  } = $props();

  let dialog: HTMLDialogElement = $state()!; // HTMLDialogElement

  $effect(() => {
    if (itemInspect) dialog.showModal();
  });
</script>

{#if itemInspect}
  <dialog
    class="modal inspect"
    bind:this={dialog}
    onclose={() => (itemInspect = null)}
  >
    <span class="itemToInspect">{itemInspect}</span>
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
      {#if "ammo" in itemInspect && itemInspect.ammo}
        <h2>Ammo</h2>
        <span>
          <span>{itemInspect.ammo.capacity}</span>
        </span>
        <h2>Reload</h2>
        <span>
          <span>{itemInspect.ammo.reloadTurns}</span>
          <span>{itemInspect.ammo.reloadTurns != 1 ? "Turns" : "Turn"}</span>
        </span>
      {/if}
      <h2>Stats</h2>
      <span>{itemInspect.range} Range</span>
      {#if "rate" in itemInspect && itemInspect.rate}
        <span>{itemInspect.rate} Rate</span>
      {/if}
      {#if itemInspect.info}
        <span>{itemInspect.info}</span>
      {/if}
    {:else if "heal" in itemInspect!}
      <h2>Heal</h2>
      <span>{itemInspect.heal ?? ""}</span>
      <h2>Works On</h2>
      <span>{itemInspect.worksOn ?? ""}</span>
      {#if itemInspect.revive}
        <h2>Revive</h2>
        <span>{itemInspect.revive}</span>
      {/if}
    {/if}
    <button class="cancel" onclick={() => (itemInspect = null)}>Close</button>
  </dialog>
{/if}

<style lang="scss">
  .modal {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    min-width: 50ch;
    max-width: min(40%, 40ch);

    background-color: #070c01;
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

    button {
      margin-top: 15px;
      display: block;
      width: 100%;
      padding: 10px 0;
    }
  }

  .modal::backdrop {
    background: #0009;
  }
</style>
