import { Sky } from "@react-three/drei";
import { useRef } from "react";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Lights from "./Ligths";

const Experience = () => {
  const canJump = useRef(true);
  return (
    <>
      <Sky sunPosition={[0, 3, 2]} />
      <Physics>
        <Lights />
        <Level canJump={canJump} />
      </Physics>
    </>
  );
};

export default Experience;
