<script lang="ts">
  import { invalidText } from "$lib";
  import { Character, getMaxHp, Species } from "$lib/rpg/character.svelte";

  let { character = $bindable() as Character } = $props();

  let maxHp = $derived(getMaxHp(character));

  function getMaxBarValue(value: string, character: Character) {
    if (value === "Used Oil" && character.bars.has("Absolute Solver")) {
      return 10 - character.bars.get("Absolute Solver")!;
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
    {#each character.bars as bar}
      <li>
        <div>{bar[0]}</div>
        <input
          style={character.bars.get(bar[0])! > getMaxBarValue(bar[0], character)
            ? invalidText
            : ""}
          bind:value={
            () => character.bars.get(bar[0]),
            (v) => character.bars.set(bar[0], v ?? 0)
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
