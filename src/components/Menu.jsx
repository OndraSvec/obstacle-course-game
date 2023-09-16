import useGameStore from "../useGameStore";

const Menu = ({ setMenuVisible, isMobileDevice }) => {
  const startOver = useGameStore((state) => state.startOver);
  return (
    <div className={"menu"}>
      <button
        onClick={() => {
          startOver();
          setMenuVisible(false);
        }}
      >
        new game
      </button>
      <button
        onClick={() => {
          setMenuVisible(false);
        }}
      >
        continue
      </button>
      {!isMobileDevice && (
        <p
          style={{
            color: "#e11d48",
            fontSize: "min(6vw, 1.5rem)",
            textAlign: "center",
          }}
        >
          * Pro tip: double click to toggle full screen
        </p>
      )}
    </div>
  );
};

export default Menu;
