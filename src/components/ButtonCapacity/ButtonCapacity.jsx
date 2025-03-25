import "./ButtonCapacity.css";
import { useDispatch, useSelector } from "react-redux";
import { hitMonster, hitBack, nextTurn } from "../../features/fight/fightSlice";

function ButtonCapacity({ player, capacity, onHover }) {

  const dispatch = useDispatch();
  const currentTurn = useSelector((state) => state.fight.currentTurn);
  const isMonsterTurn = useSelector((state) => state.fight.isMonsterTurn);

  const isPlayerTurn = player.id === currentTurn && !isMonsterTurn;


  const activateCapacity = () => {
    dispatch(hitMonster({
      playerId:player.id,
      damage: capacity.damage,
      manaCost: capacity.manaCost

    }));
    
    console.log("Attaque " + capacity.name + " lancée par " + player.name);

    // Wait 0.5s

    setTimeout(() => {
      dispatch(hitBack({
        playerId:player.id
      }));
    }, 500);


    dispatch(nextTurn());
    
  };


  if (!isPlayerTurn) {
    return null;
  }


  return (
    <div className="abilities-container">
      <button
        type="button"
        onClick={activateCapacity}
        className={`btn btn-${capacity.color} btn-pixel-corners`}
        disabled={player.mana < capacity.manaCost}
        onMouseEnter={() => onHover(capacity)}
        onMouseLeave={() => onHover(null)}
      >
        <i className={`fas ${capacity.icon}`}></i>
      </button>
    </div>
  );
}

export default ButtonCapacity;
