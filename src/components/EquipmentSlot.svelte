<script lang="ts">
  import { Character } from "$lib/rpg/character.svelte";
  import { allowedInSlot, type Item } from "$lib/rpg/items.svelte";

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
</script>

<span>{slotName}</span>
<select
  bind:value={slot}
  onchange={(e) => character.upload(fieldName, e.currentTarget.value)}
>
  <option value={null}></option>
  {#each character.itemList.list as item}
    {#if allowedInSlot(item, fieldName)}
      <option value={item.id}>{item.toString()}</option>
    {/if}
  {/each}
</select>

<style lang="scss">
  select {
    max-width: 100%;
  }
</style>
