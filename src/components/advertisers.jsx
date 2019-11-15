import React from 'react';

import axios from 'axios';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import _ from 'lodash';

import PropTypes from 'prop-types';

// import { List as VList } from 'react-virtualized/dist/commonjs'

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollArea from 'react-scrollbar';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { List, ListItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { ArrowBack } from '@material-ui/icons';

import {
  ADVERTISERS_FETCH,
  ADVERTISERS_SEARCH,
  FAVORITES_ADD
} from '../actions';

import SearchBar from './searchbar';
import Navbar from './navbar';
import Advertiser from './advertiser';

const styles = theme => ({
  grid: {
    backgroundColor: "#FFF",
    paddingLeft:     30,
  },

  empty: {
    margin: 10,
  },

  list: {

  },

  card: {
    borderTop: '1px solid grey'
  },

  scrollArea: {
    width:     '100%',
    // height:    500,
    maxHeight: 500,
    // overflow:  'auto',
  },
});


const mapStateToProps = state => {
  return {
    advertisersFiltered: state.get('advertisersFiltered'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    advertisersFetch: () => dispatch(({
      type: ADVERTISERS_FETCH
    })),

    advertisersSearch: (searchTerm) => dispatch(({
      type:    ADVERTISERS_SEARCH,
      payload: {
        searchTerm
      }
    })),

    favoritesAdd: (advertiser, index) => dispatch(({
      type:    FAVORITES_ADD,
      payload: {
        advertiser,
        index,
      }
    }))
  }
};

let mockApi = 'http://localhost:2222/';
let options = {
  url:          mockApi,
  method:       'get',
  responseType: 'json',
};

let fetchAdvertisers = (dispatch) => {
  return axios(options)
    .then(response => {
      let { data } = response;
      dispatch({ type: ADVERTISERS_FETCH, payload: data })
    });
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@withStyles(styles)
export default class Advertisers extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {
    fetchAdvertisers(this.props.dispatch);
  }

  handleBackToFavorite = () => {
    this.props.history.push('/favorites');
  };

  handleScrollUp = (event) => {
    // if (event.deltaY < 0 && event.clientY === event.pageY) {
    //   this.props.history.push('/favorites');
    // }
  };

  handleScroll = ({ realHeight, containerHeight, topPosition }) => {
    // console.log(realHeight, containerHeight, topPosition);
    let counts          = this.props.advertisersFiltered.size;
    let itemHeight      = (realHeight - containerHeight) / counts;
    // Trigger reload at approx few items left to display
    let triggerPosition = realHeight - containerHeight - itemHeight * 0.2;
    if (topPosition > triggerPosition) {
      console.log('loading more data...');
      this.props.advertisersFetch();
    }
  };

  // Using pure component implement this already using shallow comparison
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should update?');
  //   return true;
  // }

  render() {
    const { classes } = this.props;
    return (
      <Grid container
            className={classes.grid}
            onWheel={this.handleScrollUp}>
        <Navbar
          navbarTitle={<SearchBar onSearch={this.props.advertisersSearch} />} />
        <ScrollArea className={classes.scrollArea}
                    speed={0.2}
                    onScroll={this.handleScroll}
                    smoothScrolling={true}
                    horizontal={false}>
          <Fade in={true} timeout={760}>
            {this.props.advertisersFiltered.isEmpty() ?
              <Card className={classes.empty}>
                <CardContent>
                  <Typography gutterBottom>
                    Tips:
                  </Typography>
                  <Typography component="p">
                    No advertisers found.
                  </Typography>
                </CardContent>
              </Card>
              :
              <List className={classes.list}>
                {this.props.advertisersFiltered
                  .map((advertiser, index) =>
                    <Advertiser
                      className={classes.card}
                      key={_.get(advertiser, 'id')}
                      advertiser={advertiser}
                      isFavorite={Boolean(_.get(advertiser, 'isFavorite'))}
                      secondaryAction={() => this.props.favoritesAdd(advertiser, index)}
                    />
                  )}
              </List>}
          </Fade>
        </ScrollArea>
      </Grid>
    )
  }
}
