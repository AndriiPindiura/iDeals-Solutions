import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './redux/configureStore';
import routes from './routes';
// import Main from './containers/Main';

require('./components/main.scss');

// require('es6-promise').polyfill();
injectTapEventPlugin();

const store = configureStore();

// render(
//   <MuiThemeProvider>
//     <Provider store={store}>
//       <Main />
//     </Provider>
//   </MuiThemeProvider>,
//   document.getElementById('app')
// );


const childRoutes = routes(store);

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory} >
        {childRoutes}
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
