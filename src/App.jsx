import './App.css'
import Monster from './components/Monster/Monster'
import PlayerList from './components/PlayerList'
import BattleLog from './components/BattleLog/BattleLog'

function App() {

  return (
    <div className="App">
        <Monster />
        <br></br>
        < BattleLog />
        <section className="container-fluid">
          <PlayerList />
        </section >
      </div>
  )
}

export default App
