import React, { useEffect } from "react";
import "./EndScreen.css";

function EndScreen({ result }) {
  useEffect(() => {
    // Play sound effect based on result
    const sound = new Audio(result === "win" ? "/victory-sound.mp3" : "/defeat-sound.mp3");
    sound.play();
  }, [result]);

  const message = result === "win" 
    ? "The Dragon lies defeated! Your valor and strength have saved the kingdom!"
    : "The Dragon's might proved too great. But legends speak of heroes who rise again...";

  const handleReplay = () => {
    const sound = new Audio("/button-click.mp3");
    sound.play();
    setTimeout(() => window.location.reload(), 300);
  };

  return (
    <div className={`end-screen ${result}-screen`}>
      <div className="end-content">
        <h1>{result === "win" ? "Victory!" : "Defeat"}</h1>
        <p>{message}</p>
        <button className="replay-button" onClick={handleReplay}>
          Fight Again
        </button>
      </div>
    </div>
  );
}

export default EndScreen;