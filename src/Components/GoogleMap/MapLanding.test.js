import React from 'react';
import ReactDOM from 'react-dom';
import MapLanding from './MapLanding';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapLanding />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(div).toMatchSnapshot();  
});