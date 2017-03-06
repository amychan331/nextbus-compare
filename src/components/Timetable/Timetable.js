import React from 'react';
import './Timetable.css';
import Cell from '../Cell/Cell';

function Timetable (props) {
  if (props.submission.length > 0) {
    return (
      <section id="timeTable" aria-live="polite">
        {props.submission.map(transit_line =>
          <Cell key={transit_line.stopCode} agency={transit_line.agency} stopCode={transit_line.stopCode} />
        )}
      </section>
    );
  } else {
    return <p className="msg">No stop code was entered</p>;
  }
}

export default Timetable;