import './App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Edit from "./pages/Edit/Edit";
import React from "react";
import Header from "./components/Header/Header";

function App() {
  return (
      <Router>
        <div className="wrapper">
          <Header/>
          <div className="content">
            <Routes>
              <Route path="/">
                <Route index element={<Home/>}/>
                <Route path="edit" element={<Edit/>}/>
              </Route>
            </Routes>
          </div>
        </div>
      </Router>


  );
}

export default App;
