import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import LandingPage from "./components/Screens/LandingPage/LandingPage.js";
import MyNotes from "./components/Screens/MyNotes/MyNotes.js";
import RegisterScreen from "./components/Screens/RegisterScreen/RegisterScreen.js";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen.js";
import CreateNote from "./components/Screens/CreateNote/CreateNote.js";
import UpdateNote from "./components/Screens/CreateNote/UpdateNote.js";
import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("")
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/note/:id" element={<UpdateNote />} />
        <Route path="/mynotes" element={<MyNotes search={search} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
  
}

export default App;
