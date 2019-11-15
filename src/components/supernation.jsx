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
import { withStyles } from '@material-ui/core/styles';

import store from '../store';
import Login from './login';
import Favorites from './favorites';
import Advertisers from './advertisers';

import theme from '../theme/theme';


const styles = theme => ({
  root: {
    //backgroundColor: grey["100"],
  },
  //theme.palette.common.white,

  //background: linear-gradient(to right, #3381EC, #3BF5C6);
  appcontainer: {
    width: 450,
  },

  header: {
    backgroundImage: `linear-gradient(to right, #0061FF , #00FFE0)`
  },

  card: {
    margin: 10,
  },

  list: {
    // overflow:  'auto',
    // maxHeight: 400,
    // minHeight: 600,
    width: '100%'
  }
});

@withStyles(styles)
export default class Supernation extends React.PureComponent {
  constructor(props) {
    super(props);

    // chrome.storage.sync.get(['supernation'], (data) => {
    //   console.log(data);
    // });
  }

  state = {
    signedIn:       true,
    lastSignedInAt: null
  };

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <Box component={Grid} container className={classes.appcontainer}>
              <Switch>
                <Route exact path="/"
                  // component={<Login signedIn={this.state.signedIn} />}
                       render={() => {
                         return this.state.signedIn ?
                           <Redirect to='/advertisers' /> :
                           <Login />;
                       }} />
                {/*<Route exact path="/favorites" component={Favorites} />*/}
                <Route exact path="/advertisers" component={Advertisers} />
              </Switch>
            </Box>
          </MuiThemeProvider>
        </Provider>
      </Router>
    );
  }
}
