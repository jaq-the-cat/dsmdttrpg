<script lang="ts">
  import { Character } from "$lib/rpg/character.svelte";
  import {
    allowedInSlot,
    Container,
    MeleeWeapon,
    type Item,
  } from "$lib/rpg/items.svelte";

  let {
    character = $bindable() as Character,
    slotName,
    fieldName,
    slot = $bindable(),
  }: {
    character: Character;
    slotName: string;
    fieldName: string;
    slot: string | null;
  } = $props();

  function unselected() {
    if (
      character.twoHanding &&
      (fieldName === "left" || fieldName === "right")
    ) {
      character.left = null;
      character.right = null;
      character.twoHanding = false;
      character.uploadMultiple({
        left: null,
        right: null,
        twoHanding: false,
      });
      return;
    }
    character.upload(fieldName, null);
  }

  function selected(item: Item | Container | MeleeWeapon) {
    if (
      "twoHanded" in item &&
      item.twoHanded &&
      (fieldName === "left" || fieldName === "right")
    ) {
      character.left = slot;
      character.right = slot;
      character.twoHanding = true;
      character.uploadMultiple({
        left: item.id,
        right: item.id,
        twoHanding: true,
      });
      return;
    }
    character.upload(fieldName, item.id);
  }
</script>

<span>{slotName}</span>
<select bind:value={slot}>
  <option value={null} onclick={() => unselected()}></option>
  {#each character.itemList.list as item}
    {#if allowedInSlot(item, fieldName)}
      <option value={item.id} onclick={() => selected(item)}
        >{item.toString()}</option
      >
    {/if}
  {/each}
</select>

<style lang="scss">
  select {
    max-width: 100%;
  }
</style>
