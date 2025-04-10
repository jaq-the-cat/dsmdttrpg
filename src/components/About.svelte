<script lang="ts">
  import { Character, Species } from "$lib/characters/base.svelte";
  import { set } from "firebase/database";

  let { character = $bindable() as Character } = $props();
</script>

<div id="about">
  <h2>About</h2>
  <ul>
    {#each character.about as ss}
      <li>
        <span>{ss[0]}</span>
        <input
          bind:value={
            () => character.about.get(ss[0]),
            (v) => character.about.set(ss[0], v ?? "")
          }
          type="text"
        />
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
