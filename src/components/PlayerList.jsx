import PlayerCard from "./PlayerCard/PlayerCard";

import { useSelector } from "react-redux";

function PlayerList() {
  const players = useSelector((state) => state.fight.players);

  return (
    <div className="flex">
      {Object.values(players).map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}

export default PlayerList;
