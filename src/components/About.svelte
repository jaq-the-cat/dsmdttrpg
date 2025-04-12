<script lang="ts">
  import { Character } from "$lib/rpg/character.svelte";

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
            (v) => {
              character.about.set(ss[0], v ?? "");
            }
          }
          onfocusout={() => character.upload("about", character.about)}
          type="text"
        />
      </li>
    {/each}
  </ul>
  <h2>Appearance</h2>
  <textarea
    class="appearance"
    bind:value={character.appearance}
    onfocusout={() => character.upload("appearance", character.appearance)}
  ></textarea>
  <h2>Biography</h2>
  <textarea
    class="bio"
    bind:value={character.biography}
    onfocusout={() => character.upload("biography", character.biography)}
  ></textarea>
</div>

<style lang="scss">
  #about {
    grid-area: about;
    display: flex;
    flex-direction: column;
    gap: 5px;

    h2 {
      margin: 0;
    }

    ul {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }

    li {
      display: flex;
      justify-content: space-between;
    }

    .appearance {
      height: 5lh;
    }

    .bio {
      flex-grow: 2;
    }
  }
</style>
