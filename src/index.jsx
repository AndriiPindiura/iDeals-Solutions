import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import algoliasearch from 'algoliasearch';
import configureStore from './redux/configureStore';
import routes from './routes';
// import App from './containers/App';
// import Main from './containers/Main';

// require('es6-promise').polyfill();
injectTapEventPlugin();

const store = configureStore();
const childRoutes = routes(store);
// const algolia = algoliasearch('1SY0GAJSAN', '85c6b04ab9ad451f9802d37f5365305b');
// console.log(algolia);
// const index = algoliasearch('1SY0GAJSAN', '85c6b04ab9ad451f9802d37f5365305b').initIndex('idealsSolutions');
// console.log(index.search('joe'));
// index.search('joe', (err, content) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(content.hits);
// });

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
