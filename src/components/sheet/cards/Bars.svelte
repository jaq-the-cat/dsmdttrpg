<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/infra/character.svelte";
  import AbsoluteSolver from "../../rulebook/snippets/species/reuse/absoluteSolver.svelte";
  import Blood from "../../rulebook/snippets/species/reuse/blood.svelte";
  import Heat from "../../rulebook/snippets/species/reuse/heat.svelte";
  import OilFresh from "../../rulebook/snippets/species/reuse/oilFresh.svelte";
  import OilSolver from "../../rulebook/snippets/species/reuse/oilSolver.svelte";
  import Sanity from "../../rulebook/snippets/species/reuse/sanity.svelte";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";

  let { character = $bindable() as Character } = $props();

  let maxHp = $derived(character.getMaxHp());

  function getMaxBarValue(value: string, character: Character) {
    if (value === "Used Oil" && "Absolute Solver" in character.bars) {
      return 10 - character.bars["Absolute Solver"];
    }
    return 10;
  }

  let openFreshOil = $state(false);
  let openUsedOil = $state(false);
  let openBlood = $state(false);
  let openSanity = $state(false);
  let openAbsoluteSolver = $state(false);
  let openHeat = $state(false);
</script>

<div id="bars">
  <ul>
    <li>
      <div>HP</div>
      <input
        style={character.currentHp > maxHp || character.currentHp < 0
          ? invalidText
          : ""}
        min="0"
        max={maxHp}
        bind:value={() => character.currentHp, (v) => (character.currentHp = v)}
        onfocusout={() => character.upload("currentHp", character.currentHp)}
        type="number"
      />
      <span>/ {maxHp}</span>
    </li>
    {#each Object.entries(character.bars) as bar}
      <li>
        <div>
          {#if bar[0] === "Fresh Oil"}
            <button onclick={() => (openFreshOil = !openFreshOil)}
              >{bar[0]}</button
            >
            <RulebookSnippet bind:open={openFreshOil}>
              <OilFresh />
            </RulebookSnippet>
          {:else if bar[0] === "Used Oil"}
            <button onclick={() => (openUsedOil = !openUsedOil)}
              >{bar[0]}</button
            >
            <RulebookSnippet bind:open={openUsedOil}>
              <OilSolver />
            </RulebookSnippet>
          {:else if bar[0] === "Blood"}
            <button onclick={() => (openBlood = !openBlood)}>{bar[0]}</button>
            <RulebookSnippet bind:open={openBlood}>
              <Blood />
            </RulebookSnippet>
          {:else if bar[0] === "Sanity"}
            <button onclick={() => (openSanity = !openSanity)}>{bar[0]}</button>
            <RulebookSnippet bind:open={openSanity}>
              <Sanity />
            </RulebookSnippet>
          {:else if bar[0] === "Absolute Solver"}
            <button onclick={() => (openAbsoluteSolver = !openAbsoluteSolver)}
              >{bar[0]}</button
            >
            <RulebookSnippet bind:open={openAbsoluteSolver}>
              <AbsoluteSolver />
            </RulebookSnippet>
          {:else if bar[0] === "Heat"}
            <button onclick={() => (openHeat = !openHeat)}>{bar[0]}</button>
            <RulebookSnippet bind:open={openHeat}>
              <Heat />
            </RulebookSnippet>
          {:else}
            {bar[0]}
          {/if}
        </div>
        <input
          style={character.bars[bar[0]] > getMaxBarValue(bar[0], character)
            ? invalidText
            : ""}
          bind:value={
            () => character.bars[bar[0]], (v) => (character.bars[bar[0]] = v)
          }
          min="0"
          max={getMaxBarValue(bar[0], character)}
          onfocusout={() => character.upload("bars", character.bars)}
          type="number"
        />
        / {getMaxBarValue(bar[0], character)}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #bars {
    grid-area: bars;
  }
  ul {
    margin: 0;
  }

  input {
    min-width: 3ch;
    width: 10ch;
  }
  li {
    margin-bottom: 5px;

    button {
      display: inline;
      margin-bottom: 5px;
    }
  }
</style>
