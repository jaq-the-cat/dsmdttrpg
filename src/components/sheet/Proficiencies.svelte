<script lang="ts">
  import { invalidText } from "$lib";
  import {
    Character,
    getProfModifier,
    getProfStat,
    Species,
  } from "$lib/rpg/infra/character.svelte";
  import type { Proficiencies } from "$lib/rpg/infra/attributes.svelte";

  let { character = $bindable() as Character } = $props();

  let proficiencies = $derived(getProficienciesCount(character.proficiencies));

  function getProficienciesCount(profs: Proficiencies) {
    let prof = 0,
      exp = 0;
    Array.from(Object.values(profs)).forEach((level) => {
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
  <section class="profList">
    {#each Object.entries(character.proficiencies) as prof}
      <span>{prof[0]} [{getProfStat(prof[0])}]</span>
      <span>{getProfModifier(prof[1])}</span>
      <select
        bind:value={
          () => character.proficiencies[prof[0]],
          (v) => {
            character.proficiencies[prof[0]] = v ?? " ";
            character.upload("proficiencies", character.proficiencies);
          }
        }
      >
        {#each [" ", "P", "E"] as profLevel}
          <option value={profLevel}>{profLevel}</option>
        {/each}
      </select>
    {/each}
  </section>
</div>

<style lang="scss">
  #proficiencies {
    grid-area: proficiencies;

    .profList {
      display: grid;
      grid-template-columns: auto min-content min-content;
      align-items: center;
      row-gap: 5px;
      column-gap: 10px;
    }

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

    select {
      width: 6ch;
    }
  }
</style>
