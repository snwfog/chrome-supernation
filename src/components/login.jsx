import React from 'react';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { grey, blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { OpenInNew, FlashOn } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import { Box } from "@material-ui/core";

// const theme = createMuiTheme({
//   palette:    {
//     type:    'light',
//     primary: {
//       main: '#43d3af'
//     },
//   },
//   typography: {
//     fontFamily:      ["Roboto", "-apple-system",
//                        "BlinkMacSystemFont", "Segoe UI",
//                        "Arial", "sans-serif"].join(","),
//     useNextVariants: true,
//   }
// });

const styles = theme => ({
  grid: {
    backgroundColor: '#FFF',
    width:           300,
    height:          200,
    alignSelf:       'center',
  },

  header: {
    backgroundImage: `linear-gradient(to right, #0061FF , #00FFE0)`
  },

  loginGrid: {
    display:        'flex',
    justifyContent: 'center',
  },

  loginForm: {
    width:          300,
    height:         240,
    padding:        '10% 0',
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'space-around',
  },

  loginBtn: {
    alignSelf:    'center',
    background:   'linear-gradient(270deg, #0061FF, #00FFE0)',
    borderRadius: 999,
    // border:       3,
    // borderColor:  '#43d3af',
    color:        'white',
    boxShadow:    '0 3px 5px 2px rgba(67, 211, 175, .3)',
    padding:      '10px 30px',
    width:        180,
  },
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
    if (!isEmpty(this.state.superName) && !isEmpty(this.state.superPassword)) {
      this.props.history.push('/favorites');
    } else {
      if (isEmpty(this.state.superName)) {
        this.setState({ showTooltipSupernameRequired: true });
      }

      if (isEmpty(this.state.password)) {
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
      <Grid container className={classes.root} justify="center">
        <Box height="5px" width="100%" className={classes.header} />
        <Grid container className={classes.loginGrid}>
          <form className={classes.loginForm}>
            <TextField required fullWidth
                       InputLabelProps={{ shrink: true }}
                       label="Supername" />
            <TextField required fullWidth
                       InputLabelProps={{ shrink: true }}
                       label="Password"
                       type="password"
                       autoComplete="current-password" />
            <Button onClick={this.handleSuperPlatform}
                    className={classes.loginBtn}>
              Super
              <FlashOn style={{ marginLeft: 10 }} />
            </Button>
            {/*<Grid item style={{ margin: 10 }}>*/}
            {/*  <IconButton onClick={this.handleOpenPlatform}>*/}
            {/*    <OpenInNew />*/}
            {/*  </IconButton>*/}
            {/*</Grid>*/}
          </form>
          {/*<FormControl fullWidth>*/}
          {/*  <InputLabel htmlFor="super-name">*/}
          {/*    Supername*/}
          {/*  </InputLabel>*/}
          {/*  <Tooltip classes={{*/}
          {/*    popper:  classes.textFieldPopper,*/}
          {/*    tooltip: classes.textFieldTooltip*/}
          {/*  }}*/}
          {/*           title="Supername is required"*/}
          {/*           placement="top-end"*/}
          {/*           disableFocusListener={true}*/}
          {/*           disableHoverListener={true}*/}
          {/*           disableTouchListener={true}*/}
          {/*           open={true}>*/}
          {/*    <Input fullWidth id='super-name' name='superName'*/}
          {/*           type='text'*/}
          {/*           onChange={this.updateTextfield} />*/}
          {/*  </Tooltip>*/}
          {/*</FormControl>*/}
          {/*<FormControl fullWidth>*/}
          {/*  <InputLabel htmlFor="super-password">*/}
          {/*    Password*/}
          {/*  </InputLabel>*/}
          {/*  <Tooltip classes={{*/}
          {/*    popper:  classes.textFieldPopper,*/}
          {/*    tooltip: classes.textFieldTooltip*/}
          {/*  }}*/}
          {/*           title="Password is required"*/}
          {/*           placement="top-end"*/}
          {/*           disableFocusListener={true}*/}
          {/*           disableHoverListener={true}*/}
          {/*           disableTouchListener={true}*/}
          {/*           open={true}>*/}
          {/*    <Input fullWidth id='super-password' name='superPassword'*/}
          {/*           type='password'*/}
          {/*           onChange={this.updateTextfield} />*/}
          {/*  </Tooltip>*/}
          {/*</FormControl>*/}
        </Grid>
        {/*<Grid container justify="center">*/}
        {/*</Grid>*/}
      </Grid>
    );
  }
}
