import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import useGameStore from "../useGameStore";

const Character = ({ canJump }) => {
  const blocksCount = useGameStore((state) => state.blocksCount);
  const restart = useGameStore((state) => state.restart);
  const end = useGameStore((state) => state.end);

  const [lerpedCameraPosition] = useState(() => new THREE.Vector3(0, 10, 10));
  const [lerpedCameraTarget] = useState(() => new THREE.Vector3());

  const player = useGLTF("/character.glb");

  const playerRef = useRef(null);
  const characterRef = useRef(null);

  useFrame((state, delta) => {
    const playerPosition = playerRef.current?.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(playerPosition);
    cameraPosition.z += 2.5;
    cameraPosition.y += 1.5;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(playerPosition);
    cameraTarget.y += 0.5;

    lerpedCameraPosition.lerp(cameraPosition, 5 * delta);
    lerpedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(lerpedCameraPosition);
    state.camera.lookAt(lerpedCameraTarget);

    playerPosition.z < -blocksCount * 4 - 2 && end();
    playerPosition.y < -5 && restart();
  });
  return (
    <group>
      <RigidBody
        ref={playerRef}
        canSleep={false}
        colliders={false}
        enabledRotations={[false, false, false]}
        restitution={0.2}
        friction={0.5}
        linearDamping={0.5}
      >
        <CapsuleCollider args={[0.4, 0.2]} position={[0, 0.55, 0]} />
        <primitive
          ref={characterRef}
          object={player.scene}
          scale={0.6}
          rotation-y={Math.PI}
        />
      </RigidBody>
    </group>
  );
};

export default Character;

useGLTF.preload("/character.glb");
