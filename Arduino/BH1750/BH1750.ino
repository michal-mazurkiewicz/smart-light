#include "ESP8266WiFi.h"
#include "ESP8266HTTPClient.h"
#include <ArduinoJson.h>
#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter;
HTTPClient http;
const char* ssid = "SmartLight";
const char* password = "pass7005";

void setup(){

  Serial.begin(9600);
  delay(10);
 
  // Connect WiFi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.hostname("Name");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Print the IP address
  Serial.print("IP address: ");
  Serial.print(WiFi.localIP());
  // Initialize the I2C bus (BH1750 library doesn't do this automatically)
  // On esp8266 devices you can select SCL and SDA pins using Wire.begin(D4, D3);
  Wire.begin(D3,D4);

  lightMeter.begin();
  Serial.println(F("BH1750 Test"));

}

void loop() {

  float lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");
  
    DynamicJsonDocument doc(2048);
    doc["name"] = "Sensor 3";
    doc["illumminance"] = lux;
    String json;
    serializeJson(doc, json);
    
    // Send request
    http.begin("http://192.168.43.6:8000/sensor");
    http.addHeader("Content-Type", "application/json");
    http.POST(json);
    http.end();
  
    delay(300);

}
