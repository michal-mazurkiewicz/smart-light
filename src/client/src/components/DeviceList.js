import React from "react";
import Light from "./Light";
import Sensor from "./Sensor";
import { RadioGroup, RadioButton } from "react-radio-buttons";

export default function DeviceList(props) {
  return (
    <>
      {props.mode === "MANUAL" ? (
        <div>
          <ul className="lightsList">
            {props.lightData.map((light) => (
              <Light light={light} changePower={props.changePower} />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div style={{paddingTop:"15px"}}>
            <RadioGroup value={props.energyMode} onChange={(value) => props.changeEnergyMode(value)} horizontal>
              <RadioButton value="SAVE">Oszczedzanie Energii</RadioButton>
              <RadioButton value="FEEL">Przyjemny Nastroj</RadioButton>
              <RadioButton value="HYBRID">Tryb Hybrydowy</RadioButton>
            </RadioGroup>
          </div>
          <div style={{paddingTop:"15px"}}>
            <RadioGroup value={props.target} onChange={(value) => props.changeTarget(value)} horizontal>
              <RadioButton value="500">500 lx</RadioButton>
              <RadioButton value="300">300 lx</RadioButton>
              <RadioButton value="SAME">Rownomiernosc</RadioButton>
            </RadioGroup>
          </div>
          <ul className="sensorsList">
            {props.sensorData.map((sensor) => (
              <Sensor sensor={sensor} />
            ))}
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
