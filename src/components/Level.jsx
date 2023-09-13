import { Text } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
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

const Level = () => {
  return (
    <>
      <BlockEnd />
    </>
  );
};

export default Level;
