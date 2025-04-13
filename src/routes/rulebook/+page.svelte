<script>
  import "./style.scss";
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
      affecting that check, such as Advantage.Your Passive Perception is your
      Perception Stat plus your Perception modifier, up to 14.Your Passive Dodge
      is your Agility Stat plus your Agility Modifier, up to 12.
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
    <summary>Abilities</summary>
    <h2>Solver-enabled Drones</h2>
    <h3>Eat</h3>
    <p>
      Can be used on a dead body (Human or Drone) to drain their entire Used Oil
      or Blood reserve at once. Eating someone during combat takes 3 turns to
      complete.Increases Heat by 2.
    </p>
    <h3>Bite</h3>
    <p>
      Melee, 1d8 + Strength Slash damage. If used on a Worker Drone, remove 1
      Fresh Oil and drain 2 Used Oil. If used on a Human, remove 1 Blood and
      drain 1 Blood.If the target consents to the bite, damage is 1.<br
      />Increases Heat by 1.
    </p>
    <h3>Regenerate (Absolute Solver > 1)</h3>
    <p>
      Regenerate your wounds with an Absolute Solver roll.Difficulty is your
      missing HP / 2, up to 14.Regenerate roll + Absolute Solver value worth of
      HP.
    </p>
    <h2>Solver Drones</h2>
    <h3>Solver Translate (Absolute Solver > 1)</h3>
    <p>
      Move any object, non-Solver Drone or Human within 5 meters up to 5 meters
      from your position, or throw it up to 10 meters in any direction from the
      object's original position.
    </p>
    <h3>Solver Transform (Absolute Solver > 1)</h3>
    <p>
      Crush any object within 5 meters, destroying it or dealing Energy damage
      based on your Absolute Solver modifier. For hard-to-crush objects such as
      metal doors, the check uses the Absolute Solver stat too.
    </p>
    <h3>Solver Teleport (Absolute Solver > 3)</h3>
    <p>
      During Combat, teleport anywhere you can see within 15m with an Absolute
      Solver roll of difficulty 5 + distance in meters.Out of Combat, teleport
      anywhere you can see within 15m for free or anywhere you've been before
      with an Absolute Solver roll of 16 difficulty.
    </p>
    <h3>Wings (Absolute Solver > 2)</h3>
    <p>Must be activated using an Action.</p>
    <p>Permits flight, may also be used as a weapon or shield.</p>
    <p>Melee, 1d6 + Strength +1 Strike damage</p>
    <p>Block -1 difficulty</p>
    <h3>Solver Tail (Absolute Solver > 2)</h3>
    <p>+1 Successful Attacks if hit.</p>
    <p>May be used as an extra limb, flashlight or a weapon.</p>
    <p>Lights up to 10 meters in front of the user in a cone.</p>
    <p>Melee, 1d6 + Strength Slash damage, range 2m.</p>
    <h3>[null] (Absolute Solver > 4)</h3>
    <p>
      Instantly erases any object within 5 meters or deals unblockable (Absolute
      Solver value)d3 + 2 Energy damage to an enemy.Increases Heat and Absolute
      Solver by 1 each time it is used.
    </p>
    <h2>Disassembly Drones</h2>
    <p>Switching from Hands while holding something in that hand drops it.</p>
    <h3>Available Arm Weapons</h3>
    <p>
      Hands/Fists, Claws, Sword, Chainsaw, Submachine Gun, Laser, Missile,
      Freakin' Ninja Star, EMP, Toy Items (Bubble Blower, Flag, etc.)
    </p>
    <h3>Wings</h3>
    <p>Must be activated using an Action.</p>
    <p>Permits flight, may also be used as a weapon or shield.</p>
    <p>1d6 + Strength +1 Strike damage</p>
    <p>Block -1 difficulty</p>
    <h3>Nanite Acid Stinger</h3>
    <p>+1 Successful Attacks if hit.</p>
    <p>Cannot be Blocked.</p>
    <p>
      Melee, 1 damage per turn for 1d10 turns or until licked by a Disassembly
      Drone, range 2m.
    </p>
    <h2>Humans</h2>
    <h3>Eat (Insane)</h3>
    <p>
      Can be used on a dead body (Human) to drain their entire Blood reserve at
      once. Eating someone during combat takes 2 turns to complete.
    </p>
    <h3>Bite (Insane)</h3>
    <p>
      Melee, 1d4 + Strength Slash damage. Can be used on a Human to drain 2
      Blood.If the target consents to the bite, damage is 1.
    </p>
    <h2>Worker Drones</h2>
    <p>
      Worker Drones get a free Expertise and increase their Expertise cap to 3.
      They lose this if they become a Solver Drone.
    </p>
    <h3>Eat (Insane)</h3>
    <p>
      Can be used on a dead body (Drone) to drain their entire Fresh Oil reserve
      at once. Eating someone during combat takes 2 turns to complete.
    </p>
    <h3>Bite (Insane)</h3>
    <p>
      Melee, 1d6 + Strength Slash damage. If used on a Worker Drone, drain 2
      Fresh Oil. If used on a Human, drain 2 Blood.If the target consents to the
      bite, damage is 1.
    </p>
    <h2>Avian Drones</h2>
    <h3>Wings</h3>
    <p>Can be activated without spending an Action.</p>
    <p>Permits flight, but may not be used as a weapon or shield.</p>
    <p>When active, temporarily increases Agility by +1.</p>
    <h3>Small Claws</h3>
    <p>Melee, 1d6 + Strength + 1 Slash damage.</p>
    <h3>Talon Dive</h3>
    <p>
      <em>Must be initiated from flight.</em>Melee, 1d6 + Strength + 2 Slash
      damage.When used, move a maximum of 20 meters horizontally in the
      direction of the target.
    </p>
    <h3>Talon Strike</h3>
    <p>Melee, 1d6 + Strength + 1 Slash damage.</p>
  </details>
  <details>
    <summary>Special Mechanics</summary>
    <h2>Heat</h2>
    <p>
      Certain actions may build Heat, or Heat may be generated to improve an
      action.
    </p>
    <ul>
      <li>Using any Solver Power increases Heat by 1.</li>
      <li>Failing any check increases Heat by 1.</li>
      <li>Rolling a Nat 1 increases Heat by 2.</li>
      <li>
        A Disassembly Drone switching to another Weapon (besides Hand) increases
        Heat by 1.
      </li>
      <li>A Solver Drone activating their Wings increases Heat by 1.</li>
      <li>
        1 Heat may be spent before rolling to lower the Difficulty of any action
        by 1
      </li>
      <li>At 8 Heat or above, gain 1 Absolute Solver per turn.</li>
    </ul>
    <p>
      At max Heat, take Max HP / 10 damage per turn until Heat is lowered or
      dead.
    </p>
    <h2>Oil/Blood</h2>
    <p>
      Worker Drones and Avian Drones have a Fresh and Used Oil reserve of 10.
      They turn 2 Fresh Oil into 2 Used Oil during a Short Rest and 5 Fresh Oil
      into 5 Used Oil during a Long Rest. They can replenish their Fresh Oil by
      drinking from a Fresh Oil reserve or by eating Batteries at a rate of 1
      Fresh Oil per Battery. They can dump their current Used Oil reserve by
      using the Bathroom.Whenever they take damage, they roll a 1d(Total
      Damage). They lose that amount in Fresh Oil.
    </p>
    <p>
      At 0 Fresh Oil, take Max HP / 10 damage per turn until death or
      replenishment.At 10 Used Oil, take Max HP / 10 damage per turn until death
      or replenishment.
    </p>
    <p>
      Humans have a Blood reserve of 10. They spend 1 Blood during a Short Rest
      and 2 Blood during a Long Rest. Their source is fresh water and human
      food. A slice of Bread or cup of Water replenishes 2 Blood. Due to the
      variety of Human foods, the DM can choose how much Blood other kinds
      replenish, but these are the baselines. Blood can be used to Heal at a
      rate of 1 Blood to 2 HP. You cannot attack in the same turn you use to
      Heal using Blood.
    </p>
    <p>
      At 0 Blood, take Max HP / 10 damage per turn until death or replenishment.
    </p>
    <p>
      Solver-enabled Drones have a reserve of (10 - Absolute Solver level) Used
      Oil. They spend 2 Used Oil during a Short Rest and 5 Used Oil during a
      Long Rest, and have the option of spending 1 Used Oil to bring Heat and
      Absolute Solver down by 2. They can replenish their Used Oil by using Bite
      (with or without consent) on a Drone or a Human at a rate of 1 Blood to 1
      Used Oil or by using Eat on a dead body.At 0 Used Oil, the Drone gains 1
      Heat per turn.
    </p>
    <h2>Absolute Solver</h2>
    <p>
      Solver-enabled Drones have a special attribute called Absolute Solver. The
      higher it is, the less max Used Oil they can store. If it reaches 10, the
      Drone has to roll a Willpower check at difficulty 14. If failed, they fall
      under the influence of the Solver. While under its influence, they become
      an enemy. They can come back to normal if another person succeeds in a
      Persuasion check. If they have an emotional connection (partner, family
      member, etc) to the Drone under the influence of the Solver, gain
      Advantage.An Absolute Solver roll is different from regular Stats, going
      from +0 at 0 to +5 at 10.
    </p>
    <p>The following elements increase Absolute Solver by +1.</p>
    <ul>
      <li>Seeing a new oil/blood spill while at 4+ Heat.</li>
      <li>Seeing a Worker Drone or Human while at 7+ Heat.</li>
      <li>
        Experiencing a Traumatic Event or other kinds of emotional distress.
      </li>
      <li>Failing to use a Solver power.</li>
      <li>
        Having Absolute Solver above 8 turns the Drone's visor color to Yellow.
      </li>
    </ul>
    <h2>Sunlight</h2>
    <p>
      Solver-enabled Drones take Max HP / 10 Hunger damage when out in the Sun
      or when exposed to other sources of UV Radiation.
    </p>
    <h2>Core Crab</h2>
    <p>
      Solver-enabled Drones can have their cores removed by a Pierce attack
      aimed at the chest that deals more than 25% of their Max HP in damage,
      which turns them into a Core Crab. They have 2 HP and +0 in every check
      except Acrobatics, in which they have a +6. While in Core form, they can
      attempt to get back inside their bodies if they're within melee range by
      running an Acrobatics check against their body's Vitality.If the original
      body dies, the Core is forcefully removed and cannot get back into the
      body until it is repaired.
    </p>
    <h2>Traumatic Events</h2>
    <p>
      Traumatic Events can happen in a number of ways, including: watching
      another player die, a Worker Drone or Human seeing another Worker Drone or
      Human get Eaten, a Solver user watching another Solver user fall under its
      influence, being Licked, using Bite or Eat as a newly active Solver Drone,
      etc.<br />It can have 2 effects:
    </p>
    <ul>
      <li>Decreasing Sanity by 1 on a Worker Drone or Human</li>
      <li>
        Increase Absolute Solver and Heat by 1 on Solver or Disassembly drones
      </li>
    </ul>
    <h2>Sanity</h2>
    <p>
      Worker Drones and Humans have a special attribute called Sanity, starting
      at 10. It can be decreased by Traumatic Events and is increased after a
      Long Rest by 2. If it reaches 0, they go Insane. This allows them to use
      Bite and Eat on other Drones or Humans and makes their alignment Chaotic.
      If already Chaotic, instead become Chaotic Evil. This has no practical
      in-game effects and is left to the player to roleplay appropriately. If a
      Sane Worker Drone decides to eat another, they roll a Sanity check.
      Difficulty is their missing HP + missing Fresh Oil.
    </p>
    <h2>Dronification [NC]</h2>
    <p>
      A Human that gets a bit too intimate with JCJenson™ Nanites may be turned
      into a Drone. The type of Drone is decided by the infecting Drone's type
      or, if caused by an exterior factor, by rolling a 1d8, with 1-4 being a
      Worker Drone, 5-6 being a Solver Drone, and 7-8 being a Disassembly Drone.
    </p>
    <h2>Solver Infection [NC]</h2>
    <p>
      If a Worker Drone uses Eat on a Solver-infected Drone body, or a
      Solver-enabled Drone uses Bite on a Worker Drone, the DM rolls a hidden
      1d10. A value of 1 turns the Worker into a Solver Drone.. This should be
      kept secret from the player.
    </p>
    <p>
      Drones that have been infected in the previous or current game sessions
      have their Oil loss and Heat gain doubled by all sources and cannot infect
      Worker Drones using Bite.
    </p>
    <p>
      The first time a recently-infected Solver drone's Heat reaches 10, they
      instantly go up to 10 Absolute Solver.
    </p>
    <h2>Hunger Damage</h2>
    <p>
      Max HP / 10 is the baseline for Hunger damage. It cannot be lower than 1.
      If the value is fractional, such as 1.5 or 2.8, truncate down to 1 and 2,
      respectively.If you start suffering Hunger damage while Out of Combat, the
      ticking damage instead happens once every real-life minute.
    </p>
    <h2>Drone Repair</h2>
    <p>
      When there are no healing items available, Worker Drones can be repaired
      using parts, a tool such as screwdriver or wrench, and a bonding agent.
      The healing amount is generally dependant on the specific parts used, but
      there are some static:
    </p>
    <ul>
      <li>Intact Drone Parts heal for 1d8 + Mechanics HP.</li>
      <li>Damaged Drone Parts heal for 1d4 + Mechanics HP.</li>
      <li>Replacing a damaged limb heals for 1/4 + Mechanics Max HP.</li>
    </ul>
    <h2>Disassembly Drone Part Scavenging [NC]</h2>
    <p>
      Worker Drones and Solver Drones can choose to replace their own limbs with
      scavenged Disassembly Drone limbs.DD Arms grant them a hand and one
      singular weapon, the last one used by the Disassembly Drone before the
      limb was removed.DD Legs, when they are both replaced, increase running
      speed to regular Disassembly Drone levels and jump height to 6 meters.If a
      Worker Drone uses their parts, they have to spend 1 Fresh or Used Oil each
      time they switch weapons.
    </p>
    <h2>Character Creation</h2>
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
    <h2>Combat and Actions</h2>
    <p>
      When Combat begins, every member rolls an Initiative roll, which
      determines the order at which turns are taken (higher being earlier).<br
      />During your turn, you have 3 Actions, which can be an attack, movement,
      weapon swap, attempt to hide, etc. You can attempt any action in any
      order, but may only succeed once. You get an extra Reaction if you don't
      attack during your turn.You can attempt any action in any order, but you
      may only succeed once. Remaining actions can be used in between turns as
      Reactions. If you Attempt 2 Attacks and end your turn, you have 1 Reaction
      remaining. If you move, swap weapons, and attack, you don't have any
      reactions.
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
      Reaching 0 HP by taking exterior damage (not Hunger) puts you in a <strong
        >Downed</strong
      > state. You can roll for recovery up to 3 times per Downed state. A different
      player can also try to help you using their Medicine bonus. Difficulty is 10
      + your Vitality modifier. If successful, revive at 1 HP.
    </p>
    <h2>Weight</h2>
    <p>
      Carrying Capacity is determined by your Species and Strength. Base
      Capacity as 0 Strength is 5kg.Humans gain +3kg per Strength value, up to
      35kg at 10 Strength.Drones gain +4kg per Strength value, up to 45kg at 10
      Strength.Disassembly Drones gain +5kg per Strength value, up to 55kg at 10
      Strength.
    </p>
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
    <h2>Out of Combat</h2>
    <p>
      Out of Combat you can do anything you like, with no limits on movement
      besides difficult terrain which may require an Athletics or Flying check.
      Actions such as picking something up or opening a door can be done freely,
      but other things such as investigating an area, picking up something heavy
      or trying to convince an NPC to do/say something may require Skill check
      at the DM's discretion.If you start suffering Hunger damage while Out of
      Combat, the ticking damage instead happens once every real-life minute.
    </p>
    <h2>Damage Types</h2>
    <p>
      There are 5 types of damage: Strike, Pierce, Slash, Energy and Hunger.<br
      />Being Vulnerable to a damage type means your HP takes the damage value
      +1 in damage.Being Resistant is the same, but you take -1 (minimum of 1).
    </p>
    <h2>Fall Damage</h2>
    <p>
      All species can take Fall Damage at a rate of 1 damage per meter above
      their Jump Speed that they fall.(A fall from 3m deals a Human 1 Damage,
      because their Jump Height is 2m).
    </p>
    <h2>Stun/Bootloop</h2>
    <p>
      If an enemy is Stunned/Bootlooped, they cannot move or do any action for 3
      turns. A Stun can be recovered early if you suffer non-Hunger damage, a
      Bootloop cannot.If the Stun/Bootloop happens outside of combat, it lasts
      15 real-life minutes.
    </p>
  </details>
</main>
