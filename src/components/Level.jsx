import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: "#134e4a" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "black" });

const BlockStart = ({ position = [0, 0, 0], canJump }) => (
  <group position={position}>
    <RigidBody
      type="fixed"
      onCollisionEnter={() => {
        canJump.current = true;
      }}
    >
      <mesh
        geometry={boxGeometry}
        material={obstacleMaterial}
        scale={[4, 0.2, 4]}
        position-y={-0.1}
        receiveShadow
      />
    </RigidBody>
  </group>
);

const BlockEnd = ({ position = [0, 0, 0] }) => (
  <RigidBody type="fixed" position={position}>
    <Text
      font="./bebas-neue-v9-latin-regular.woff"
      color={"black"}
      scale={0.5}
      position-y={1}
      position-z={2}
    >
      Finish
      <meshBasicMaterial toneMapped={false} />
    </Text>
    <mesh
      geometry={boxGeometry}
      material={obstacleMaterial}
      scale={[4, 0.2, 4]}
      position-y={-0.1}
      receiveShadow
    />
    <CuboidCollider args={[2, 1, 0.15]} position={[0, 1, -2.15]} />
    <CuboidCollider args={[0.15, 1, 2]} position={[-2.15, 1, 0]} />
    <CuboidCollider args={[0.15, 1, 2]} position={[2.15, 1, 0]} />
  </RigidBody>
);

const BlockSpinner = ({ position = [0, 0, 0], canJump }) => {
  const [speed] = useState(
    () => Math.random() + 2 * (Math.random() < 0.5 ? -1 : 1),
  );
  const spinnerRef = useRef(null);

  useFrame((state) => {
    const { clock } = state;
    const eulerRotation = new THREE.Euler(0, clock.elapsedTime * 2 * speed, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    spinnerRef.current?.setNextKinematicRotation(quaternionRotation);
  });
  return (
    <group position={position}>
      <RigidBody
        type="fixed"
        onCollisionEnter={() => {
          canJump.current = true;
        }}
      >
        <mesh
          geometry={boxGeometry}
          material={floorMaterial}
          scale={[4, 0.2, 4]}
          position-y={-0.1}
          receiveShadow
        />
      </RigidBody>
      <RigidBody
        ref={spinnerRef}
        type="kinematicPosition"
        position-y={0.25}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          scale={[4, 0.3, 0.3]}
          material={obstacleMaterial}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const BlockDoubleSpinner = ({ position = [0, 0, 0], canJump }) => {
  const [speed] = useState(
    () => Math.random() + 2 * (Math.random() < 0.5 ? -1 : 1),
  );
  const spinnerRef = useRef(null);
  const secondSpinnerRef = useRef(null);

  useFrame((state) => {
    const { clock } = state;
    const eulerRotationOne = new THREE.Euler(
      0,
      clock.elapsedTime * 2 * speed,
      0,
    );
    const eulerRotationTwo = new THREE.Euler(
      0,
      clock.elapsedTime * 2 * -speed,
      0,
    );
    const quaternionRotationOne = new THREE.Quaternion();
    const quaternionRotationTwo = new THREE.Quaternion();
    quaternionRotationOne.setFromEuler(eulerRotationOne);
    quaternionRotationTwo.setFromEuler(eulerRotationTwo);
    spinnerRef.current?.setNextKinematicRotation(quaternionRotationOne);
    secondSpinnerRef.current?.setNextKinematicRotation(quaternionRotationTwo);
  });
  return (
    <group position={position}>
      <RigidBody
        type="fixed"
        onCollisionEnter={() => {
          canJump.current = true;
        }}
      >
        <mesh
          geometry={boxGeometry}
          material={floorMaterial}
          scale={[4, 0.2, 4]}
          position-y={-0.1}
          receiveShadow
        />
      </RigidBody>
      <RigidBody
        ref={spinnerRef}
        type="kinematicPosition"
        position-y={0.25}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          scale={[4, 0.3, 0.3]}
          material={obstacleMaterial}
          castShadow
          receiveShadow
        />
      </RigidBody>
      <RigidBody
        ref={secondSpinnerRef}
        type="kinematicPosition"
        position-y={0.5}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          scale={[4, 0.3, 0.3]}
          material={obstacleMaterial}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const Level = () => {
  return (
    <>
      <BlockDoubleSpinner />
    </>
  );
};

export default Level;
