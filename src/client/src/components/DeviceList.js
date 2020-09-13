import React, { useState } from "react";
import Light from "./Light";
import Sensor from "./Sensor";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import {InputGroup,Button, FormControl } from 'react-bootstrap'

export default function DeviceList(props) {

  const [targetValue, setTargetValue] = useState("450")
  const [isOwnTarget, setOwnTargetUI] = useState(false)

const handleSetTarget = (value) => {
  if(value === "OWN"){
    setOwnTargetUI(true);
    props.changeTarget(targetValue)
  }else {
    setOwnTargetUI(false);
    props.changeTarget(value)
  }
}
  return (
    <>
      {props.mode === "MANUAL" ? (
        <div>
          <ul className="lightsList" style={{ paddingLeft: "0px" }}>
            {props.lightData.map((light) => (
              <Light light={light} changePower={props.changePower} />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div style={{ paddingTop: "15px" }}>
            <RadioGroup
              value={props.strategy}
              onChange={(value) => props.setStrategy(value)}
              horizontal
            >
              <RadioButton value="SAVE">Oszczedzanie Energii</RadioButton>
              <RadioButton value="FEEL">Przyjemny Nastroj</RadioButton>
              <RadioButton value="HYBRID">Tryb Hybrydowy</RadioButton>
            </RadioGroup>
          </div>
          <div style={{ paddingTop: "15px" }}>
            <RadioGroup
              value={props.target}
              onChange={(value) => handleSetTarget(value)}
              horizontal
            >
              <RadioButton value="500">500 lx</RadioButton>
              <RadioButton value="300">300 lx</RadioButton>
              <RadioButton value="SAME">Rownomiernosc</RadioButton>
              <RadioButton value="OWN" >Wlasne</RadioButton>
            </RadioGroup>
            {isOwnTarget ? (<InputGroup className="mb-3" style={{paddingTop:"15px"}}>
              <FormControl
                placeholder={props.target}
                aria-label="Minimalne natężenie"
                aria-describedby="basic-addon2"
                type="number"
                min="0"
                max="1000"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={() => props.changeTarget(targetValue)}>Ustaw</Button>
              </InputGroup.Append>
            </InputGroup>) : (<></>)}

          </div>
          <ul className="sensorsList" style={{ paddingLeft: "0px" }}>
            {props.sensorData.map((sensor) => {
              if (sensor.name !== "Average") {
                return <Sensor sensor={sensor} />;
              }
            })}
          </ul>
        </div>
      )}
    </>
  );
}

//1 Oszczedzanie energi wykorzystujemy 100% dopiero góre
//2 Świecimy na górę i dorzucamy dołu tyle ile potrzeba
//3 Hybryda 50%:50%.
//Rownomierność do okna
