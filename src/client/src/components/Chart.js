import React, { useState, useEffect, Component } from "react";
import ChartistGraph from "react-chartist";

class Chart extends Component {
  state = {};

  render() {
    const { feed } = this.props;
    console.log("FEED: ", feed);

    return <ChartistGraph data={feed} options={options} type={type} />;
  }
}

export default Chart;
