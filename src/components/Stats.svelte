<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/character.svelte";

  let { character = $bindable() as Character } = $props();

  let sum = $derived(
    Array.from(character.stats.values()).reduce((total, value) => total + value)
  );

  export function statSumInvalid(sum: number) {
    return sum !== 42;
  }

  export function statInvalid(stat: number) {
    return stat < 0 || stat > 10;
  }
</script>

<div id="stats">
  <h2>Stats</h2>
  <p><span style={statSumInvalid(sum) ? invalidText : ""}>{sum}</span>/42</p>
  <ul>
    {#each character.stats as stat}
      <li>
        <span>{stat[0]}</span>
        <input
          style={statInvalid(character.stats.get(stat[0])!) ? invalidText : ""}
          bind:value={
            () => character.stats.get(stat[0]),
            (v) => {
              // if (v && v > 0 && v < 10)
              character.stats.set(stat[0], v!);
              if (stat[0] === "Strength") {
                character.maxWeight = character.getMaxWeight();
              }
            }
          }
          type="number"
        />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #stats {
    grid-area: stats;
  }

  h2 {
    margin: 0;
  }

  p {
    display: block;
    margin: 5px 0 5px 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    column-gap: 5px;
    margin-bottom: 5px;
  }
</style>
