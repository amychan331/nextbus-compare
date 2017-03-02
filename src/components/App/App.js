import React, { Component } from 'react';
import './App.css';
import Display from '../Display/Display';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Display />
        <Footer />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <header>
        <h1>NextBus Comapre</h1>
        <h5>At a transit station but no idea what street you are on? No problem! Check when the next trasit come by the station code right in front of you!</h5>
      </header>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <footer>
        <small>Copyright &copy; {new Date().getFullYear()} Amy Yuen Ying Chan</small>
      </footer>
    )
  }
}

export default App;
