//@ToDo add buto Try again, when api do not work properly//
//@ToDo refactoring experimental opeerator in checking chains//
import Input from "./Input";
import { fetchData } from "../functionality/fetchData";
import { debounce } from "../functionality/debounce";
import Message from "./Message";
import ChartComponent from "./ChartComponent";
import GpsMap from "./GpsMap";

class App {
  stateEnum = {
    isLoading: "Loading",
    hasError: "Error",
    default: "Default",
  };
  constructor(data) {
    this.container = null;
    this.data = data;
    this.apiKey = "29644a38fc0ecc692cc3cbe62c444405";
    this.query = "";
    this.errorMessage = null;
    this.state = this.stateEnum.default;
    this.debouncingFetchWeather = debounce(() => this.fetchWeather(), 1000);
    //zapisuje funkcje debounce do stanu, aby moc z niej korzystac, a moze przeniesc ja gdzies indziej
  }
  // DATA MANIPULATION /////////////////////////////////////////////////////////////////////////////////////////////////
  fetchWeather() {
    fetchData(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.query}&lang=pl&units=metric&appid=${this.apiKey}`,
      {
        start: () => this.startCallback(),
        catchError: (error) => this.catchCallback(error),
        end: () => this.endCallback(),
      }
    )
      // nasze dane transformuje funkcja juz na json wiec mozemy od razu wyswietlic odpowiedz
      .then((data) => {
        this.setData(data);
        console.log("data before seeting", this.data);
      });
  }
  setData(data) {
    this.data = data;
    this.render();
  }

  transformWeatherData(data) {
    const list = data && data.list;
    return list.map((dataItem) => {
      const dt = dataItem && dataItem.dt;
      const temp = dataItem && dataItem.main && dataItem.main.temp;
      const perceivedTemp =
        dataItem && dataItem.main && dataItem.main.feels_like;
      // that was feels_like started property name changed name in the console
      return { dt, temp, perceivedTemp };
    });
  }



  // potrzebujemy do wyswietlania temperatury w Celciuszach oraz dataTime, czyli timestampu, wydobyc dt i main temp//


  // EVENT HANDLER ///////////////////////////////////////////////////////////////////////////////////////////////////////
  onInput(event) {
    this.query = event.target.value;
    this.debouncingFetchWeather();
    this.render();
  }
  // CALLLBACKI DO FETCHA ///////////////////////////////////////////////////////////////////////////////////////////////
  startCallback() {
    this.state = this.stateEnum.isLoading;
    this.render();
  }
  catchCallback(error) {
    this.state = this.stateEnum.hasError;
    this.errorMessage = error;
    this.render();
  }
  endCallback() {
    if (this.state !== this.stateEnum.hasError) {
      this.state = this.stateEnum.default;
    }
    this.render();
  }

  getCityCord(){
    const name = this.data?.city?.name;
    const lat = this.data?.city?.coord?.lat;
    const lon = this.data?.city?.coord?.lon;
    return {name,lat ,lon}
  }

  render() {
    if (this.container === null) {
      this.container = document.createElement("div");
    }

    this.container.classList.add(".main-container");
    this.container.innerHTML = "";
    const searchInput = new Input(
      "type city",
      this.query,
      (event) => this.onInput(event),
      "main-input"
    );

    if (this.data !== undefined) {
      console.log(
        "transformed Data before pass",
        this.transformWeatherData(this.data)
      );
      const chart = new ChartComponent(this.transformWeatherData(this.data));
      this.container.appendChild(chart.render());
      const {lat,lon,name} = this.getCityCord()
      const map = new GpsMap(lat,lon,name)
      this.container.appendChild(map.render())
    }

    this.container.appendChild(searchInput.render());
    // RENDER MESSAGE CONTAINER ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (this.state === this.stateEnum.isLoading) {
      const message = new Message("LOADING");
      this.container.appendChild(message.render());
      return this.container;
    }
    if (this.state === this.stateEnum.hasError) {
      const message = new Message("Error Occured");
      this.container.appendChild(message.render());
      return this.container;
    }
    if (this.state === this.stateEnum.default) {
      const message = new Message("READY");
      this.container.appendChild(message.render());
      return this.container;
    }


    return this.container;
  }
}

export default App;
