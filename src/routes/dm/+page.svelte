<script lang="ts">
  import { db } from "$lib/db";
  import EnemyList from "../../components/dm/EnemyList.svelte";
  import LootTable from "../../components/dm/LootTable.svelte";
  import SheetList from "../../components/dm/SheetList.svelte";
  import "./style.scss";
  import { collectionStore } from "sveltefire";

  let sheets = collectionStore(db.firestore!, "sheets");
</script>

<svelte:head>
  <title>Flesh and Oil - Overseer</title>
</svelte:head>

<main>
  <header>
    <h1>
      <a href="/items">Items</a>
      <a href="/enemies">Enemies</a>
    </h1>
  </header>

  <SheetList {sheets} />
  <LootTable {sheets} />
  <EnemyList />
</main>

<style lang="scss">
  main {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      ".      header    ."
      "sheets lootTable enemyList";
  }

  @media (max-width: 1300px) {
    main {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "header header   "
        "sheets lootTable"
        "sheets enemyList";
    }
  }

  @media (max-width: 800px) {
    main {
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      grid-template-areas:
        "header"
        "sheets"
        "lootTable"
        "enemyList";
    }
  }

  header {
    grid-area: header;
    display: flex;
    column-gap: 5px;
    width: 100%;
    justify-content: center;
  }

  h1 {
    text-align: center;
  }
</style>
