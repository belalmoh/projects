import ReactDOM from "react-dom";
import App from "./containers/Todo";

const app = document.getElementById("app");
ReactDOM.render(<App />, app);

if (module.hot) {
    module.hot.accept();
}