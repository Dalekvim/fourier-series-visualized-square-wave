import Sketch from "react-p5";
import p5Types from "p5";
import { getTime, setTime } from "./time";
import { getWave, setWave } from "./wave";
import { getFrequency } from "./frequency";

const polar = (radius: number, theta: number) => {
  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);
  return { x, y };
};

interface Props {
  value: number;
}

export const Canvas: React.FC<Props> = ({ value }) => {
  let wave = getWave();

  let time = getTime();

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    let frequency = getFrequency();
    let angularVelocity = 2 * Math.PI * frequency;

    p5.background(0);

    p5.translate(100, 200);

    let xPos = 0;
    let yPos = 0;

    let waveShift = 100;

    for (let i = 0; i < value; i++) {
      let xPrev = xPos;
      let yPrev = yPos;

      let n = 2 * i + 1;
      let radius = (4 / (Math.PI * n)) * 50;
      const { x, y } = polar(radius, n * angularVelocity * time);
      xPos += x;
      yPos += y;

      // This part draws the Circles
      p5.stroke(255, 100);
      p5.noFill();
      p5.ellipse(xPrev, yPrev, radius * 2);

      p5.fill(255);
      p5.stroke(255);
      p5.line(xPrev, yPrev, xPos, yPos);
      if (wave.length > 350) {
        wave.pop();
      }
    }

    setWave((wave = [yPos, ...wave]));

    let waveLength = wave.length - 1;
    p5.ellipse(waveLength + waveShift, wave[waveLength], 8);

    p5.line(xPos, yPos, waveShift, wave[0]);
    p5.ellipse(waveShift, wave[0], 8);

    p5.beginShape();
    p5.noFill();
    for (let i = 1; i < wave.length; i++) {
      p5.vertex(i + waveShift, wave[i]);
    }
    p5.endShape();

    setTime((time -= p5.deltaTime / 1000));
  };

  return <Sketch setup={setup} draw={draw} />;
};
