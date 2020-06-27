import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import ChartistGraph from "react-chartist";


const ENDPOINT = "http://localhost:8000";



function Dashboard() {
  const [response, setResponse] = useState("");
  const [feed, setFeed] = useState({
    labels: [],
    series: [[]],
  })

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
        setResponse(data);
        console.log("DATA: ", data.timeStamp)
        setFeed({
            ...feed.labels = feed.labels.concat([data.timeStamp]),
            ...feed.series[0] = feed.series[0].concat([data.illuminance])
        })
        console.log("FEED: ", feed)
    });
    return () => socket.disconnect();
  }, []);

  const milisecondsToDate = (miliseconds) => {
    const date = new Date(miliseconds)
    return date.toLocaleTimeString();
  }


  var options = {
    high: 700,
    low: 0,
    divisor: 7,
    ticks: [1, 100, 200, 300, 400, 500, 600, 700],
    showArea: true,
    stretch: true,
    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 2 === 0 ? value : null;
      },
    },
  };

  var type = "Line";

  return (
    <div>
      <ChartistGraph data={feed} options={options} type={type} />
      <p>
        socketData: <p>{milisecondsToDate(response.timeStamp)}</p>
        <p>{response.illuminance}</p>
        <p>{response.lightPower}</p>
      </p>
    </div>
  );
}

export default Dashboard;
