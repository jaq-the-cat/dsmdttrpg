<script>
  import Avian from "./avian/avian.svelte";
  import Disassembly from "./disassembly/disassembly.svelte";
  import Human from "./human/human.svelte";
  import Solver from "./solver/solver.svelte";
  import Worker from "./worker/worker.svelte";
</script>

<details id="human">
  <summary>Human</summary>
  <div class="gap">
    <Human />
  </div>
</details>
<details id="worker">
  <summary>Worker Drone</summary>
  <div class="gap">
    <Worker />
  </div>
</details>
<details id="solver">
  <summary>Solver Drone</summary>
  <div class="gap">
    <Solver />
  </div>
</details>
<details id="disassembly">
  <summary>Disassembly Drone</summary>
  <div class="gap">
    <Disassembly />
  </div>
</details>
<details id="avian">
  <summary>Avian Drone [NC]</summary>
  <div class="gap">
    <Avian />
  </div>
</details>

<style lang="scss">
  details .gap {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
</style>
