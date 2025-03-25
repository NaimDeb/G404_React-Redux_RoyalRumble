import "./App.css";
import Monster from "./components/Monster/Monster";
import PlayerList from "./components/PlayerList";
import BattleLog from "./components/BattleLog/BattleLog";
import AbilitiesBar from "./components/AbilitiesBar/AbilitiesBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { monsterTurn, nextTurn } from "./features/fight/fightSlice";
import EndScreen from "./components/EndScreen/EndScreen";

function App() {
  const dispatch = useDispatch();
  const isMonsterTurn = useSelector((state) => state.fight.isMonsterTurn);
  const currentPlayer = useSelector((state) => {
    const player = state.fight.players[state.fight.currentTurn - 1];
    return player && player.pv > 0 ? player : null;
  });
  const monsterHP = useSelector((state) => state.fight.monster.pv);
  const aliveHeroes = useSelector(
    (state) =>
      state.fight.players.filter((player) => player.pv > 0).length
  );

  useEffect(() => {
    if (isMonsterTurn) {
      setTimeout(() => {
        dispatch(monsterTurn());
      }, 1000);
    } else if (currentPlayer === null && aliveHeroes > 0) {
      // Skip dead player's turn
      dispatch(nextTurn());
    }
  }, [isMonsterTurn, dispatch, currentPlayer, aliveHeroes]);

  if (monsterHP <= 0) {
    return <EndScreen result="win" />;
  }
  if (aliveHeroes <= 0) {
    return <EndScreen result="lose" />;
  }
  return (
    <>



      <div className="App">
        <AbilitiesBar currentPlayer={currentPlayer} />
        <BattleLog />
        <Monster />
        <br></br>
        <section className="container-fluid">
          <PlayerList />
        </section>
      </div>


      <svg width="0" height="0">
        <filter id="pixelate-border">
          <feMorphology operator="dilate" radius="2" result="dilated" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.2"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap in="dilated" in2="noise" scale="5" />
        </filter>
      </svg>
    </>
  );
}

export default App;
