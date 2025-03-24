import PlayerCard from "./PlayerCard/PlayerCard";

import { useSelector } from "react-redux";

function PlayerList() {
  const players = useSelector((state) => state.fight.players);

  return (
    <section className="card-section">
      {Object.values(players).map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </section>
  );
}

export default PlayerList;
