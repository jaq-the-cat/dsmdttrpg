<script lang="ts">
  import { invalidText } from "$lib";
  import {
    Character,
    getBaseMaxWeight,
    Species,
  } from "$lib/rpg/character.svelte";

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
  <h2>Stats</h2>
  <p class="total">Total Points <span>{sum}</span></p>
  <section class="statList">
    {#each character.stats as stat}
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
              character.containers.at(0)!.carry = character.maxWeight;
            }
          }
        }
        min="0"
        max="10"
        onfocusout={() => character.upload("stats", character.stats)}
        type="number"
      />
    {/each}
  </section>
  <div class="passive">
    <span>Passive Perception</span>
    <span class="value"
      >{Math.max(
        0,
        Math.min(
          character.stats.get("Perception")! * 2 -
            4 +
            (character.species == Species.Disassembly ? 1 : 0),
          14
        )
      )}</span
    >
    <span>Passive Dodge</span>
    <span class="value"
      >{Math.max(
        0,
        Math.min(character.stats.get("Agility")! * 2 - 4, 14)
      )}</span
    >
  </div>
  <h2>Features & Abilities</h2>
  <textarea
    bind:value={character.fna}
    onfocusout={() => {
      character.upload("fna", character.fna);
    }}
  ></textarea>
</div>

<style lang="scss">
  #stats {
    grid-area: stats;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }

  textarea {
    flex-grow: 2;
  }

  h2,
  p {
    margin: 0;
  }

  .total {
    display: flex;
    justify-content: space-between;
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

  .passive {
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;
    gap: 5px;

    .value {
      justify-self: end;
    }
  }
</style>
