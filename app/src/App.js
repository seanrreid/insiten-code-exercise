import React, { Component } from 'react'

import Header from './components/header'
import Footer from './components/footer'
import Dashboard from "./components/dashboard/dashboard";

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Dashboard/>
                <Footer/>
            </div>
        );
    }
}

export default App;
