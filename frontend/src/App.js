import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layout/home/home";
import Nav from "./layout/nav/nav";
import Search from "./layout/search/search";
import Auth from "./layout/auth/auth";
import { useEffect, useState } from "react";
import { UserDataContext, UserIDContext } from "./context/context";
import Profile from "./layout/profile/profile";

function App() {

  const [userID, setUserID] = useState()
  const [userData, setUserData] = useState({})

  console.log(userData)
  const isLoged = window.localStorage.getItem("isLogIn")
  console.log(isLoged)

  return (
    <div className="App">
      <UserDataContext.Provider value={{userData,setUserData}} >
        <UserIDContext.Provider value={{ userID, setUserID }} >
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" exact element={ isLoged ? <Home /> : <Auth/>} />
              <Route path="/search" element={<Search />} />
              {/* <Route path="/auth" element={<Auth />} /> */}
              <Route path="/profile" element={<Profile/>} />
            </Routes>
          </BrowserRouter>
        </UserIDContext.Provider>
      </UserDataContext.Provider>
    </div>
  );
}

export default App;
