import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import useGameStore from "../useGameStore";
import Animations from "./Animations";
import CharacterControls from "./CharacterControls";

const Character = ({ canJump }) => {
  const blocksCount = useGameStore((state) => state.blocksCount);
  const restart = useGameStore((state) => state.restart);
  const end = useGameStore((state) => state.end);
  const animationName = useGameStore((state) => state.animationName);
  const setAnimationName = useGameStore((state) => state.setAnimationName);

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

    if (playerPosition.z < -blocksCount * 4 - 2 && playerPosition.y >= 0) end();
    playerPosition.y < -3 && restart();
  });
  return (
    <>
      <Animations
        animationName={animationName}
        player={player}
        characterRef={characterRef}
      />
      <CharacterControls
        animationName={animationName}
        setAnimationName={setAnimationName}
        playerRef={playerRef}
        characterRef={characterRef}
        canJump={canJump}
      />
      <group>
        <RigidBody
          ref={playerRef}
          canSleep={false}
          colliders={false}
          enabledRotations={[false, false, false]}
          restitution={0.2}
          friction={0.5}
          linearDamping={0.5}
          onCollisionEnter={() => {
            setAnimationName("idle");
          }}
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
    </>
  );
};

export default Character;

useGLTF.preload("/character.glb");
