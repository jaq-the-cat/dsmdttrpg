<script>
  import "./rulebook.scss";
  import Species from "../../components/rulebook/species.svelte";
  import Combat from "../../components/rulebook/combat.svelte";
  import CharacterCreation from "../../components/rulebook/characterCreation.svelte";
  import SkillsAndAttributes from "../../components/rulebook/skillsAndAttributes.svelte";
  import General from "../../components/rulebook/general.svelte";
</script>

<svelte:head>
  <title>Flesh and Oil - Rulebook</title>
</svelte:head>

<main>
  <h1>Murder Drones: Flesh &amp; Oil Rulebook</h1>
  <p>Items marked with [NC] are Non-Canon</p>

  <SkillsAndAttributes />

  <Species />

  <CharacterCreation />

  <Combat />

  <General />
</main>
