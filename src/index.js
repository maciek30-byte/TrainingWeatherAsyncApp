import App from "./Components/App";
import app from  './app.scss'
const rootElement = document.getElementById('root');
const app1 = new App();
rootElement.appendChild(app1.render())