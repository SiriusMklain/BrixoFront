import './App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Edit from "./pages/Edit/Edit";
import React, {Component} from "react";
import Header from "./components/Header/Header";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
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
        )
    }
}


export default App;
