import { Sky } from "@react-three/drei";
import { useRef } from "react";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Lights from "./Ligths";
import useGameStore from "../useGameStore";
import Ball from "./Ball";
import Character from "./Character";

const Experience = () => {
  const blocksCount = useGameStore((state) => state.blocksCount);
  const blocksSeed = useGameStore((state) => state.blocksSeed);
  const character = useGameStore((state) => state.character);

  const canJump = useRef(true);
  return (
    <>
      <Sky sunPosition={[0, 3, 2]} />
      <Physics debug>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} canJump={canJump} />
        {character ? <Character canJump={canJump} /> : <Ball />}
      </Physics>
    </>
  );
};

export default Experience;
