import L from "leaflet";
import 'leaflet/dist/leaflet.css'
class GpsMap {
  constructor(lat, lon, name) {
    this.lat = lat;
    this.lon = lon;
    this.name = name;
  }
  render() {
    const div = document.createElement('div')
    div.style.width = '50%'
    div.style.height = '500px'

    setTimeout(() => {
      const map = L.map(div).setView([this.lat, this.lon], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([this.lat, this.lon], { opacity: 5 })
        .addTo(map)
        .bindPopup(this.name)
        .openPopup();
    })


    return div

  }
}
export default GpsMap;
