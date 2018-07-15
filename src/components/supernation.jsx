import React from 'react';
import { Provider } from 'react-redux';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

import store from '../store';

import Login from './login';
import Favorites from './favorites';
import Advertisers from './advertisers';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#43d3af'
    },
    // background: {
    //   main: grey["800"]
    // },
    // type:    'dark'
  }
});

const styles = theme => ({
  root: {
    width:     500,
    // maxHeight: 500,
  },

  animatedSwitch: {
    position:  'relative',
    '& > div': {
      position: 'absolute'
    }
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
    lastSignedInAt: null,
  };

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <Grid container className={classes.root}>
              <Switch>
                <Route exact path="/"
                  // component={<Login signedIn={this.state.signedIn} />}
                       render={() => {
                         return this.state.signedIn ?
                           <Redirect to='/favorites' /> :
                           <Login />
                       }} />
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/advertisers" component={Advertisers} />
              </Switch>
            </Grid>
          </MuiThemeProvider>
        </Provider>
      </Router>
    )
  }
}
