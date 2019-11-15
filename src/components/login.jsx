import React from 'react';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import { grey, blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { OpenInNew, FlashOn } from '@material-ui/icons';
import Input from '@material-ui/core/Input';

const theme = createMuiTheme({
  palette:    {
    type:    'light',
    primary: {
      main: '#43d3af'
    },
  },
  typography: {
    fontFamily:      ["Roboto", "-apple-system",
                       "BlinkMacSystemFont", "Segoe UI",
                       "Arial", "sans-serif"].join(","),
    useNextVariants: true,
  }
});

const styles = theme => ({
  root: {
    backgroundColor: grey['100']
  },

  textFieldPopper: {
    marginBottom: -50
  },

  textFieldTooltip: {
    backgroundColor: '#43d3af'
  }
});

@withRouter
@withStyles(styles)
export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { superName: '', superPassword: '' };
  }

  state = {
    superName:                    null,
    superPassword:                null,
    showTooltipSupernameRequired: true,
    showTooltipPasswordRequired:  true,
  };

  updateTextfield = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSuperPlatform = () => {
    console.log(this.state);
    if (!_.isEmpty(this.state.superName) && !_.isEmpty(this.state.superPassword)) {
      this.props.history.push('/favorites');
    } else {
      if (_.isEmpty(this.state.superName)) {
        this.setState({ showTooltipSupernameRequired: true });
      }

      if (_.isEmpty(this.state.password)) {
        this.setState({ showTooltipPasswordRequired: true });
      }
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
            <Typography align="left">
              Supernation
            </Typography>
            <Grid container alignItems="center" justify="center">
              <FormControl fullWidth>
                <InputLabel htmlFor="super-name">
                  Supername
                </InputLabel>
                <Tooltip classes={{
                  popper:  classes.textFieldPopper,
                  tooltip: classes.textFieldTooltip
                }}
                         title="Supername is required"
                         placement="top-end"
                         disableFocusListener={true}
                         disableHoverListener={true}
                         disableTouchListener={true}
                         open={true}>
                  <Input fullWidth id='super-name' name='superName'
                         type='text'
                         onChange={this.updateTextfield} />
                </Tooltip>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="super-password">
                  Password
                </InputLabel>
                <Tooltip classes={{
                  popper:  classes.textFieldPopper,
                  tooltip: classes.textFieldTooltip
                }}
                         title="Password is required"
                         placement="top-end"
                         disableFocusListener={true}
                         disableHoverListener={true}
                         disableTouchListener={true}
                         open={true}>
                  <Input fullWidth id='super-password' name='superPassword'
                         type='password'
                         onChange={this.updateTextfield} />
                </Tooltip>
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
