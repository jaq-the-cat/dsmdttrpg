<script>
  import DroneDeath from "./snippets/general/death/drone.svelte";
  import HumanDeath from "./snippets/general/death/human.svelte";
  import Proficiency from "./snippets/general/proficiency.svelte";
  import Stealth from "./snippets/general/stealth.svelte";
</script>

<details>
  <summary> General Rules and Explanations </summary>
  <h2>Checks</h2>
  <p>
    Skill Checks are how most things are decided. You roll a d20 (a 20 sided
    die) and add the relevant modifier against the action's difficulty (decided
    by DM, a static value, or against an enemy's stats) and if you pass, you can
    do the action. Checks such as Explosives and Mechanics require 2 rolls, one
    after the other, and you must pass both to succeed in that action. If a
    2-roll skill is instead used for damage, pick one of the stats to roll for,
    and only roll once.
  </p>
  <Proficiency />
  <h2>Advantage</h2>
  <p>
    With Advantage, you can retry a roll, but are then forced to use the second
    value. It is gained by attacking a Stunned, Bootlooped or Unaware enemy.
  </p>
  <Stealth />
  <h2>Death</h2>
  <DroneDeath />
  <HumanDeath />
  <h2>Weight</h2>
  <p>Carrying Capacity is determined by your Species and Strength.</p>
  <p>Base Capacity at 0 Strength is 5kg.</p>
  <h2>Resting</h2>
  <p>
    Resting is basically sleeping, healing and decreasing Oil or Blood. It is
    interrupted when a member suffers damage.
  </p>
  <h3>Short Rest</h3>
  <p>
    A Short Rest lasts 2 in-Universe hours, running 1 auto-successful Regenerate
    abilities on Drones that have access to it and healing Humans and Avian
    Drones for 25% Max HP.
  </p>
  <h3>Long Rest</h3>
  <p>
    A Long Rest lasts 8 in-Universe hours, healing all party members to Max HP.
  </p>
  <h2>Hunger Damage</h2>
  <p>
    Max HP / 10 is the baseline for Hunger damage. It cannot be lower than 1. If
    the value is fractional, such as 1.5 or 2.8, truncate down to 1 and 2,
    respectively.
  </p>
  <p>
    If you start suffering Hunger damage while Out of Combat, the ticking damage
    instead happens once every real-life minute or 10m travelled.
  </p>
  <h2>Out of Combat</h2>
  <p>
    Out of Combat you can do anything you like, with no limits on movement
    besides difficult terrain which may require an Athletics or Flying check.
    Actions such as picking something up or opening a door can be done freely,
    but other things such as investigating an area, picking up something heavy
    or trying to convince an NPC to do/say something may require Skill check at
    the DM's discretion.
  </p>
  <h2>Stun/Bootloop</h2>
  <p>
    If an enemy is Stunned/Bootlooped, they cannot move or do any action for 3
    turns. A Stun can be recovered early if you suffer non-Hunger damage, a
    Bootloop cannot. If the Stun/Bootloop happens outside of combat, it lasts 15
    real-life minutes. Attacking a stunned enemy gives you Advantage.
  </p>
  <h2>Fall Damage</h2>
  <p>
    All species can take Fall Damage at a rate of 1 damage per meter above their
    Jump Speed that they fall.
  </p>
  <p>A fall from 3m deals a Human 1 Damage, because their Jump Height is 2m.</p>
  <h2>Damage Types</h2>
  <p>There are 5 types of damage: Strike, Pierce, Slash, Energy and Hunger.</p>
  <p>
    Being Vulnerable to a damage type means your HP takes the damage value +1 in
    damage.
  </p>
  <p>Being Resistant is the same, but you take -1 (minimum of 1).</p>
</details>
