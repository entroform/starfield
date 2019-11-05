import React from 'react';
import ReactDOM from 'react-dom';

import { Reset } from 'styled-reset';

import StarField from './components/star-field';

const App = () => {
  return (
    <>
      <Reset />
      <StarField />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));