import React, { Component } from 'react';
import './Form.css';
import Timetable from '../Timetable/Timetable.js'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agency: '',
      stopCode: '',
      err_agency: '',
      err_stopCode: '',
      err_submission: '',
      submit_list: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    //Validation to see if error message should be output
    if (name === "agency") {
      if(value.length < 1) {
        this.setState({err_agency: "Error: Select an agency"});
      } else {
        if (this.state.err_agency.length > 0 ) {this.setState({err_agency: ''})};
      }
    };
    if (name === "stopCode") {
      if(value.toLowerCase() !== value.toUpperCase()) {
        this.setState({err_stopCode: "Error: Numbers only"});
      } else {
        if (this.state.err_stopCode.length > 0 ) {this.setState({err_stopCode: ''})};
      }
    };

    //Before setState, make sure there is no leftover error from previous input submission.
    (this.state.err_submission.length > 0 ) ? this.setState({[name]: value, err_submission: ''}) : this.setState({[name]: value})
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.submit_list.find(element => element.stopCode === this.state.stopCode)) {
      this.setState({err_submission: 'The same code was input earlier. Try a different one.'});
    } else {
      if (this.state.submit_list.length < 3) {
        let submit_list = this.state.submit_list.slice()
        submit_list.push({'agency': this.state.agency, 'stopCode': this.state.stopCode})
        this.setState({submit_list: submit_list});
      } else {
        this.setState({err_submission: "Please only enter up to 3 station stops."});
      }
    }
  }

  render() {
    // Validation to determine if submit button should be enable
    const isEnabled = this.state.agency.length > 0 && parseFloat(this.state.stopCode) == this.state.stopCode;

    return (
      <form onSubmit={this.handleSubmit}>
        <div id="inputBox">
        <label htmlFor="agency"><b>Transit Agency: </b></label>
        <select id="agency" name="agency" value={this.state.agency} onChange={this.handleChange} aria-describedby="err_agency" autoFocus required>
          <option value="">None</option>
          <option value="sf-muni">Muni</option>
          <option value="bart">BART</option>
          <option value="caltrain">Caltrain</option>
        </select>
        <span id="err_agency" className="error" role="alert">{this.state.err_agency}</span>
        <br />
        <label htmlFor="stopCode"><b>Enter bus stop code: </b></label>
        <input id="stopCode" name="stopCode" type="text" placeholder="Stop code" maxLength="5" value={this.state.stopCode} onChange={this.handleChange} aria-describedby="stopCode_error" required/>
        <span id="err_stopCode" className="error" role="alert">{this.state.err_stopCode}</span>
        </div>
        <input disabled={!isEnabled} type="submit" name="submit" value="Submit" aria-describedby="err_submission"/>
        <p id="err_submission" className="error" role="alert">{this.state.err_submission}</p>

        <Timetable submission={this.state.submit_list} />
      </form>
    );
  }
}

export default Form