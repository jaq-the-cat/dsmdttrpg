<script>
  import Avian from "./avian/avian.svelte";
  import Disassembly from "./disassembly/disassembly.svelte";
  import Human from "./human/human.svelte";
  import Solver from "./solver/solver.svelte";
  import Worker from "./worker/worker.svelte";
</script>

<details id="human">
  <summary>Human</summary>
  <Human />
</details>
<details id="worker">
  <summary>Worker Drone</summary>
  <Worker />
</details>
<details id="solver">
  <summary>Solver Drone</summary>
  <Solver />
</details>
<details id="disassembly">
  <summary>Disassembly Drone</summary>
  <Disassembly />
</details>
<details id="avian">
  <summary>Avian Drone [NC]</summary>
  <Avian />
</details>
