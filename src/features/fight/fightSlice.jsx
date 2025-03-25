import { createSlice } from "@reduxjs/toolkit";


const initialState = {


  basicAttack: {
    name: "Bash",
    damage: 3,
    manaCost: 0,
    icon: "fa-hand-rock",
    color: "secondary",
  },

  battleLog: {
    message: "",
    isVisible: false
  },

  players: [
    {
      name: "Lucas",
      pv: 552,
      pvMax: 552,
      mana: 349,
      manaMax: 349,
      id: 1,
      image: "lucas.webp",
      capacities: [
        {
          name: "Offense Up",
          damage: 3,
          damageBoost: 1.5,
          manaCost: 25,
          icon: "fa-plus-circle",
        },
        {
          name: "PSI Shield",
          damage: 5,
          shield: 20,
          manaCost: 15,
          icon: "fa-shield-alt",
        },
        {
          name: "Healing",
          damage: 0,
          manaCost: 20,
          healing: 50,
          icon: "fa-plus",
          effect: "mana",
        },
        {
          name: "PK Love",
          damage: 50,
          manaCost: 150,
          icon: "fa-heartbeat",
        },
      ],
    },
    {
      name: "Kumatora",
      pv: 483,
      pvMax: 483,
      mana: 337,
      manaMax: 337,
      id: 2,
      image: "kumatora.png",
      capacities: [
        {
          name: "PK Fire",
          damage: 11,
          manaCost: 11,
          icon: "fa-fire",
        },
        {
          name: "Pk Freeze",
          damage: 0,
          manaCost: 20,
          icon: "fa-snowflake",
          effect: "heal",
        },
        {
          name: "PK Thunder",
          damage: 10,
          manaCost: 15,
          icon: "fa-bolt",
          effect: "poison",
        },
        {
          name: "PK Starstorm",
          damage: 100,
          manaCost: 250,
          icon: "fa-star",
        },
      ],
    },
    {
      name: "Duster",
      pv: 607,
      pvMax: 607,
      mana: 8,
      manaMax: 8,
      id: 3,
      image: "Duster.png",
      capacities: [
        {
          name: "Smoke Bomb",
          damage: 0,
          manaCost: 1,
          icon: "fa-smog",
        },
        {
          name: "Wall Staple",
          damage: 0,
          manaCost: 1,
          icon: "fa-sticky-note",
        },
        {
          name: "Scary Mask",
          damage: 0,
          manaCost: 1,
          icon: "fa-mask",
          effect: "shield",
        },
        {
          name: "Tickle Stick",
          damage: 0,
          manaCost: 1,
          icon: "fa-fan",
        },
      ],
    },
    {
      name: "Nadir",
      pv: 466,
      pvMax: 466,
      mana: 123,
      manaMax: 123,
      image: "episteque.webp",
      id: 4,
      capacities: [
        {
          name: "Interview Konbini",
          damage: 16,
          manaCost: 10,
          icon: "fa-handshake",
        },
        {
          name: "Vol de stage",
          damage: 10,
          manaCost: 22,
          icon: "fa-hand-spock",
          effect: "lifesteal",
        },
        {
          name: "Episteque",
          damage: 50,
          manaCost: 50,
          icon: "fa-hand-rock",
          effect: "protect",
        },
        {
          name: "Carrelage",
          damage: 18,
          manaCost: 18,
          icon: "fa-cat",
        },
      ],
    },
  ],
  monster: {
    name: "Mecha-Drago",
    pv: 300,
    pvMax: 300,
    strength: 55,
  },
  previousValues: {
    players: [
      { pv: 552, mana: 249 },
      { pv: 483, mana: 337 },
      { pv: 607, mana: 8 },
      { pv: 466, mana: 123 },
    ],
  },
  lastAttackMissed: false,
  currentTurn: 1,
  isMonsterTurn: false,
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {

    basicAttack: (state, action) => {
      const { playerId } = action.payload;
      const player = state.players.find((p) => p.id === playerId);

      if (player) {
        state.monster.pv = Math.max(0, state.monster.pv - basicAttack.damage);
      }
    },

    hitMonster: (state, action) => {
      const { playerId, damage, manaCost } = action.payload;
      const player = state.players.find((p) => p.id === playerId);

      const prevPv = state.previousValues.players[playerId - 1].pv;
      const prevMana = state.previousValues.players[playerId - 1].mana;

      if (player && player.mana >= manaCost) {

        // Then do updates
        player.mana -= manaCost;
        state.monster.pv = Math.max(0, state.monster.pv - damage);

        state.battleLog = {
          message: `${player.name} attaque ${state.monster.name} pour ${damage} dégâts!`,
          isVisible: true
        };

        // Change values only if they changed to prevent unnecessary re-renders
        if (prevPv !== player.pv) {
          state.previousValues.players[playerId - 1].pv = player.pv;
        }
        if (prevMana !== player.mana) {
          state.previousValues.players[playerId - 1].mana = player.mana;
        }

      }
    },

    hitBack: (state, action) => {
      const { playerId } = action.payload;
      const player = state.players[playerId - 1];


      const prevPv = state.previousValues.players[playerId - 1].pv;
      const prevMana = state.previousValues.players[playerId - 1].mana;


      const monsterMiss = Math.random() < 0.8;
      if (!monsterMiss) {
        const damage = Math.floor(
          state.monster.strength * (Math.random() * (1.5 - 0.7) + 0.7)
        );
        player.pv = Math.max(0, player.pv - damage);

        state.battleLog = {
          message: `${state.monster.name} contre-attaque pour ${damage} dégâts!`,
          isVisible: true
        };
      } else {
        console.log("Miss!");
        
      }

      // Change values only if they changed to prevent unnecessary re-renders
      if (prevPv !== player.pv) {
        state.previousValues.players[playerId - 1].pv = player.pv;
      }
      if (prevMana !== player.mana) {
        state.previousValues.players[playerId - 1].mana = player.mana;
      }


    },

    hideBattleLog: (state) => {
      state.battleLog.isVisible = false;
    },

    nextTurn: (state) => {
      let nextTurn = state.currentTurn;
      let foundLivingPlayer = false;
      let attempts = 0;

      // Try to find next living player
      while (!foundLivingPlayer && attempts < 4) {
        nextTurn = nextTurn >= 4 ? 1 : nextTurn + 1;
        const nextPlayer = state.players.find(p => p.id === nextTurn);
        
        if (nextPlayer && nextPlayer.pv > 0) {
          foundLivingPlayer = true;
        }
        
        attempts++;
      }

      state.currentTurn = nextTurn;
      state.isMonsterTurn = !foundLivingPlayer || nextTurn === 1;
    },

    monsterTurn: (state) => {
      if (!state.isMonsterTurn) return;
    
      // Choose random target
      const aliveTargets = state.players.filter(p => p.pv > 0);
      if (aliveTargets.length === 0) return;
      
      const target = aliveTargets[Math.floor(Math.random() * aliveTargets.length)];
      
      // Calculate damage with 20% variance
      const baseDamage = state.monster.strength;
      const variance = baseDamage * 0.2;
      const damage = Math.floor(baseDamage + (Math.random() * variance * 2 - variance));
    
      // 20% chance to miss
      const missed = Math.random() < 0.2;
    
      if (!missed) {
        // Deal damage
        target.pv = Math.max(0, target.pv - damage);
        
        // Update battle log
        state.battleLog = {
          message: `${state.monster.name} attacks ${target.name} for ${damage} damage!`,
          isVisible: true
        };
      } else {
        state.battleLog = {
          message: `${state.monster.name} missed!`,
          isVisible: true  
        };
      }
    
      // End monster turn
      state.isMonsterTurn = false;
      state.currentTurn = 1;
    }


  },
});

export const { hitMonster, hitBack, nextTurn, basicAttack, hideBattleLog, monsterTurn } = fightSlice.actions;

export default fightSlice.reducer;
