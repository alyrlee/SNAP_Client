import React from 'react';
import ReactDOM from 'react-dom';
import SnapLocationsListItem from './SnapLocationsListItem';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SnapLocationsListItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});