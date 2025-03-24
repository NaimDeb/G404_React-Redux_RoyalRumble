import './App.css'
import Monster from './components/Monster/Monster'
import PlayerList from './components/PlayerList'
import BattleLog from './components/BattleLog/BattleLog'

function App() {
  return (
    <div className="App">
      <div className="background-effects"></div>
      
      <h1 className="site-title">Royal Rumble</h1>
      
      <div className="game-container">
        <div className="monster-section fade-in">
          <Monster />
        </div>
        
        <div className="battle-log-section fade-in">
          <BattleLog />
        </div>
        
        <div className="cards-container">
          <PlayerList />
        </div>
      </div>
    </div>
  )
}

export default App