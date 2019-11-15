import React from 'react';
import { Provider } from 'react-redux';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { MuiThemeProvider } from '@material-ui/core/styles';

import store from '../store';
import Login from './login';
import Favorites from './favorites';
import Advertisers from './advertisers';

import theme from '../theme/theme';


export default class Supernation extends React.PureComponent
{
  constructor (props)
  {
    super(props);

    // chrome.storage.sync.get(['supernation'], (data) => {
    //   console.log(data);
    // });
  }

  state = {
    signedIn      : true,
    lastSignedInAt: null
  };

  render ()
  {
    return (
      <Router>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <Box component={Grid} container width="500px">
              <Switch>
                <Route exact path="/"
                  // component={<Login signedIn={this.state.signedIn} />}
                       render={() =>
                       {
                         return this.state.signedIn ?
                           <Redirect to='/favorites'/> :
                           <Login/>;
                       }}/>
                <Route exact path="/favorites" component={Favorites}/>
                <Route exact path="/advertisers" component={Advertisers}/>
              </Switch>
            </Box>
          </MuiThemeProvider>
        </Provider>
      </Router>
    );
  }
}
