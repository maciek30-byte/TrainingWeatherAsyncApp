import Chart from "chart.js/auto";
//@ ToDo Fight with chart JS :)//

class ChartComponent {
  constructor(data) {
    this.data = data;
    this.chart = null;
  }

  transformDataToChartJs(data) {
    const time = [];
    const temp = [];
    const perceivedTemp = [];

    const options = {
      weekday: "short",
      day: "numeric",
      hour: "2-digit",
    };

    if (!data) return { temp: [], time: [], perceivedTemp: [] };
    data.forEach((dataItem) => {
      time.push(new Date(dataItem.dt).toLocaleDateString("pl", options));
      temp.push(dataItem.temp);
      perceivedTemp.push(dataItem.perceivedTemp);

    });

    return { time, temp, perceivedTemp };
  }

  render() {
    // czy moge sobie tu napisac test, ze przychodzi dobra data ?? do tego miejsca ??//
    const data = {
      labels: this.transformDataToChartJs(this.data).time,
      datasets: [
        {
          label: "Pogoda",
          backgroundColor: "red",
          borderColor: "red",
          data: this.transformDataToChartJs(this.data).temp,
        },

        {
          label: "temperatura odczuwalna",
          backgroundColor: "yellow",
          borderColor: "rgb(yellow)",
          data: this.transformDataToChartJs(this.data).perceivedTemp,
        },
      ],
    };
    const config = {
      type: "line",
      data,
      options: {},
    };
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    this.chart = new Chart(ctx, config);


    return canvas;
  }
}
export default ChartComponent;
