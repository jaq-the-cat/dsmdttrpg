<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/infra/character.svelte";

  let { character = $bindable() as Character } = $props();

  let maxHp = $derived(character.getMaxHp());

  function getMaxBarValue(value: string, character: Character) {
    if (value === "Used Oil" && "Absolute Solver" in character.bars) {
      return 10 - character.bars["Absolute Solver"];
    }
    return 10;
  }
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
        <div>{bar[0]}</div>
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
  }
</style>
