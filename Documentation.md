# Smart Light Master Thesis Project

Project of inteligent interior lighting system. Composed of 3 BH30 Light sensors, 4 Vemos D2 Wifi microcontrollers and 1 DMX Led Light

## Hardware

### Sensors

    3 light sensors to measure the luminance of light.
    3 Vemos D2 microcontrollers collecting data from sensors and sending them to webserver
    1 Motion Sensor

### Light
`
    1 DMX LED Light
    1 Vemos D2 microcontroller listening for the data from server and making actions (Switching Off, Switching ON, Diming, changing colours or increasing light power.)

## Software

Client-Server Web Application Allowing to managing the whole system

### MongoDB

    DataBase where we store measures from sensors from last 1 year

### NodeJS Express Server

    Server that with REST API routing allowing to make requests and interacting with DataBase

### Client Side Web Application

    Application with Management Platform. Allows to see charts with data from sensors, make actions, switch states that system is working in.

