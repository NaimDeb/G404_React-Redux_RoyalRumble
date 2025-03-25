import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideBattleLog } from '../../features/fight/fightSlice';
import "./BattleLog.css";

function BattleLog() {

  const dispatch = useDispatch();
  const { message, isVisible } = useSelector(state => state.fight.battleLog);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideBattleLog());
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);



  return (
    <div className={`battle-log log-pixel-corners ${isVisible ? 'log-visible' : ''}`}>
      <span className="log-text">{message}</span>
    </div>
  );
}

export default BattleLog;
