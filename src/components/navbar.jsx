import React from 'react';

import { withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Sort,
  SortByAlpha,
  PowerSettingsNew,
  MoreVert,
  Search as Magnifier
} from '@material-ui/icons';
import Input from '@material-ui/core/Input';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type:    'dark',
    primary: {
      main: '#43d3af'
    },
  }
});

@withRouter
export default class Search extends React.Component {
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
    return (
      <AppBar position="static"
              style={{
                background:   'linear-gradient(270deg,#3bf5c6,#3381ec)',
                border:       3,
                borderColor:  '#43d3af',
                boxShadow:    '0 3px 5px 2px rgba(67, 211, 175, .3)',
                borderRadius: '3px 3px 0 0'
              }}>
        <Toolbar>
          <MuiThemeProvider theme={theme}>
            <FormControl fullWidth>
              <Input fullWidth
                     id="search"
                     type="text"
                     placeholder="stackbot@stackadapt.com"
                     startAdornment={
                       <InputAdornment position="start"
                                       style={{ marginTop: 3, marginRight: 8 }}>
                         <Magnifier />
                       </InputAdornment>
                     } />
            </FormControl>
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
