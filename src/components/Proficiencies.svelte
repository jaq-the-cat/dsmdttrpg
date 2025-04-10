<script lang="ts">
  import { invalidText } from "$lib";
  import {
    Character,
    getProfModifier,
    getProfStat,
    Species,
  } from "$lib/characters/base.svelte";
  import { SvelteMap } from "svelte/reactivity";

  let { character = $bindable() as Character } = $props();

  let modifiers = new SvelteMap([]);

  let proficiencies = $derived(getProficienciesCount(character.proficiencies));

  function getProficienciesCount(profList: SvelteMap<string, string>) {
    let prof = 0,
      exp = 0;
    Array.from(profList.values()).forEach((level) => {
      if (level === "P") prof += 1;
      else if (level === "E") exp += 1;
    });
    return [prof, exp];
  }

  const proficiencyCap = 4;
  let expertCap = $derived(character.species === Species.Worker ? 3 : 2);
</script>

<div id="proficiencies">
  <h2>Proficiencies</h2>
  <div>
    <p>
      <span>Proficient</span>
      <span>
        <span style={proficiencies[0] > proficiencyCap ? invalidText : ""}
          >{proficiencies[0]}</span
        >
        / {proficiencyCap}
      </span>
    </p>
    <p>
      <span>Expert</span>
      <span>
        <span style={proficiencies[1] > expertCap ? invalidText : ""}
          >{proficiencies[1]}</span
        >
        / {expertCap}
      </span>
    </p>
  </div>
  <ul>
    {#each character.proficiencies as prof}
      <li>
        <span>{prof[0]} [{getProfStat(prof[0])}]</span>
        <span>
          <span>{modifiers.get(prof[0])}</span>
          <select
            bind:value={
              () => character.proficiencies.get(prof[0]),
              (v) => {
                character.proficiencies.set(prof[0], v ?? " ");
                modifiers.set(prof[0], getProfModifier(v ?? " "));
              }
            }
          >
            {#each [" ", "P", "E"] as profLevel}
              <option value={profLevel}>{profLevel}</option>
            {/each}
          </select>
        </span>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #proficiencies {
    grid-area: proficiencies;

    > div > p {
      display: flex;
      justify-content: space-between;
    }

    h2 {
      margin: 0;
    }

    p {
      display: block;
      margin: 5px 0 5px 0;
    }

    ul li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    select {
      width: 6ch;
    }
  }
</style>
