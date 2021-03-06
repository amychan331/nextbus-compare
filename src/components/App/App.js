import React from 'react';
import './App.css';
import Display from '../Display/Display';

function App() {
  return (
    <div className="App">
      <Header />
      <Display />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>NextBus Compare</h1>
      <p className="subHeader">At a transit station but no idea what street you are on? No problem! Check when the next transit come by the station code right in front of you!</p>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <small>Copyright &copy; {new Date().getFullYear()} Amy Yuen Ying Chan</small>
    </footer>
  )
}

export default App;
