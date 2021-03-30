import { createBrowserHistory } from 'history';

let history = createBrowserHistory();

history.listen(({ action, location }) => {
    console.log(
      `The current URL is ${location.pathname}${location.search}${location.hash}`
    );
    console.log(`The last navigation action was ${action}`);
  });


let unlisten = history.listen(({ location, action }) => {
    console.log(action, location.pathname, location.state);
  });
  
unlisten();

export default createBrowserHistory();