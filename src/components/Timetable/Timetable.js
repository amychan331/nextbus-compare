import React, { Component } from 'react';
import './Timetable.css';

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: [],
      message: null,
    }
  }

  componentDidMount() {
    const agency = this.props.agency;
    const stopCode = this.props.stopCode;

    return (
      fetch(`https://api.511.org/transit/StopMonitoring?api_key=${process.env.REACT_APP_API_KEY}&agency=${agency}&stopCode=${stopCode}`, {
        method: 'GET',
      }).then(res => {
        return res.json()
      }).then(data => {
        try {
          // Get data from NextBus API:
          let line = data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
          let vechicles = line.map(vechicles => {return vechicles.MonitoredVehicleJourney});

          // Output data for each vechicle
          let vechicle_data = vechicles.map( vechicle => {
            console.log("Line: " + vechicle.PublishedLineName);
            console.log("Stop Location: " + vechicle.MonitoredCall.StopPointName);
            let diffTime = parseInt(( new Date(vechicle.MonitoredCall.AimedArrivalTime) - new Date(data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit[0].RecordedAtTime) ) / 60000, 10);
            console.log("Estimated Arrival Time: " + diffTime + " min");
            return {"line":vechicle.PublishedLineName, "location":vechicle.MonitoredCall.StopPointName, "time":diffTime};
          })
          this.setState({cell: vechicle_data});
        }
        catch(e) {
          this.setState({msg: "Transit station with a stop code of " + stopCode + " either does not exist or is not running."});
        }
      }).catch(e => {
        console.log('Request failed', e)
      })
    );
  }

  render() {
    if (this.state.msg) {
      return (
        <section class="msg">
          {this.state.msg}
        </section>
      )
    }
    if (this.state.cell) {
      return (
        <section id="timeTable">
          <section className="timeCell">
            {this.state.cell.map((vechicle, i) => {return <p key={i}>{vechicle.line} at {vechicle.location}: {vechicle.time} min</p>})}
          </section>
        </section>
      )
    }
  }
}

export default Timetable;
