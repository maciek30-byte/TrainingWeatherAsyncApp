import Input from "./Input";
import {fetchData} from "./functionality/fetchData";
import {debounce} from "./functionality/debounce";
class App {
  constructor(data,query,hasError) {
    this.data = data;
    this.apiKey = '29644a38fc0ecc692cc3cbe62c444405'
    this.query = '';
    this.hasError = hasError;
    this.debouncingFetchWeather = debounce(()=> this.fetchWeather(),1000);
    // pomyslec nad kontekstem wywolania funkcji debounce
    //zapisuje funkcje debounce do stanu, aby moc z niej korzystac

  }

  fetchWeather(){
    fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${this.query}&APPID=${this.apiKey}`)
    // nasze dane transformuje funkcja juz na json wiec mozemy od razu wyswietlic odpowiedz
      .then( console.log)

  }


  onInput(event){
    this.query = event.target.value;
    this.debouncingFetchWeather()
    this.render()
  }

  render(){
    const divRoot = document.createElement('div');
    divRoot.classList.add('main-container');
    const searchInput = new Input('type city','',(event)=>this.onInput(event),'main-input');
    divRoot.appendChild(searchInput.render())






    return divRoot;



  }
}

export default App