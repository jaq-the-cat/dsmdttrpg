<script lang="ts">
  let { sheets = $bindable() as any } = $props();
</script>

<!-- <Collection ref="sheets" let:data> -->
<section class="sheets">
  <h1>Sheets</h1>
  <ul>
    {#each $sheets as sheet}
      <a class="buttonStyle" href="/sheet/{sheet.id}">
        <span>{sheet.about.at(0).value}</span>
        <span>[{sheet.species}]</span>
      </a>
    {/each}
  </ul>
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
