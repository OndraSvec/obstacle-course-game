import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { KeyboardControls } from "@react-three/drei";
import { forwardRef, useRef } from "react";

const Wrapper = forwardRef(({ children }, ref) => (
  <div ref={ref}>{children}</div>
));

const App = () => {
  const wrapperRef = useRef(null);
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
