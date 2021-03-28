import React from 'react';
import ReactDOM from 'react-dom';
import UserSavedLocations from './UserSavedLocations'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserSavedLocations />, div);
  ReactDOM.unmountComponentAtNode(div);
});