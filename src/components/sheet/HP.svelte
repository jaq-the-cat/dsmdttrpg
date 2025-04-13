<script lang="ts">
  import { invalidText } from "$lib";
  import { Character, Species } from "$lib/rpg/character.svelte";
  import Bars from "./Bars.svelte";

  let { character = $bindable() as Character } = $props();

  let maxHp = $derived(
    character.stats.get("Vitality")! * 2 +
      (character.species === Species.Human
        ? 2
        : character.species === Species.Disassembly
          ? 6
          : 4)
  );
</script>

<div id="hp">
  <div>HP</div>
  <div id="hpDisplay">
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
  </div>
  <Bars bind:character />
</div>

<style lang="scss">
  #hp {
    grid-area: hp;
  }

  input {
    min-width: 3ch;
    width: 10ch;
  }

  #hpDisplay {
    margin-bottom: 10px;
  }
</style>
