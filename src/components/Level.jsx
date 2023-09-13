import { RigidBody } from "@react-three/rapier";
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

const Level = () => {
  return (
    <>
      <BlockStart />
    </>
  );
};

export default Level;
