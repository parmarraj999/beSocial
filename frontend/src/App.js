import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layout/home/home";
import Nav from "./layout/nav/nav";
import Search from "./layout/search/search";
import Auth from "./layout/auth/auth";
import { useEffect, useState } from "react";
import { UserDataContext, UserIDContext, UserProfileContext } from "./context/context";
import Profile from "./layout/profile/profile";
import UserCenter from "./layout/profile/userCenter/userCenter";

function App() {

  const [userID, setUserID] = useState()
  const [userData, setUserData] = useState({})
  const [userProfile,setUserProfile] = useState("")

  const isLoged = window.localStorage.getItem("isLogIn")

  // console.log(userData)

  return (
    <div className="App">
      <UserProfileContext.Provider value={{userProfile,setUserProfile}} >
      <UserDataContext.Provider value={{userData,setUserData}} >
        <UserIDContext.Provider value={{ userID, setUserID }} >
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" exact element={ isLoged ? <Home /> : <Auth/>} />
              {/* <Route path="/" exact element={<Home />} /> */}
              <Route path="/search" element={<Search />} />
              {/* <Route path="/auth" element={<Auth />} /> */}
              <Route path="/profile/" element={<Profile/>} >
                <Route path="user-center" element={<UserCenter/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserIDContext.Provider>
      </UserDataContext.Provider>
      </UserProfileContext.Provider>
    </div>
  );
}

export default App;
