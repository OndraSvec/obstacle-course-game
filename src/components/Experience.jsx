import { Sky } from "@react-three/drei";
import { useRef } from "react";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Lights from "./Ligths";
import useGameStore from "../useGameStore";
import Ball from "./Ball";
import Character from "./Character";
import Sound from "./Sound";

const Experience = () => {
  const blocksCount = useGameStore((state) => state.blocksCount);
  const character = useGameStore((state) => state.character);

  const canJump = useRef(true);
  return (
    <>
      <Sky sunPosition={[0, 3, 2]} />
      <Physics>
        <Lights />
        <Level count={blocksCount} canJump={canJump} />
        {character ? <Character canJump={canJump} /> : <Ball />}
      </Physics>
      <Sound />
    </>
  );
};

export default Experience;
