import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layout/home/home";
import Nav from "./layout/nav/nav";
import Search from "./layout/search/search";
import Auth from "./layout/auth/auth";
import { useState } from "react";
import { SearchListData, UserDataContext, UserIDContext, UserProfileContext } from "./context/context";
import Profile from "./layout/profile/profile";
import UserCenter from "./layout/profile/userCenter/userCenter";
import UserProfilePage from "./layout/userProfile/userProfile";

function App() {

  const [userID, setUserID] = useState()
  const [userData, setUserData] = useState({})
  const [userProfile, setUserProfile] = useState("")
  const [searchData, setSearchData] = useState([])
  const [searchText,setSearchText] = useState("")
  // console.log(searchData)

  const isLoged = window.localStorage.getItem("isLogIn")

  // console.log(userData)



  return (
    <div className="App">
      <SearchListData.Provider value={{ searchData, setSearchData, searchText ,setSearchText }}>
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }} >
          <UserDataContext.Provider value={{ userData, setUserData }} >
            <UserIDContext.Provider value={{ userID, setUserID }} >
              <BrowserRouter>
                <Nav />
                <Routes>
                  <Route path="/" exact element={isLoged ? <Home /> : <Auth />} />
                  {/* <Route path="/" exact element={<Home />} /> */}
                  <Route path="/search" element={<Search />} />
                  {/* <Route path="/auth" element={<Auth />} /> */}
                  <Route path="/profile/" element={<Profile />} >
                    <Route path="user-center" element={<UserCenter />} />
                  </Route>
                  <Route path="/user-profile/:id" element={<UserProfilePage />} />
                </Routes>
              </BrowserRouter>
            </UserIDContext.Provider>
          </UserDataContext.Provider>
        </UserProfileContext.Provider>
      </SearchListData.Provider>
    </div>
  );
}

export default App;
