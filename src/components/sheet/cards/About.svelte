<script lang="ts">
  import { Character } from "$lib/rpg/infra/character.svelte";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";
  import About from "../../rulebook/snippets/about.svelte";

  let { character = $bindable() as Character } = $props();
  let aboutRb = $state(false);
</script>

<div id="about">
  <RulebookSnippet title="About" bind:open={aboutRb}>
    <About />
  </RulebookSnippet>
  <ul>
    {#each Object.entries(character.about) as ss}
      <li>
        <span>{ss[0]}</span>
        <input
          bind:value={
            () => character.about[ss[0]],
            (v) => {
              if (v.length < 50) character.about[ss[0]] = v ?? "";
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
