<script lang="ts">
  import { enemyLists } from "$lib/rpg/enemy.svelte";
  import type { Item } from "$lib/rpg/items.svelte";
  import WeaponInspect from "./WeaponInspect.svelte";

  let selectedEnemyList: string = $state("Humans");
  let enemies = $derived(Object.entries(enemyLists[selectedEnemyList]));

  let itemInspect: Item | null = $state(null);
</script>

<section id="enemyList">
  <h1>Enemy List</h1>
  <select bind:value={selectedEnemyList}>
    {#each Object.keys(enemyLists) as enemyListKey}
      <option value={enemyListKey}>{enemyListKey}</option>
    {/each}
  </select>
  {#if selectedEnemyList}
    {#each enemies as enemy}
      <h2>{enemy[0]}</h2>
      <div class="details">
        <h4>Max HP:</h4>
        <div>{enemy[1].maxHp}</div>
        {#if enemy[1].guaranteedWeapons.length > 0}
          <h4>Guaranteed Weapons:</h4>
          <div class="wpnList">
            {#each enemy[1].guaranteedWeapons as weapon}
              <button onclick={() => (itemInspect = weapon)}
                >{weapon.name}</button
              >
            {/each}
          </div>
        {/if}
        {#if enemy[1].possibleWeapons.length > 0}
          <h4>Possible Weapons:</h4>
          <div class="wpnList">
            {#each enemy[1].possibleWeapons as weapon}
              <button onclick={() => (itemInspect = weapon)}
                >{weapon.name}</button
              >
            {/each}
          </div>
        {/if}
        <h4>Stat Bonuses</h4>
        <div>
          {#each enemy[1].stats as stat}
            <div>+{stat[1]} {stat[0]}</div>
          {/each}
        </div>
        <h4>Innate</h4>
        <div>
          {#each enemy[1].passive as stat}
            <div>{stat[1]} {stat[0]}</div>
          {/each}
        </div>
      </div>
    {/each}
  {/if}
</section>

<WeaponInspect bind:itemInspect />

<style lang="scss">
  #enemyList {
    grid-area: enemyList;
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    h2,
    h4 {
      margin: 0;
    }

    .details {
      display: grid;
      column-gap: 1ch;
      row-gap: 5px;
      grid-template-columns: max-content auto;

      .wpnList {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
      }
    }
  }
</style>
