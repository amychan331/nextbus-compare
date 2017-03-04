import React, { Component } from 'react';
import './Timetable.css';
import Cell from '../Cell/Cell';

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: [],
      location: null,
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
          const line = data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;
          const vechicles = line.map(vechicles => {return vechicles.MonitoredVehicleJourney});

          // Output data for each vechicle
          const vechicle_data = vechicles.map( vechicle => {
            let diffTime = parseInt(( new Date(vechicle.MonitoredCall.AimedArrivalTime) - new Date(data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit[0].RecordedAtTime) ) / 60000, 10);
            return {"line":vechicle.PublishedLineName, "time":diffTime};
          })
          this.setState({cell: vechicle_data});

          // Get station location
          const location = vechicles[0].MonitoredCall.StopPointName;
          this.setState({location: location});
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
          <Cell stopCode={this.props.stopCode} cell={this.state.cell} location={this.state.location}/>
        </section>
      )
    }
  }
}

export default Timetable;
