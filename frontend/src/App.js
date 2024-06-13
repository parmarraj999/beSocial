import "./App.css"
import { BrowserRouter, Routes , Route} from "react-router-dom"
import Welcome from "./layout/welcome/welcome";
import Home from "./layout/home/home";
import Nav from "./layout/nav/nav";
import Search from "./layout/search/search";
import Auth from "./layout/auth/auth";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>  
        <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/search" element={<Search/>}/>
         <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
