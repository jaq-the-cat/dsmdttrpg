<script lang="ts">
  import { Character } from "$lib/rpg/character.svelte";

  let { character = $bindable() as Character } = $props();
</script>

<div id="speed">
  <h2>Speed</h2>

  <ul>
    {#each character.speed as speedEntry}
      <li>
        <span>{speedEntry[0]}</span>
        <input
          bind:value={
            () => character.speed.get(speedEntry[0]),
            (v) => character.speed.set(speedEntry[0], v ?? 0)
          }
          type="number"
        />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #speed {
    grid-area: speed;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      margin-bottom: 5px;
    }
  }
</style>
