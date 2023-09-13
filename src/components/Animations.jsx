import { useAnimations } from "@react-three/drei";
import { useEffect } from "react";

const Animations = ({ animationName, player, characterRef }) => {
  const { actions } = useAnimations(player.animations, characterRef);

  useEffect(() => {
    const action = actions[animationName];
    action.reset().fadeIn(0.125).play();

    return () => action.fadeOut(0.125);
  }, [animationName]);
  return <></>;
};

export default Animations;
