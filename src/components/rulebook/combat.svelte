<script>
  import Actions from "./snippets/combat/actions.svelte";
  import Critical from "./snippets/combat/critical.svelte";
  import Enemies from "./snippets/combat/enemies.svelte";
  import GeneralCombat from "./snippets/combat/generalCombat.svelte";
  import Reactions from "./snippets/combat/reactions.svelte";
  import Weapons from "./snippets/combat/weapons.svelte";
</script>

<details>
  <summary>Combat</summary>
  <GeneralCombat />
  <Enemies />
  <Actions />
  <Reactions />

  <Weapons />
  <Critical />
</details>
