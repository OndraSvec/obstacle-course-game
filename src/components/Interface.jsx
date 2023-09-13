import { useKeyboardControls } from "@react-three/drei";
import Controls from "./Controls";
import MobileControls from "./MobileControls";
import { BiSolidVolumeFull } from "react-icons/bi";
import { BiSolidVolumeMute } from "react-icons/bi";
import { GiMeshBall } from "react-icons/gi";
import { MdMan } from "react-icons/md";
import { useRef } from "react";
import useGameStore from "../useGameStore";

const Interface = ({ isMobileDevice }) => {
  const phase = useGameStore((state) => state.phase);
  const bestScore = useGameStore((state) => state.bestScore);
  const level = useGameStore((state) => state.level);
  const restart = useGameStore((state) => state.restart);
  const character = useGameStore((state) => state.character);
  const setCharacter = useGameStore((state) => state.setCharacter);
  const sound = useGameStore((state) => state.sound);
  const setSound = useGameStore((state) => state.setSound);

  const { forward, backward, leftward, rightward, jump } = useKeyboardControls(
    (state) => state,
  );

  const soundButtonRef = useRef(null);
  const characterButtonRef = useRef(null);

  return (
    <div className="interface">
      <div className="info">
        <span>level: {level}</span>
        <span>best score: {bestScore}</span>
      </div>
      {phase === "ended" && (
        <button className="restart" onClick={restart}>
          {`${
            !isMobileDevice ? "Press - N - to " : ""
          }advance to the next level`}
        </button>
      )}
      {isMobileDevice ? (
        <MobileControls />
      ) : (
        <Controls
          forward={forward}
          backward={backward}
          leftward={leftward}
          rightward={rightward}
          jump={jump}
        />
      )}
      <div className="bottomStrip">
        <button
          ref={soundButtonRef}
          onClick={() => {
            setSound();
            soundButtonRef.current.blur();
          }}
        >
          {sound ? <BiSolidVolumeFull /> : <BiSolidVolumeMute />}
        </button>
        <button
          ref={characterButtonRef}
          onClick={() => {
            setCharacter();
            characterButtonRef.current.blur();
          }}
        >
          {character ? <MdMan /> : <GiMeshBall />}
        </button>
      </div>
    </div>
  );
};

export default Interface;
