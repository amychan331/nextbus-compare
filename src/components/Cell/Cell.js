import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_list: [],
      location: null,
      msg: null,
    }
  }

  componentWillMount() {
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
          // Get data for each vechicle
          const vechicle_data = vechicles.map( vechicle => {
            let diffTime = parseInt(( new Date(vechicle.MonitoredCall.AimedArrivalTime) - new Date(data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit[0].RecordedAtTime) ) / 60000, 10);
            return {"line":vechicle.PublishedLineName, "time":diffTime};
          });
          // Get station location
          const location = vechicles[0].MonitoredCall.StopPointName;
          // Set data
          this.setState({data_list: vechicle_data, location: location});
        }
        catch(e) {
          this.setState({msg: "Transit station with a stop code of " + stopCode + " either does not exist or is not running."});
        }
      }).catch(e => {
        console.log('Request failed', e)
      })
    ) // end return
  }

  render() {
    if (this.state.data_list.length !== 0) {
      return (
        <section className="timeCell">
          <p className="stop">Stop {this.props.stopCode}: {this.state.location}</p>
            {this.state.data_list.map((vechicle, i) => {return <p key={i}>{vechicle.line}: <br /><strong className="minutes">{vechicle.time} min</strong></p>})}
        </section>
      )
    }
    // Return empty message before componentWillMount and error message during render
    else {
      return (
        <section className="timeCell">
          {this.state.msg}
        </section>
      )
    }
  }
}

export default Cell;