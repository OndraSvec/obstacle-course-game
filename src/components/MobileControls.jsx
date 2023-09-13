import useGameStore from "../useGameStore";

const MobileControls = () => {
  const forwardTouchStart = useGameStore((state) => state.forwardTouchStart);
  const forwardTouchEnd = useGameStore((state) => state.forwardTouchEnd);
  const backwardTouchStart = useGameStore((state) => state.backwardTouchStart);
  const backwardTouchEnd = useGameStore((state) => state.backwardTouchEnd);
  const leftwardTouchStart = useGameStore((state) => state.leftwardTouchStart);
  const leftwardTouchEnd = useGameStore((state) => state.leftwardTouchEnd);
  const rightwardTouchStart = useGameStore(
    (state) => state.rightwardTouchStart,
  );
  const rightwardTouchEnd = useGameStore((state) => state.rightwardTouchEnd);
  const jumpTouchStart = useGameStore((state) => state.jumpTouchStart);
  const jumpTouchEnd = useGameStore((state) => state.jumpTouchEnd);

  return (
    <div className="mobileControls">
      <button
        className="forward"
        onTouchStart={forwardTouchStart}
        onTouchEnd={forwardTouchEnd}
      ></button>
      <button
        className="leftward"
        onTouchStart={leftwardTouchStart}
        onTouchEnd={leftwardTouchEnd}
      ></button>
      <button
        className="jump"
        onTouchStart={jumpTouchStart}
        onTouchEnd={jumpTouchEnd}
      ></button>
      <button
        className="rightward"
        onTouchStart={rightwardTouchStart}
        onTouchEnd={rightwardTouchEnd}
      ></button>
      <button
        className="backward"
        onTouchStart={backwardTouchStart}
        onTouchEnd={backwardTouchEnd}
      ></button>
    </div>
  );
};

export default MobileControls;
