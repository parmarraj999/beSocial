import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layout/home/home";
import Nav from "./layout/nav/nav";
import Search from "./layout/search/search";
import Auth from "./layout/auth/auth";
import { useEffect, useState } from "react";
import { SearchListData, UserDataContext, UserIDContext, UserProfileContext } from "./context/context";
import Profile from "./layout/profile/profile";
import UserCenter from "./layout/profile/userCenter/userCenter";
import UserProfilePage from "./layout/userProfile/userProfile";
import axios from "axios";
import Notification from "./layout/notification/notification";
import PostExtend from "./layout/profile/myPost/postExtend";
import Feedback from "./layout/feedback/feedback";
import Setting from "./layout/setting/setting";

function App() {

  const [userID, setUserID] = useState()
  const [userData, setUserData] = useState({})
  const [userProfile, setUserProfile] = useState("")
  const [searchData, setSearchData] = useState([])
  const [searchText,setSearchText] = useState("")
  const[showCreateVar,setShowCreateVar] = useState(false)

  const [isLoading,setIsLoading] = useState(true);

  // variable for post detail boolean 
  // const [showDetailVar,setShowDetailVar] = useState(false)

  // console.log(searchData)

  const isLoged = window.localStorage.getItem("isLogIn")
  
  useEffect(() => {
    const userIdbyLocalStorage = window.localStorage.getItem("userId")
    axios.get("https://besocial-q86i.onrender.com/user/" + userIdbyLocalStorage)
      .then((result) => {
        setUserData(result.data[0])
        setIsLoading(false)
        // console.log("data getted")
      })
  }, [])

  console.log(userData)

  return (
    <div className="App">
      <SearchListData.Provider value={{ searchData, setSearchData, searchText ,setSearchText }}>
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }} >
          <UserDataContext.Provider value={{ userData, setUserData, isLoading, setShowCreateVar,showCreateVar }} >
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
                  <Route path="/setting" element={<Setting/>} />
                  <Route path="/user-profile/:id" element={<UserProfilePage />} />
                  <Route path="/post/:id" element={<PostExtend/>} />
                  <Route path='/notification' element={<Notification/>}/>
                  <Route path='/community' element={<Feedback/>}/>
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
