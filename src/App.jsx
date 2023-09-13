import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { KeyboardControls } from "@react-three/drei";
import { forwardRef, useEffect, useRef, useState } from "react";

const Wrapper = forwardRef(({ children }, ref) => (
  <div ref={ref}>{children}</div>
));

const App = () => {
  const wrapperRef = useRef(null);

  const [isMobileDevice, setIsMobileDevice] = useState(true);

  const handleFullScreen = () => {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
      if (wrapperRef.current.requestFullscreen) {
        wrapperRef.current.requestFullscreen();
      } else if (wrapperRef.current.webkitRequestFullscreen) {
        wrapperRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const getUserDevice = () => {
    const details = navigator.userAgent;

    const regexp = /android|iphone|kindle|ipad/i;

    const isMobile = regexp.test(details);

    isMobile && setIsMobileDevice(true);
    !isMobile && setIsMobileDevice(false);
  };

  useEffect(() => {
    getUserDevice();

    return () => getUserDevice();
  }, []);

  useEffect(() => {
    window.addEventListener("dblclick", handleFullScreen);
    return () => window.removeEventListener("dblclick", handleFullScreen);
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "jump", keys: ["Space"] },
          { name: "nextLevel", keys: ["KeyN"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 30,
            position: [2.5, 4, 6],
          }}
        >
          <Experience />
        </Canvas>
      </KeyboardControls>
    </Wrapper>
  );
};

export default App;
