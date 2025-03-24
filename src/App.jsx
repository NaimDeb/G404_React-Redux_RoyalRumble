import './App.css'
import Monster from './components/Monster/Monster'
import PlayerList from './components/PlayerList'
import BattleLog from './components/BattleLog/BattleLog'
import AbilitiesBar from './components/AbilitiesBar/AbilitiesBar';
import { useSelector } from 'react-redux';


function App() {

  const currentPlayer = useSelector(state => 
    state.fight.players[state.fight.currentTurn - 1]
  );

  return (
    <>
    <div className="App">
        <AbilitiesBar currentPlayer={currentPlayer} />
        <Monster />
        <br></br>
        < BattleLog />
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
