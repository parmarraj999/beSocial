import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layout/home/home";
import Nav from "./layout/nav/nav";
import Search from "./layout/search/search";
import Auth from "./layout/auth/auth";
import { useState } from "react";
import { UserDataContext, UserIDContext } from "./context/context";

function App() {

  const [userID, setUserID] = useState()
  const [userData, setUserData] = useState({})

  console.log(userData)
  return (
    <div className="App">
      <UserDataContext.Provider value={{userData,setUserData}} >
        <UserIDContext.Provider value={{ userID, setUserID }} >
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </BrowserRouter>
        </UserIDContext.Provider>
      </UserDataContext.Provider>
    </div>
  );
}

export default App;
