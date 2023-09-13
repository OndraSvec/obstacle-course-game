import { useEffect } from "react";
import useGameStore from "../useGameStore";

const Sound = () => {
  const sound = useGameStore((state) => state.sound);
  useEffect(() => {
    const backgroundMusic = new Audio("./backgroundMusic.mp3");
    backgroundMusic.loop = true;
    sound && backgroundMusic.play();

    return () => backgroundMusic.pause();
  }, [sound]);
  return <></>;
};

export default Sound;
