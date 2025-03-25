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
      name: "John",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 1,
      capacities: [
        {
          name: "Frappe",
          damage: 5,
          manaCost: 5,
          icon: "fa-fist-raised",
          color: "success",
        },
        {
          name: "Glaive",
          damage: 8,
          manaCost: 8,
          icon: "fa-khanda",
          color: "primary",
        },
        {
          name: "Méditation",
          damage: 0,
          manaCost: 0,
          icon: "fa-om",
          color: "info",
          effect: "mana",
        },
        {
          name: "Bombe",
          damage: 15,
          manaCost: 15,
          icon: "fa-bomb",
          color: "danger",
        },
      ],
    },
    {
      name: "Jane",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 2,
      capacities: [
        {
          name: "Tir",
          damage: 6,
          manaCost: 4,
          icon: "fa-bullseye",
          color: "success",
        },
        {
          name: "Soin",
          damage: 0,
          manaCost: 8,
          icon: "fa-heart",
          color: "danger",
          effect: "heal",
        },
        {
          name: "Poison",
          damage: 3,
          manaCost: 10,
          icon: "fa-skull-crossbones",
          color: "warning",
          effect: "poison",
        },
        {
          name: "Pluie de flèches",
          damage: 12,
          manaCost: 12,
          icon: "fa-arrows-alt",
          color: "primary",
        },
      ],
    },
    {
      name: "Jean",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 3,
      capacities: [
        {
          name: "Éclair",
          damage: 7,
          manaCost: 6,
          icon: "fa-bolt",
          color: "warning",
        },
        {
          name: "Boule de feu",
          damage: 10,
          manaCost: 10,
          icon: "fa-fire",
          color: "danger",
        },
        {
          name: "Armure",
          damage: 0,
          manaCost: 7,
          icon: "fa-shield-alt",
          color: "primary",
          effect: "shield",
        },
        {
          name: "Météore",
          damage: 20,
          manaCost: 20,
          icon: "fa-meteor",
          color: "dark",
        },
      ],
    },
    {
      name: "Jill",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 4,
      capacities: [
        {
          name: "Coup",
          damage: 4,
          manaCost: 3,
          icon: "fa-hand-rock",
          color: "success",
        },
        {
          name: "Vol de vie",
          damage: 8,
          manaCost: 8,
          icon: "fa-exchange-alt",
          color: "danger",
          effect: "lifesteal",
        },
        {
          name: "Protection",
          damage: 0,
          manaCost: 5,
          icon: "fa-user-shield",
          color: "info",
          effect: "protect",
        },
        {
          name: "Folie",
          damage: 18,
          manaCost: 18,
          icon: "fa-skull",
          color: "dark",
        },
      ],
    },
  ],
  monster: {
    name: "Dragon",
    pv: 200,
    pvMax: 200,
    strength: 15,
  },
  previousValues: {
    players: [
      { pv: 100, mana: 30 },
      { pv: 100, mana: 30 },
      { pv: 100, mana: 30 },
      { pv: 100, mana: 30 },
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
      if (state.currentTurn === 4) {
        state.currentTurn = 1;
        state.isMonsterTurn = true;
      } else {
        state.currentTurn++;
        state.isMonsterTurn = false;
      }

      // Check if next player is dead
      const nextPlayer = state.players.find((p) => p.id === state.currentTurn);
      if (nextPlayer && nextPlayer.pv <= 0) {
        state.currentTurn++;
      }
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
