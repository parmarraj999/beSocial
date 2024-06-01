import "./App.css"
import { BrowserRouter, Routes , Route} from "react-router-dom"
import Welcome from "./layout/welcome/welcome";
import Home from "./layout/home/home";
import Nav from "./layout/nav/nav";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Routes>
         <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
