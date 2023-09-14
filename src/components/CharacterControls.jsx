import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import useGameStore from "../useGameStore";

const CharacterControls = ({
  animationName,
  setAnimationName,
  playerRef,
  characterRef,
  canJump,
}) => {
  const start = useGameStore((state) => state.start);
  const restart = useGameStore((state) => state.restart);
  const forwardTouch = useGameStore((state) => state.forwardTouch);
  const backwardTouch = useGameStore((state) => state.backwardTouch);
  const jumpTouch = useGameStore((state) => state.jumpTouch);
  const leftwardTouch = useGameStore((state) => state.leftwardTouch);
  const rightwardTouch = useGameStore((state) => state.rightwardTouch);
  const phase = useGameStore((state) => state.phase);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const jump = () => {
    if (canJump.current) {
      setAnimationName("jump");
      playerRef.current?.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
    canJump.current = false;
  };

  const reset = () => {
    playerRef.current?.setTranslation({ x: 0, y: 1, z: 0 });
    playerRef.current?.setLinvel({ x: 0, y: 0, z: 0 });
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

    const impulseStrength = delta * 1.5;
    const maxVelocity = 4;

    const linvel = playerRef.current?.linvel();
    let changeRotation = false;

    if (
      phase === "ready" &&
      (forwardTouch ||
        leftwardTouch ||
        backwardTouch ||
        jumpTouch ||
        rightwardTouch)
    ) {
      start();
    } else if (jumpTouch) {
      jump();
      canJump.current = false;
    } else if ((forward || forwardTouch) && linvel.z > -maxVelocity) {
      impulse.z -= impulseStrength;
      changeRotation = true;
    } else if ((backward || backwardTouch) && linvel.z < maxVelocity) {
      impulse.z += impulseStrength;
      changeRotation = true;
    } else if ((leftward || leftwardTouch) && linvel.x > -maxVelocity) {
      impulse.x -= impulseStrength;
      changeRotation = true;
    } else if ((rightward || rightwardTouch) && linvel.x < maxVelocity) {
      impulse.x += impulseStrength;
      changeRotation = true;
    } else if (nextLevel && phase === "ended") restart();

    phase !== "ended" && playerRef.current?.applyImpulse(impulse);

    if (phase === "ended") setAnimationName("victory");
    else if (Math.abs(linvel.x) > 0 || Math.abs(linvel.z) > 0) {
      if (animationName !== "run" && animationName !== "jump")
        setAnimationName("run");
    } else {
      if (animationName !== "jump") setAnimationName("idle");
    }

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      characterRef.current.rotation.y = angle;
    }
  });
  return null;
};

export default CharacterControls;
