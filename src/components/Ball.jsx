import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import useGameStore from "../useGameStore";
import BallControls from "./BallControls";

const Ball = () => {
  const blocksCount = useGameStore((state) => state.blocksCount);
  const restart = useGameStore((state) => state.restart);
  const end = useGameStore((state) => state.end);

  const ballRef = useRef(null);

  const [lerpedCameraPosition] = useState(() => new THREE.Vector3(0, 10, 10));
  const [lerpedCameraTarget] = useState(() => new THREE.Vector3());

  useFrame((state, delta) => {
    const ballPosition = ballRef.current?.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(ballPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(ballPosition);
    cameraTarget.y += 0.25;

    lerpedCameraPosition.lerp(cameraPosition, 5 * delta);
    lerpedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(lerpedCameraPosition);
    state.camera.lookAt(lerpedCameraTarget);

    ballPosition.z < -blocksCount * 4 - 2 && end();
    ballPosition.y < -5 && restart();
  });
  return (
    <>
      <BallControls ballRef={ballRef} />
      <RigidBody
        ref={ballRef}
        canSleep={false}
        colliders="ball"
        position-y={1}
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color={"#e11d48"} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Ball;
