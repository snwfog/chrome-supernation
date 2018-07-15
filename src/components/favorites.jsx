import React from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import _ from 'lodash';
import moment from 'moment';
import faker from 'faker';

import KeyboardEventHandler from 'react-keyboard-event-handler';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Navbar from './navbar'
import Advertiser from './advertiser';

const styles = theme => ({
  root: {
    backgroundColor: grey["100"],
  },

  list: {
    // overflow:  'auto',
    // maxHeight: 400,
    width: '100%'
  }
});

const mapStateToProps = state => {
  return { favorites: state.favorites };
};

@connect(mapStateToProps)
@withRouter
@withStyles(styles)
export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    // if (_.isEmpty(props.favorites)) {
    //   this.props.history.push('/advertisers');
    // }
    console.log('favorites constructed');
  }

  handleScroll = (event) => {
    // console.log(event.clientY, event.deltaY, event.pageY);
    if (event.deltaY > 0) {
      this.props.history.push('/advertisers');
    }
  };

  handleKeyPress = (key, event) => {
    if (key === 'down') {
      this.props.history.push('/advertisers');
    }
  };

  render() {
    const { classes, favorites } = this.props;

    return (
      <Grid container
            className={classes.root}
            onWheel={this.handleScroll}>
        <KeyboardEventHandler handleKeys={['down']}
                              onKeyEvent={this.handleKeyPress} />
        <Navbar navbarTitle={
          <Typography variant="title" style={{ flexGrow: 1 }}>
            Favorites
          </Typography>
        } />

        {
          _.isEmpty(favorites) ?
            <Typography>Please add some favorites</Typography> :
            <List className={classes.list}>
              <Grid item>
                {_.map(favorites, (favorite) => {
                  return (
                    <Advertiser key={favorite.id} advertiser={favorite}
                                favorite={true} />
                  )
                })}
              </Grid>
            </List>
        }
      </Grid>
    )
  }
}

