import React from 'react';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Sort,
  SortByAlpha,
  PowerSettingsNew,
  MoreVert,
} from '@material-ui/icons';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type:    'dark',
    primary: {
      main: '#43d3af'
    },
  }
});

const styles = theme => ({
  root: {
    background:   'linear-gradient(270deg,#3bf5c6,#3381ec)',
    border:       3,
    borderColor:  '#43d3af',
    boxShadow:    '0 3px 5px 2px rgba(67, 211, 175, .3)',
    borderRadius: '3px 3px 0 0'
  }
});

@withRouter
@withStyles(styles)
export default class Navbar extends React.Component {
  // static propTypes = {
  //   titleComponent: PropTypes.instanceOf(React.Component).isRequired,
  // };

  static defaultProps = {
    navbarTitle: <Typography variant="title" style={{flexGrow: 1}}>
                   Untitled
                 </Typography>
  };

  state = {
    menuAnchorEl: null,
  };

  openMenu = (event) => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ menuAnchorEl: null })
  };

  logout = () => {
    this.props.history.push('/');
    this.closeMenu();
  };

  render() {
    const { classes, navbarTitle } = this.props;

    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <MuiThemeProvider theme={theme}>
            {navbarTitle}
            <IconButton onClick={this.openMenu}>
              <MoreVert />
            </IconButton>
          </MuiThemeProvider>
          <Menu anchorEl={this.state.menuAnchorEl}
                open={Boolean(this.state.menuAnchorEl)}
                onClose={this.closeMenu}>
            <MenuItem onClick={this.logout}>
              <ListItemIcon><PowerSettingsNew /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><Sort /></ListItemIcon>
              <ListItemText>Display by access time</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><SortByAlpha /></ListItemIcon>
              <ListItemText>Display by alphabetically</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }
}
