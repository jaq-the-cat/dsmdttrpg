<script>
  import "./rulebook.scss";
  import Species from "../../components/rulebook/snippets/species/species.svelte";
  import Combat from "../../components/rulebook/combat.svelte";
  import CharacterCreation from "../../components/rulebook/characterCreation.svelte";
  import General from "../../components/rulebook/general.svelte";
  import Skills from "../../components/rulebook/snippets/general/skills.svelte";
  import Attributes from "../../components/rulebook/snippets/general/attributes.svelte";
</script>

<svelte:head>
  <title>Flesh and Oil - Rulebook</title>
</svelte:head>

<main>
  <h1>Murder Drones: Flesh &amp; Oil Rulebook</h1>
  <p>Items marked with [NC] are Non-Canon</p>

  <details>
    <summary>Attributes</summary>
    <Attributes />
  </details>

  <details>
    <summary>Skills</summary>
    <Skills />
  </details>

  <Species />

  <CharacterCreation />

  <Combat />

  <General />
</main>
