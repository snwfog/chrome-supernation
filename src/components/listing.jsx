import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

import Navbar from './navbar'
import Favorites from './favorites'
import Advertisers from './advertisers'

const styles = theme => ({
  root: {
    backgroundColor: grey["100"],
    overflow:        'auto',
    maxHeight:       400
  },

  list: {
    width: '100%'
  }
});

class Listing extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Navbar />
        <Grid item className={classes.list}>
          <Favorites />
          <Advertisers dense={true} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Listing);
