class GpsMap {
  constructor(lat, lon, name) {
    this.lat = lat;
    this.lon = lon;
    this.name = name;
  }
  render() {
    const div = document.createElement("div");
    const p1 = document.createElement("p");
    p1.innerText = this.name;
    const p2 = document.createElement("p");
    p2.innerText = this.lon;
    const p3 = document.createElement("p");
    p3.innerText = this.lat;
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    return div;
  }
}
export default GpsMap;
