import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import RangeSlider from "react-bootstrap-range-slider";
import { getFrequency, setFrequency } from "./frequency";
import { useState } from "react";

interface Props {
  value: number;
  setValue: (value: number) => void;
}

export const Slider: React.FC<Props> = ({ value, setValue }) => {
  const [frequency, updateFrequency] = useState(getFrequency());

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Terms:
        </Form.Label>
        <Col sm="8">
          <RangeSlider
            min={1}
            max={10}
            value={value}
            onChange={(changeEvent) =>
              setValue((changeEvent.target.value as unknown) as number)
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Frequency:
        </Form.Label>
        <Col sm="8">
          <RangeSlider
            min={0.5}
            max={2}
            step={0.1}
            value={frequency}
            onChange={(changeEvent) => {
              setFrequency((changeEvent.target.value as unknown) as number);
              updateFrequency(getFrequency());
            }}
          />
        </Col>
      </Form.Group>
    </Form>
  );
};
