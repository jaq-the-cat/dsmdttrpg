<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/character.svelte";

  let { character = $bindable() as Character } = $props();

  let sum = $derived(
    Array.from(character.stats.values()).reduce((total, value) => total + value)
  );

  export function statSumInvalid(sum: number) {
    // return sum !== 42;
    return false;
  }

  export function statInvalid(stat: number) {
    return stat < 0 || stat > 10;
  }

  function statModifier(stat: number): string {
    let modifier = stat - 4;
    if (modifier < 0) return `${modifier}`;
    else if (modifier == 0) return `${modifier}`;
    return `+${modifier}`;
  }
</script>

<div id="stats">
  <h2>Stats [{sum}]</h2>
  <section class="statList">
    {#each character.stats as stat}
      <!-- <li> -->
      <span>{stat[0]}</span>
      <span class="modifier">{statModifier(stat[1])}</span>
      <input
        style={statInvalid(character.stats.get(stat[0])!) ? invalidText : ""}
        bind:value={
          () => character.stats.get(stat[0]),
          (v) => {
            character.stats.set(stat[0], v!);
            if (stat[0] === "Strength") {
              character.maxWeight = character.getMaxWeight();
            }
          }
        }
        type="number"
      />
      <!-- </li> -->
    {/each}
  </section>
</div>

<style lang="scss">
  #stats {
    grid-area: stats;
  }

  h2 {
    margin: 0;
  }

  .statList {
    display: grid;
    grid-template-columns: auto min-content minmax(auto, 10ch);
    align-items: center;
    row-gap: 5px;
    column-gap: 10px;
  }

  .modifier {
    justify-self: end;
  }
</style>
