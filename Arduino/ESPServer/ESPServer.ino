#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include "ESP8266WiFi.h"
#include <ArduinoJson.h>
#include <ESPDMX.h>
#include <Wire.h>

const char* ssid = "SmartLight";
const char* password = "pass7005";
DMXESPSerial dmx;


ESP8266WebServer server(80);       // Create a webserver object that listens for HTTP request on port 80

void handleRoot();              // function prototypes for HTTP handlers
void handleLED();
void handleNotFound();

void setup() {

  Serial.begin(9600);
    
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

  if (MDNS.begin("esp8266")) {              // Start the mDNS responder for esp8266.local
    Serial.println("mDNS responder started");
  } else {
    Serial.println("Error setting up MDNS responder!");
  }

  server.on("/", handleRoot);               // Call the 'handleRoot' function when a client requests URI "/"
  server.on("/lightLevels", HTTP_POST, handleSetPower);
  server.onNotFound(handleNotFound);        // When a client requests an unknown URI (i.e. something other than "/"), call function "handleNotFound"

  server.begin();                           // Actually start the server
  Serial.println("HTTP server started");
  
  // put your setup code here, to run once:
  Wire.begin(D3,D4);
  dmx.init();           
  delay(200); 

}

void loop() {
  server.handleClient();
  dmx.update();  
}

void handleSetPower(){
 
  if (server.hasArg("plain")== false){ //Check if body received
    server.send(200, "text/plain", "Body not received"); 
  }

  const size_t capacity = JSON_ARRAY_SIZE(8) + 8*JSON_OBJECT_SIZE(3) + 230;
  DynamicJsonDocument doc(capacity);
  Serial.println("Data received");
  deserializeJson(doc, server.arg("plain"));
 
  JsonObject root = doc;

  server.send(200, "text/plain", "OK");
dmx.write(10, root_0_bottom);
dmx.write(11, root_0_top);
dmx.write(21, root_1_bottom);
dmx.write(20, root_1_top);
dmx.write(7, root_2_bottom);
dmx.write(8, root_2_top);
dmx.write(22, root_3_bottom);
dmx.write(23, root_3_top);
dmx.write(16, root_4_bottom);
dmx.write(17, root_4_top);
dmx.write(13, root_5_bottom);
dmx.write(14, root_5_top);
dmx.write(1, root_6_bottom);
dmx.write(2, root_6_top);
dmx.write(4, root_7_bottom);
dmx.write(5, root_7_top);
 }

void handleRoot() {
  server.send(200, "text/plain", "Hello world!");   // Send HTTP status 200 (Ok) and send some text to the browser/client
}

void handleNotFound(){
  server.send(404, "text/plain", "404: Not found"); // Send HTTP status 404 (Not Found) when there's no handler for the URI in the request
}
