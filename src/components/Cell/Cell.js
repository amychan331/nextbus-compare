import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    return(
      <section className="timeCell">
          <p className="stop">Stop {this.props.stopCode}: {this.props.location}</p>
          {this.props.cell.map((vechicle, i) => {return <p key={i}>{vechicle.line}: <p className="minutes">{vechicle.time} min</p></p>})}
      </section>
    )
  }
}

export default Cell;