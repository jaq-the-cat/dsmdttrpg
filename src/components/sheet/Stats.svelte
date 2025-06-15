<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/infra/character.svelte";
  import Attributes from "../rulebook/snippets/general/attributes.svelte";
  import RulebookSnippet from "./RulebookSnippet.svelte";

  let { character = $bindable() as Character } = $props();

  let rulebook = $state(false);

  let sum = $derived(
    Object.values(character.stats).reduce((total, value) => total + value)
  );

  export function statSumInvalid(sum: number) {
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
  <RulebookSnippet title="Attributes" bind:open={rulebook}>
    <Attributes />
  </RulebookSnippet>
  <p class="total">Total Points <span>{sum}</span></p>
  <section class="statList">
    {#each Object.entries(character.stats) as stat}
      <span>{stat[0]}</span>
      <span class="modifier">{statModifier(stat[1])}</span>
      <input
        style={statInvalid(character.stats[stat[0]]) ? invalidText : ""}
        bind:value={
          () => character.stats[stat[0]],
          (v) => {
            character.stats[stat[0]] = v!;
            if (stat[0] === "Strength") {
              character.containers.at(0)!.carry = character.getBaseMaxWeight();
              character.maxWeight = character.getMaxWeight();
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
    <span class="value">{10 + character.stats.Perception - 4}</span>

    <span>Passive Dodge</span>
    <span class="value">{10 + character.stats.Agility - 4}</span>
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
