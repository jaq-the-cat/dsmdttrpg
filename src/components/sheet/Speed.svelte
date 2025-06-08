<script lang="ts">
  import { Character } from "$lib/rpg/infra/character.svelte";

  let { character = $bindable() as Character } = $props();
</script>

<div id="speed">
  <h2>Speed</h2>

  <ul>
    {#each Object.entries(character.speed) as speedEntry}
      <li>
        <span>{speedEntry[0]}</span>
        <input
          bind:value={
            () => character.speed[speedEntry[0]],
            (v) => (character.speed[speedEntry[0]] = v ?? 0)
          }
          onfocusout={() => character.upload("speed", character.speed)}
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
