import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import { store } from "./store/store";
import Bid from "./components/bidder/bid";
import Navbar from "./components/navbar";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auctions" element={<Bid />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
