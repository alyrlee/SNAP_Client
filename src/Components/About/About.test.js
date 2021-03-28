import React from 'react';
import ReactDOM from 'react-dom';
import About from './About';

it('renders without crashing', () => {
  const section = document.createElement('section');
  ReactDOM.render(<About />, section);
  ReactDOM.unmountComponentAtNode(section);
  expect(section).toMatchSnapshot();  

});