import React from 'react';
import ReactDOM from 'react-dom';
import SnapLocationsList from './SnapLocationsList';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SnapLocationsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});