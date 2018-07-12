import React from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

import Login from './login';
import Listing from './listing';

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

class Supernation extends React.Component {
  constructor(props) {
    super(props);

    // chrome.storage.sync.get(['supernation'], (data) => {
    //   console.log(data);
    // });
  }

  state = () => {
    console.log('getting states');
    return {
      signedIn:       false,
      lastSignedInAt: null,
    }
  };

  componentWillMount() {
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Grid container
                style={{
                  width: 500,
                  // background:     '#212121'
                }}>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/listing" component={Listing} />
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default Supernation;
