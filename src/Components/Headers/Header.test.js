import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Header';

describe(`Navbar component`, () => {

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(div).toMatchSnapshot();  
});