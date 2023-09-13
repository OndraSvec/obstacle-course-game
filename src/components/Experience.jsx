import { Sky } from "@react-three/drei";
import { useRef } from "react";
import Level from "./Level";

const Experience = () => {
  const canJump = useRef(true);
  return (
    <>
      <Sky sunPosition={[0, 3, 2]} />
      <Level canJump={canJump} />
    </>
  );
};

export default Experience;
