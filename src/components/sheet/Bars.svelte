<script lang="ts">
  import { invalidText } from "$lib";
  import { Character } from "$lib/rpg/character.svelte";

  let { character = $bindable() as Character } = $props();

  function getMaxBarValue(value: string, character: Character) {
    if (value === "Used Oil" && character.bars.has("Absolute Solver")) {
      return 10 - character.bars.get("Absolute Solver")!;
    }
    return 10;
  }
</script>

<ul>
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

<style lang="scss">
  input {
    min-width: 3ch;
    width: 10ch;
  }
  li {
    margin-bottom: 5px;
  }
</style>
