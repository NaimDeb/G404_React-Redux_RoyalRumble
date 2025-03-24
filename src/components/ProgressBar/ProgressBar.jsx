import "./ProgressBar.css";

function ProgressBar({ pv, pvMax, faType, barName, bgType }) {
  const percentage = (pv * 100) / pvMax;
  const isLow = percentage < 25;
  
  return (
    <div className="progress md-progress">
            <i className={`fas ${faType} icon-text`}>
        {pv} {barName}
      </i>
      <div 
        className={`progress-bar ${bgType} ${isLow ? "low" : ""}`}
        style={{ width: `${percentage}%` }}
        aria-valuenow={pv}
        aria-valuemin="0"
        aria-valuemax={pvMax}
        role="progressbar"
      >
      </div>

    </div>
  );
}

export default ProgressBar;