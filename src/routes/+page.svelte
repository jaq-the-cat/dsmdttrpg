<script lang="ts">
  import Sheet from "../components/Sheet.svelte";
</script>

<Sheet />

<style lang="scss">
  * {
    font-family: "Courier New", Courier, monospace;
  }

  :global(.separator) {
    border: 0;
    height: 0;
    margin: 0;
    padding: 0;
    display: block;
    height: 15px;
  }

  :global(main) {
    :global(h2) {
      margin: 0 0 10px 0;
    }

    :global(ul) {
      margin: 0;
      padding: 0;
      min-height: 100px;
      list-style-type: none;
    }

    > :global(div) {
      padding: 20px;
      border: 1px solid #9fe644;
      box-shadow: 2px 2px 4px 0 #9fe644;
    }
  }
</style>
