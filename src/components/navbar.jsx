import React from 'react';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
  Menu as MenuIcon
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
    color: 'black',
    background:   'white',
    boxShadow: 'none!important'
  },

  menu: {
    zIndex: 99999,
  }
});

@withRouter
@withStyles(styles)
export default class Navbar extends React.PureComponent {
  // static propTypes = {
  //   titleComponent: PropTypes.instanceOf(React.PureComponent).isRequired,
  // };

  static defaultProps = {
    navbarTitle: <Typography style={{ flexGrow: 1 }}>
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
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
            >
              {navbarTitle}
              <IconButton onClick={this.openMenu}>
                <MenuIcon />
              </IconButton>
            </Box>
          <Menu className={classes.menu}
                anchorEl={this.state.menuAnchorEl}
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
