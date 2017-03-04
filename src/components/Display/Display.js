import React from 'react';
import Form from '../Form/Form.js'
import './Display.css';

function Display () {
    return (
      <main>
        <p className="info">NextBus Compare let's you compare up to 3 station stops and list all available transit vechicle that will stop at the listed station.</p>
        <Form />
      </main>
    );
}

export default Display