<script>
  import "./rulebook.scss";
  import Species from "../../components/rulebook/species.svelte";
</script>

<svelte:head>
  <title>Flesh and Oil - Rulebook</title>
</svelte:head>

<main>
  <h1>Murder Drones: Flesh &amp; Oil Rulebook</h1>
  <p>Items marked with [NC] are Non-Canon</p>
  <details>
    <summary>Attributes</summary>
    <p>
      Attributes go from 0 to 10, and give +1 to the relevant Dice roll per
      level, starting at -4. (10 gives +6)
    </p>
    <ul>
      <li>Vitality</li>
      <li>Agility</li>
      <li>Strength</li>
      <li>Dexterity</li>
      <li>Charisma</li>
      <li>Perception</li>
      <li>Intelligence</li>
    </ul>
  </details>
  <details>
    <summary>Skills</summary>
    <p>
      Skills have the same roll bonus as the parent Stat (from -4 to +6), but
      can be further modified by having Proficiency, Expertise or something else
      affecting that check, such as Advantage.
    </p>
    <p>
      Your Passive Perception is your Perception Stat plus your Perception
      modifier, up to 14.
    </p>
    <p>
      Your Passive Dodge is your Agility Stat plus your Agility Modifier, up to
      14.
    </p>
    <ul>
      <li>Athletics (Vitality)</li>
      <li>Acrobatics (Agility)</li>
      <li>Stealth (Agility)</li>
      <li>
        Flying (Agility)
        <ul>
          <li>Exclusive to Solver, Disassembly Drones and Avian Drones</li>
        </ul>
      </li>
      <li>Melee (Strength or Dexterity)</li>
      <li>Firearms (Dexterity)</li>
      <li>Persuasion (Charisma)</li>
      <li>Intimidation (Charisma)</li>
      <li>Investigation (Perception)</li>
      <li>Knowledge (Intelligence)</li>
      <li>Technology (Intelligence)</li>
      <li>Explosives (Intelligence + Dexterity)</li>
      <li>Medicine (Intelligence + Dexterity)</li>
      <li>Mechanics (Intelligence + Dexterity)</li>
      <li>
        Willpower (highest of Strength, Charisma or Intelligence)
        <ul>
          <li>Exclusive to Solver-enabled Drones</li>
        </ul>
      </li>
    </ul>
  </details>

  <Species />

  <details>
    <summary>Character Creation</summary>
    <p>
      Point Buy system. You have 42 points which you can distribute across your
      Stats.
    </p>
    <p>Pick Proficiency in 2 skills and Expertise in 1.</p>
    <p>
      You gain more Proficiency and Expertise by getting a Nat 20 in a Skill
      check or reading a Manual, up to a total of 2 Expert skills and 4
      Proficient skills.
    </p>
    <p>
      Worker Drones can pick an extra Expertise during Character Creation, and
      have a cap of 3 instead of 2. They keep this if turned into Solver Drones.
    </p>
    <p>
      Describe your character's appearance and backstory in as much detail as
      you'd like, including how they got to the Campaign's setting (given to you
      by the DM prior to its start).
    </p>
    <p>
      Only Disassembly Drones can have Yellow visor color at the start of the
      game.
    </p>
    <p>
      You should also describe your character's personality and Alignment, going
      from Lawful Good to True Neutral to Chaotic Evil. Humans and Workers who
      start the game as Chaotic Evil are automatically Insane.
    </p>
  </details>

  <details>
    <summary> General Rules and Explanations </summary>
    <h2>Checks</h2>
    <p>
      Skill Checks are how most things are decided. You roll a d20 (a 20 sided
      die) and add the relevant modifier against the action's difficulty
      (decided by DM, a static value, or against an enemy's stats) and if you
      pass, you can do the action.Checks such as Explosives and Mechanics
      require 2 rolls, one after the other, and you must pass both to succeed in
      that action. If a 2-roll skill is instead used for damage, pick one of the
      stats to roll for, and only roll once.
    </p>
    <h2>Combat, Actions and Reactions</h2>
    <p>
      When Combat begins, every member rolls an Initiative roll, which
      determines the order at which turns are taken (higher being earlier).
    </p>
    <p>
      During your turn, you have 4 Actions, which can be an attack, movement,
      weapon swap, attempt to hide, etc. You can attempt any action in any
      order, but may only succeed once. You get an extra Reaction if you don't
      attack during your turn, up to 5.
    </p>
    <p>
      Remaining actions can be used in between turns as Reactions. If you
      Attempt 2 Attacks and end your turn, you have 1 Reaction remaining. If you
      move, swap weapons, and attack, you don't have any reactions.
    </p>
    <p>
      A Reaction can be an Attack of Opportunity, which you can do when an enemy
      tries to run away from you, dodging or blocking.
    </p>
    <h2>Blocking and Dodging</h2>
    <p>
      If someone uses an Action to attack you, and you have something to block
      with, you can try a block check against their hit check. If you don't, and
      it is not a Tracking weapon, you can try an Acrobatics check or Flying
      check (if you are in the air) against their hit check to dodge. Dodging or
      Blocking uses a Reaction.
    </p>

    <h2>Proficiency and Expertise</h2>
    <p>
      With Proficiency, you get a +2 bonus to the relevant roll. With Expertise,
      the bonus is +3.
    </p>
    <h2>Advantage</h2>
    <p>
      With Advantage, you can roll twice and pick the higher value. It is gained
      by attacking a Stunned or Bootlooped enemy.
    </p>
    <h2>Critical Hits</h2>
    <p>
      A Critical Hit is an attack that deals double damage. It happens when the
      player rolls a Nat 20 on their hit check or when they attack from Stealth.
    </p>
    <h2>Stealth</h2>
    <p>
      Stealth is an important aspect of this game. Attacks coming from hiding
      deal a Critical Hit and cannot be blocked or dodged. If it is the first
      round of turns in combat, and you begin hidden, you automatically get the
      first turn. If you then also get a higher Initiative roll than your
      opponent, you get to have a second turn before the enemy can retaliate,
      but this time out of Stealth. This stacks with multiple hidden members of
      a party, with you being able to take 4 turns (2 from Stealth, 2 from
      higher Initiative) with 2 members before the enemy gets their own.
    </p>
    <h2>Rate</h2>
    <p>
      Rate in a Weapon description means how many times it can hit per turn,
      with the user having to roll hit and/or damage for each hit. Every
      subsequent hit deals 1 less damage, down to 1.
    </p>
    <h2>Melee Weapons</h2>
    <p>
      Melee weapons only need to do a hit check if the attack is being blocked
      or dodged, but they have to do a damage check in return.
    </p>
    <h2>Ranged Weapons</h2>
    <p>
      Ranged Weapons must first hit, then they can deal damage. The difficulty
      is based on the target's Passive Dodge. Capacity means how many times the
      gun can be shot until having to be reloaded or replaced with a different
      Arm Weapon.
    </p>
    <h2>Death</h2>
    <h3>Drones</h3>
    <p>
      Reaching 0 HP by taking exterior damage (not Hunger) and while not under
      the influence of the Solver puts you in a Dead state. You can come back if
      your core is carefully extracted and put in a new body by a Drone with
      Proficiency or Expertise in Mechanics.
    </p>
    <p>
      The extraction process requires a Work Hammer, Screwdriver and Bone Saw
      and the insertion process requires a Work Hammer, Screwdriver, Bone Saw,
      Industrial-Grade Glue and 2x Screws.
    </p>
    <p>
      An extracted core can be kept alive by being fed 1x Fresh or Used Oil
      (depending on which they need) every 30 minutes of real-life time. Failing
      to do so kills that Drone permanently.
    </p>
    <h3>Humans</h3>
    <p>
      Reaching 0 HP by taking exterior damage (not Hunger) puts you in a Downed
      state. You can roll for recovery up to 3 times per Downed state. A
      different player can also try to help you using their Medicine bonus.
      Difficulty is 10 + your Vitality modifier. If successful, revive at 1 HP.
    </p>
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
      A Short Rest lasts 2 in-Universe hours, running 1 auto-successful
      Regenerate abilities on Drones that have access to it and healing Humans
      for 50% Max HP.
    </p>
    <h3>Long Rest</h3>
    <p>
      A Long Rest lasts 8 in-Universe hours, healing all party members to Max
      HP.
    </p>
    <h2>Hunger Damage</h2>
    <p>
      Max HP / 10 is the baseline for Hunger damage. It cannot be lower than 1.
      If the value is fractional, such as 1.5 or 2.8, truncate down to 1 and 2,
      respectively.
    </p>
    <p>
      If you start suffering Hunger damage while Out of Combat, the ticking
      damage instead happens once every real-life minute or 10m travelled.
    </p>
    <h2>Out of Combat</h2>
    <p>
      Out of Combat you can do anything you like, with no limits on movement
      besides difficult terrain which may require an Athletics or Flying check.
      Actions such as picking something up or opening a door can be done freely,
      but other things such as investigating an area, picking up something heavy
      or trying to convince an NPC to do/say something may require Skill check
      at the DM's discretion.
    </p>
    <h2>Stun/Bootloop</h2>
    <p>
      If an enemy is Stunned/Bootlooped, they cannot move or do any action for 3
      turns. A Stun can be recovered early if you suffer non-Hunger damage, a
      Bootloop cannot. If the Stun/Bootloop happens outside of combat, it lasts
      15 real-life minutes.
    </p>
    <h2>Fall Damage</h2>
    <p>
      All species can take Fall Damage at a rate of 1 damage per meter above
      their Jump Speed that they fall.
    </p>
    <p>
      A fall from 3m deals a Human 1 Damage, because their Jump Height is 2m.
    </p>
    <h2>Damage Types</h2>
    <p>
      There are 5 types of damage: Strike, Pierce, Slash, Energy and Hunger.
    </p>
    <p>
      Being Vulnerable to a damage type means your HP takes the damage value +1
      in damage.
    </p>
    <p>Being Resistant is the same, but you take -1 (minimum of 1).</p>
  </details>
</main>
