import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier } from "@react-three/rapier";
import { useEffect } from "react";
import useGameStore from "../useGameStore";

const BallControls = ({ ballRef }) => {
  const start = useGameStore((state) => state.start);
  const restart = useGameStore((state) => state.restart);
  const forwardTouch = useGameStore((state) => state.forwardTouch);
  const backwardTouch = useGameStore((state) => state.backwardTouch);
  const jumpTouch = useGameStore((state) => state.jumpTouch);
  const leftwardTouch = useGameStore((state) => state.leftwardTouch);
  const rightwardTouch = useGameStore((state) => state.rightwardTouch);
  const phase = useGameStore((state) => state.phase);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { rapier, world } = useRapier();

  const jump = () => {
    const origin = ballRef.current?.translation();
    origin.y -= 0.31;

    const direction = { x: 0, y: -1, z: 0 };

    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit) {
      hit.toi < 0.15 && ballRef.current?.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  const reset = () => {
    ballRef.current?.setTranslation({ x: 0, y: 1, z: 0 });
    ballRef.current?.setLinvel({ x: 0, y: 0, z: 0 });
    ballRef.current?.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeReset = useGameStore.subscribe(
      (state) => state.phase,
      (value) => {
        value === "ready" && reset();
      },
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      },
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, rightward, leftward, nextLevel } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (
      phase === "ready" &&
      (forwardTouch ||
        leftwardTouch ||
        backwardTouch ||
        jumpTouch ||
        rightwardTouch)
    ) {
      start();
    } else if (forward || forwardTouch) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    } else if (backward || backwardTouch) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    } else if (leftward || leftwardTouch) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    } else if (rightward || rightwardTouch) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    } else if (jumpTouch) {
      jump();
    } else if (nextLevel && phase === "ended") restart();

    ballRef.current?.applyImpulse(impulse);
    ballRef.current?.applyTorqueImpulse(torque);
  });
  return null;
};

export default BallControls;
