<script lang="ts">
  let { sheets = $bindable() as any, notes = $bindable() as any } = $props();

  let chosenNote = $state(0);
  let noteRef =
</script>

<!-- <Collection ref="sheets" let:data> -->
<section class="sheets">
  <h1>Campaign Notes</h1>
  <select
    bind:value={chosenNote}
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
</section>

<!-- </Collection> -->

<style lang="scss">
  .sheets {
    grid-area: sheets;

    ul {
      height: 25lh;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: start;
      overflow-y: auto;
      row-gap: 5px;
    }

    h1 {
      text-align: center;
    }

    a {
      text-align: center;
      font-size: 1.5rem;
      text-decoration: none;
      padding: 5px 0;
    }
  }
</style>
