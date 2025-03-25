import './App.css'
import Monster from './components/Monster/Monster'
import PlayerList from './components/PlayerList'
import BattleLog from './components/BattleLog/BattleLog'
import AbilitiesBar from './components/AbilitiesBar/AbilitiesBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { monsterTurn } from './features/fight/fightSlice';



function App() {

  const dispatch = useDispatch();
  const isMonsterTurn = useSelector(state => state.fight.isMonsterTurn);
  const currentPlayer = useSelector(state => 
    state.fight.players[state.fight.currentTurn - 1]
  );

  useEffect(() => {
    if (isMonsterTurn) {
      setTimeout(() => {
        dispatch(monsterTurn());
      }, 1000);
    }
  }, [isMonsterTurn, dispatch]);

  return (
    <>
    <div className="App">
        <AbilitiesBar currentPlayer={currentPlayer} />
        <BattleLog/>
        <Monster />
        <br></br>
        <section className="container-fluid">
          <PlayerList />
        </section >
      </div>

      <svg width="0" height="0">
        <filter id="pixelate-border">
            <feMorphology operator="dilate" radius="2" result="dilated"/>
            <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="3" result="noise"/>
            <feDisplacementMap in="dilated" in2="noise" scale="5"/>
        </filter>
    </svg>

    </>
  )
}

export default App
