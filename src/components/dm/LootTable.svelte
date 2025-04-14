<script lang="ts">
  import { db } from "$lib/db";
  import { AmmoItem, Container } from "$lib/rpg/items.svelte";
  import { getLoot, type WhatLoot } from "$lib/rpg/loot.svelte";
  import { prefabs } from "$lib/rpg/objectLists.svelte";
  import { setDoc, doc } from "firebase/firestore";
  import { docStore } from "sveltefire";

  let selectedTables = $state(
    Array.from(Object.keys(prefabs)).map(
      (key) => [key, true] as [string, boolean]
    )
  );
  let investigation = $state(0);
  let generated: [string, WhatLoot] | null = $state(null);
  let genFailed = $state(false);

  let { sheets = $bindable() as any } = $props();
  let chosenSheet: string | null = $state(null);
  let characterDoc: any = $state(null);
  let chosenContainer: number = $state(0);

  let docRef = docStore(db.firestore!, `sheets/none`);

  function generate() {
    const result = getLoot(
      investigation,
      selectedTables.filter((t) => t[1]).map((t) => t[0])
    );
    if (result) {
      generated = result;
      genFailed = false;
    } else {
      genFailed = true;
    }
  }

  function giveItem(sheet: string | null, item?: WhatLoot) {
    if (!characterDoc || !sheet || !item) return;
    if ("carry" in item) {
      characterDoc.containers.push(item.clone());
    } else {
      characterDoc.containers[chosenContainer].inventory.push(
        item.clone().serialize()
      );
    }
    setDoc(
      doc(db.firestore!, "sheets", chosenSheet!),
      { containers: characterDoc.containers },
      { merge: true }
    );
  }
</script>

<section id="lootTable">
  <h1>Loot Table</h1>
  {#each selectedTables as table, index}
    <li>
      <input type="checkbox" bind:checked={selectedTables[index][1]} />
      <span>{table[0]}</span>
    </li>
  {/each}
  <span>Roll</span> <input bind:value={investigation} type="number" />
  <button class="generate" onclick={generate}>Generate</button>
  {#if genFailed}
    <h2 class="generated notFound">No Items Found</h2>
  {:else if generated}
    <div class="found">
      <div class="generated">
        <h2 class="item">{generated[1]}</h2>
        {#if "ammo" in generated[1]}
          <span>
            <input
              class="currentInput"
              type="number"
              bind:value={generated[1].ammo!.current}
              min="0"
              max={generated[1].ammo!.capacity as number}
              step={generated[1].ammo!.type === "liquid" ? 0.1 : 1}
            />
            / {generated[1].ammo!.capacity}
          </span>
        {:else if "current" in generated[1] && "capacity" in generated[1]}
          <span>
            <input
              class="currentInput"
              type="number"
              bind:value={generated[1].current}
              min="0"
              max={generated[1].capacity as number}
              step={generated[1].type === "liquid" ? 0.1 : 1}
            />
            / {generated[1].capacity}
            {generated[1].type === "liquid" ? "L" : ""}
          </span>
        {/if}
        <h3 class="table">{generated[0]}</h3>
      </div>
      <div class="give">
        <select
          bind:value={chosenSheet}
          onchange={() => {
            docRef = docStore(db.firestore!, `sheets/${chosenSheet}`);
            docRef.subscribe((value) => {
              characterDoc = value;
              if (value.id !== characterDoc.id) chosenContainer = 0;
            });
          }}
        >
          {#each $sheets as sheet}
            <option value={sheet.id}>
              {sheet.about.at(0).value}
            </option>
          {/each}
        </select>
        {#if characterDoc}
          <select bind:value={chosenContainer}>
            {#each characterDoc.containers! as container, index}
              <option value={index}>
                {Container.deserialize(container)}
              </option>
            {/each}
          </select>
        {/if}
        <button onclick={() => giveItem(chosenSheet, generated![1])}
          >Give</button
        >
      </div>
    </div>
  {/if}
</section>

<style lang="scss">
  #lootTable {
    grid-area: lootTable;
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    .currentInput {
      min-width: 10ch;
      margin-bottom: 10px;
    }

    .give {
      margin-top: 10px;
      gap: 5px;
      display: grid;
      grid-template-columns: 1fr 1fr;

      button {
        grid-column: 1 / 3;
      }
    }

    h1 {
      text-align: center;
    }

    h2,
    h3 {
      margin: 0;
      padding: 10px;
    }

    button.generate {
      margin-top: 5px;
      padding: 10px 0;
    }

    .generated {
      margin-top: 5px;
      text-align: center;
      border: 1px solid #9fe644;
    }

    .generated.notFound {
      padding: 10px;
    }

    .found {
      .generated {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        align-items: center;
      }

      .table {
        border-top: 1px solid #9fe644;
      }
    }
  }
</style>
