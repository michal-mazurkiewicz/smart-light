let sensorOneIlluminance = [[].[].[].[].[]],let sensorTwoIlluminance = [[].[].[].[].[]]

//Okno ~~~~~~~~~~~Drzwi,
let sensorOnePointers = [0.05,0.05,0.05,0.05,0.05,
                         0.05,0.05,0.05,0.04,0.05,
                         0.06,0.05,0.05,0.05,0.05,
                         0.07,0.07,0.07,0.06,0.07,
                         0.08,0.09,0.08,0.08,0.08,
                         0.13,0.13,0.12,0.11,0.11,
                         0.15,0.16,0.16,0.15,0.13,
                         0.20,0.21,0.22,0.20,0.17,
                         0.29,0.40,0.44,0.42,0.30,
                         0.29,0.56,0.63,0.63,0.37,
                         0.00,0.90,1.00,0.98,0.00]

let sensorTwoPointers = [[].[].[].[].[]]

const setSensorOneIlluminance = (data) => {sensorOneIlluminance = sensorOnePointers.map(p => p * data  )}
const setSensorTwoIlluminance = (data) => {}