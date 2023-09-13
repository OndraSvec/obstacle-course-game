const Controls = ({ forward, leftward, backward, rightward, jump }) => {
  return (
    <div className="controls">
      <div className="raw">
        <div className={`key ${forward && "active"}`}>W/↑</div>
      </div>
      <div className="raw">
        <div className={`key ${leftward && "active"}`}>A/←</div>
        <div className={`key ${backward && "active"}`}>S/↓</div>
        <div className={`key ${rightward && "active"}`}>D/→</div>
      </div>
      <div className="raw">
        <div className={`key large ${jump && "active"}`}>Spacebar</div>
      </div>
    </div>
  );
};

export default Controls;
