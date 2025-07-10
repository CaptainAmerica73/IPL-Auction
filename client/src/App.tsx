import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store";
import AppRouter from "./components/appRouter";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
