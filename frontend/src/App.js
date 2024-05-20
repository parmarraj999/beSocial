import "./App.css"
import { BrowserRouter, Routes , Route} from "react-router-dom"
import Auth from "./layouts/auth/auth";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
