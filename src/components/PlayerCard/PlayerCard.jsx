import { useSelector } from "react-redux";
import ButtonCapacity from "../ButtonCapacity/ButtonCapacity";
import "./PlayerCard.css";
import lucas from "../../assets/lucas.webp";

function PlayerCard({ player }) {
  const previousValues = useSelector(
    (state) => state.fight.previousValues.players[player.id - 1]
  );

  const currentTurn = useSelector((state) => state.fight.currentTurn);
  const isMonsterTurn = useSelector((state) => state.fight.isMonsterTurn);

  const isPlayerTurn = player.id === currentTurn && !isMonsterTurn;

  // Retourne un tableau de chiffres de trois chiffres 123 => [1,2,3]
  const getDigits = (num) => {
    // Si le nombre a moins de 3 chiffres, ajoute des 0 devant
    const str = String(num).padStart(3, "0");
    return str.split("").map(Number);
  };

  // Renvoie le scroll nécessaire pour changer de chiffre
  const getScrollParams = (prevDigit, newDigit) => {
    if (prevDigit === newDigit) return null;

    const difference = newDigit - prevDigit;
    let positions = difference;

    // If difference is more than 5, take the shorter path
    if (Math.abs(difference) > 5) {
      positions = difference > 0 ? -(10 - difference) : 10 + difference;
    }

    // Calculate positions based on digit positions (each digit = 100%)
    const prevPosition = prevDigit * -10;
    const newPosition = newDigit * -10;

    return {
      fromPos: `${prevPosition}%`,
      toPos: `${newPosition}%`,
      direction: positions > 0 ? "down" : "up",
    };
  };

  const renderDigit = (value, prevValue, index) => {
    // Only proceed if we have both values
    if (prevValue === undefined) {
      prevValue = value;
    }

    const digits = getDigits(value);
    const prevDigits = getDigits(prevValue);

    const currentDigit = digits[index];
    const previousDigit = prevDigits[index];

    // Only get scroll params if digits are different
    const scrollParams =
      previousDigit !== currentDigit
        ? getScrollParams(previousDigit, currentDigit)
        : null;

    const initialPosition = `${currentDigit * -10}%`;

    return (
      <div key={index} className="stat-square">
        <div
          className={`number-scroll ${
            scrollParams ? `scroll-${scrollParams.direction}` : ""
          }`}
          style={
            scrollParams
              ? {
                  "--from-pos": scrollParams.fromPos,
                  "--to-pos": scrollParams.toPos,
                }
              : {
                  transform: `translateY(${initialPosition})`,
                }
          }
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>
    );
  };

  return (

    <>

    

    <div className={`card pixel-corners ${isPlayerTurn ? "active-turn" : ""}`}>
      {isPlayerTurn && (
        <img src={lucas} alt="Turn indicator" className="turn-indicator" />
      )}
      <div className="card-border" aria-hidden="true"></div>
      <div className="card-content">
        <label className="player-name">{player.name}</label>

        <div className="stat-row">
          <span className="stat-label">HP</span>
          <div className="stat-squares">
            {[0, 1, 2].map((index) =>
              renderDigit(player.pv, previousValues?.pv, index)
            )}
          </div>
        </div>

        <div className="stat-row">
          <span className="stat-label">MP</span>
          <div className="stat-squares">
            {[0, 1, 2].map((index) =>
              renderDigit(player.mana, previousValues?.mana, index)
            )}
          </div>
        </div>

        
      </div>
    </div>
  
    </>
  );
}

export default PlayerCard;
