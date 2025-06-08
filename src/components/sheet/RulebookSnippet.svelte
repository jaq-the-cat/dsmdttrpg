<script lang="ts">
  let { open = $bindable(true), children } = $props();
</script>

<div class="modal inspect" style={open ? "" : "display: none"}>
  {@render children?.()}
</div>

<style lang="scss">
  .modal {
    grid-area: equipment;
    width: 75%;
    margin-top: 5rem;
    align-self: flex-start;
    justify-self: center;
    opacity: 95%;
    background-color: #080e00;
    padding: 20px;
    border: 1px solid #9fe644;
    box-shadow: 2px 2px 4px 0 #9fe644;
    display: flex;
    flex-direction: column;

    row-gap: 5px;
  }
</style>
