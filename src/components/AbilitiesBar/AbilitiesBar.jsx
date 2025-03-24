import { useState } from 'react';
import { useSelector } from "react-redux";
import ButtonCapacity from "../ButtonCapacity/ButtonCapacity";
import "./AbilitiesBar.css";

function AbilitiesBar({ currentPlayer }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const currentTurn = useSelector((state) => state.fight.currentTurn);
  const isMonsterTurn = useSelector((state) => state.fight.isMonsterTurn);

  const isPlayerTurn = currentPlayer.id === currentTurn && !isMonsterTurn;

  if (!isPlayerTurn) {
    return null;
  }

  return (
    <div className="abilities-bar">
      <div className="abilities-section">
        {currentPlayer.capacities.map((capacity, index) => (
          <ButtonCapacity 
            key={index} 
            player={currentPlayer} 
            capacity={capacity}
            onHover={setActiveTooltip}
          />
        ))}
      </div>
      <div className={`tooltip-section ${activeTooltip ? 'visible' : ''}`}>
        {activeTooltip && (
          <div className="tooltip-content">
            <div className="tooltip-header">{activeTooltip.name}</div>
            <div className="tooltip-stats">
              <span>DMG: {activeTooltip.damage}</span>
              <span>MP: {activeTooltip.manaCost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AbilitiesBar;