import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Canvas } from "./components/canvas";
import { Slider } from "./components/slider";

export const App: React.FC = () => {
  const [value, setValue] = useState(1);

  return (
    <Container>
      <h1>Fourier Series Visualized: Square Wave</h1>
      <Canvas value={value} />
      <Slider value={value} setValue={setValue} />
    </Container>
  );
};
