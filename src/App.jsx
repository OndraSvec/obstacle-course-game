import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
