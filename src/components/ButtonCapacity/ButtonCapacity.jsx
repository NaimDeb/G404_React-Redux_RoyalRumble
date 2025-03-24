import "./ButtonCapacity.css";
import { useDispatch } from "react-redux";
import { hitMonster, hitBack } from "../../features/fight/fightSlice";

function ButtonCapacity({ player, capacity }) {

  const dispatch = useDispatch();

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
    }, 200);
    
  };



  return (
    <button
      type="button"
      onClick={activateCapacity}
      className={`btn btn-${capacity.color} material-tooltip-main`}
      disabled={player.mana < capacity.manaCost}
    >
      {capacity.name}
      <i className={`fas ${capacity.icon}`}></i> {capacity.damage}
      <i className="fas fa-fire-alt"></i> - {capacity.manaCost}
    </button>
  );
}

export default ButtonCapacity;
