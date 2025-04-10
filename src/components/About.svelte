<script lang="ts">
  import { Character, Species } from "$lib/characters/base.svelte";

  let { character = $bindable() as Character } = $props();
</script>

<div id="about">
  <h2>About</h2>
  <ul>
    {#each character.about as ss}
      <li>
        <span>{ss[0]}</span>
        <input type="text" value={ss[1]} />
      </li>
    {/each}
  </ul>
  <h2>Biography</h2>
  <textarea bind:value={character.biography}></textarea>
  <h2>Features & Abilities</h2>
  <textarea bind:value={character.fna}></textarea>
</div>

<style lang="scss">
  #about {
    grid-area: about;
    display: flex;
    flex-direction: column;

    ul {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }

    li {
      display: flex;
      justify-content: space-between;
    }

    textarea {
      height: 10lh;
      resize: vertical;
    }
  }
</style>
