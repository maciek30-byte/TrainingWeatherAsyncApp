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
    const options = {
      weekday: "short",
      day: "numeric",
      hour: "2-digit",
    };

    if (!data) return { temp: [], time: [] };
    data.forEach((dataItem) => {
      time.push(
        new Date(dataItem.dt).toLocaleDateString("en", options)
      );
      temp.push(dataItem.temp);
    });
    return { time, temp };
  }

  render() {
    const data = {
      labels: this.transformDataToChartJs(this.data).time,
      datasets: [
        {
          label: "Pogoda",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: this.transformDataToChartJs(this.data).temp,
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