import React from 'react';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import moment from 'moment';

import { grey, blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { OpenInNew, FlashOn } from '@material-ui/icons';
import Input from '@material-ui/core/Input';

const theme = createMuiTheme({
  palette: {
    type:    'light',
    primary: {
      main: '#43d3af'
    },
  }
});

const styles = theme => ({
  root: {
    backgroundColor: grey['100']
  }
});

@withRouter
@withStyles(styles)
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.setState({ superName: '', superPassword: '' });
  }

  state = {
    superName:     null,
    superPassword: null,
  };

  updateTextfield = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  handleSuperPlatform = () => {
    console.log(this.state);
    if (!!this.state.superName && !!this.state.superPassword) {
      this.props.history.push('/listing');
    }
  };

  handleOpenPlatform = () => {
    chrome.runtime.sendMessage({ hello: 'world' }, (response) => {
      console.log('runtime.sendMessage', response);
      console.log(response, arguments);
    });

    // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    //   console.log('query tabs');
    //   console.log(tabs);
    //   chrome.tabs.sendMessage(tabs[0].id, { hello: 'world' }, (response) => {
    //     console.log('response', response);
    //   });
    // });
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container className={classes.root} justify="center">
          <Grid container
                direction="column"
                justify="space-around"
                style={{
                  width:     '300px',
                  height:    '200px',
                  alignSelf: 'center',
                }}>
            <Typography variant="title" align="left">
              Supernation
            </Typography>
            <Grid container alignItems="center" justify="center">
              <FormControl fullWidth>
                <InputLabel htmlFor="super-name">
                  Supername
                </InputLabel>
                <Input fullWidth id='super-name' name='superName'
                       type='text'
                       onChange={this.updateTextfield} />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="super-password">
                  Password
                </InputLabel>
                <Input fullWidth id='super-password' name='superPassword'
                       type='password'
                       onChange={this.updateTextfield} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item style={{ margin: 10 }}>
              <Button onClick={this.handleSuperPlatform}
                      style={{
                        background:   'linear-gradient(270deg,#3bf5c6,#3381ec)',
                        borderRadius: 3,
                        border:       3,
                        borderColor:  '#43d3af',
                        color:        'white',
                        height:       48,
                        boxShadow:    '0 3px 5px 2px rgba(67, 211, 175, .3)'
                      }}>
                Super
                <FlashOn style={{ marginLeft: 10 }} />
              </Button>
            </Grid>

            <Grid item style={{ margin: 10 }}>
              <IconButton onClick={this.handleOpenPlatform}>
                <OpenInNew />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}
