<script lang="ts">
  import { Species } from "$lib/rpg/character.svelte";
  import { species } from "$lib/rpg/rules.svelte";

  let selectedSpecies = $state(Species.Human);
  let rules = $derived(species[selectedSpecies]);
</script>

<section id="species">
  <h1>Species</h1>
  <select bind:value={selectedSpecies}>
    {#each Object.entries(Species) as entry}
      <option value={entry[0]}>{entry[1]}</option>
    {/each}
  </select>
  <h2>Stats</h2>
  <ul>
    {#each Object.entries(rules.stats) as stat}
      <li>
        <span>{stat[0]}</span>
        <span>{stat[1]}</span>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  select {
    margin-top: 5px;
    font-size: 1.5rem;
  }
</style>
