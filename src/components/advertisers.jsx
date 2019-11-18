import React from 'react';

import axios from 'axios';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { get, isEmpty, toLower, includes, filter } from 'lodash';

import PropTypes from 'prop-types';

// import { List as VList } from 'react-virtualized/dist/commonjs'

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollArea from 'react-scrollbar';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { Sync } from '@material-ui/icons';
import { List, ListItem, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { ArrowBack } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import TimerIcon from '@material-ui/icons/Timer';
import IconButton from '@material-ui/core/IconButton';


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

  header: {
    backgroundImage: `linear-gradient(to right, #0061FF , #00FFE0)`
  },

  empty: {
    margin: 10,
  },

  list: {},

  card: {
    borderTop: '1px solid grey'
  },

  navbar: {
    padding: 0,
  },

  scrollArea: {
    width:     '100%',
    // minHeight: 500,
    maxHeight: 450,
    // overflow:  'auto',
  },

  // On the bottom
  scrollShadow: {
    paddingTop:    8,
    paddingBottom: 16,
    bottom:        0,
    width:         450,
    zIndex:        10,
    // height:        20,
    left:          0,
    boxShadow:     '0px -10px 20px #EEE',
    borderTop:     `1px solid ${grey['200']}`,
    margin:        0,
  },

  scrollShadowText: {
    fontSize: 9,
  },

  syncIcon: {
    width:        12,
    height:       12,
    marginBottom: -2,
  }
});


const mapStateToProps = state => {
  return {
    advertisers: get(state, 'advertisers', []),
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

    this.state = {
      advertisers: props.advertisers,
    };
  }

  static propTypes = {};

  static defaultProps = {};

  // componentWillMount() {
  //   fetchAdvertisers(this.props.dispatch);
  // }

  handleBackToFavorite = () => {
    this.props.history.push('/favorites');
  };

  handleScrollUp = (event) => {
    // if (event.deltaY < 0 && event.clientY === event.pageY) {
    //   this.props.history.push('/favorites');
    // }
  };

  handleReachBottom = ({ realHeight, containerHeight, topPosition }) => {
    // console.log(realHeight, containerHeight, topPosition);
    let counts          = this.props.advertisers.size;
    let itemHeight      = (realHeight - containerHeight) / counts;
    // Trigger reload at approx few items left to display
    let triggerPosition = realHeight - containerHeight - itemHeight * 0.2;
    if (topPosition > triggerPosition) {
      console.log('loading more data...');
      this.props.advertisersFetch();
    }
  };

  handleSearch = (q) => {
    if (isEmpty(q)) {
      this.setState({ advertisers: this.props.advertisers, });
    } else {
      this.setState({
        advertisers: filter(this.props.advertisers, advertiser =>
          // console.log('filtering', advertiser);
          includes(toLower(get(advertiser, 'email')), toLower(q)) ||
          includes(toLower(get(advertiser, 'first_name')), toLower(q)) ||
          includes(toLower(get(advertiser, 'last_name')), toLower(q)))
      });
    }
  };

  // Using pure component implement this already using shallow comparison
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should update?');
  //   return true;
  // }

  render() {
    const { classes }     = this.props;
    const { advertisers } = this.state;
    const advertisersCount = get(advertisers, 'length');

    return (
      <Grid container>
        <Box height="5px" width="100%" className={classes.header} />
        <Grid container
              className={classes.grid}
              onWheel={this.handleScrollUp}>
          <Navbar className={classes.navbar}
                  navbarTitle={
                    <SearchBar onSearch={this.handleSearch} />} />
          <ScrollArea className={classes.scrollArea}
                      speed={0.2}
                      onScroll={this.handleReachBottom}
                      smoothScrolling={true}
                      horizontal={false}>
            <Box display='flex' flexDirection='column'>
              <Box display='flex' alignItems='center'
                   justifyContent='space-between'>
                <Box className={classes.empty}>
                  <Typography component="p">
                    {advertisersCount ?
                      `${advertisersCount} account(s) found`
                      : 'No advertisers found.'
                    }
                  </Typography>
                </Box>
                {!!advertisersCount && (
                  <Box>
                    <IconButton>
                      <SortByAlphaIcon color='disabled'/>
                    </IconButton>
                    <IconButton>
                      <TimerIcon color='disabled'/>
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Fade in timeout={760}>
                <List className={classes.list}>
                  {advertisers
                    .map((advertiser, index) =>
                      <Advertiser
                        className={classes.card}
                        key={`${get(advertiser, 'id')} ${get(advertiser, 'email')}}`}
                        advertiser={advertiser}
                        isFavorite={Boolean(get(advertiser, 'isFavorite'))}
                        secondaryAction={() => this.props.favoritesAdd(advertiser, index)}
                      />
                    )}
                </List>
              </Fade>
            </Box>
          </ScrollArea>
        </Grid>
        <Box className={classes.scrollShadow} textAlign={"center"}>
          <Typography className={classes.scrollShadowText}>
            Scroll down for full list <Sync className={classes.syncIcon}
                                            size={"small"} />
          </Typography>
        </Box>
      </Grid>
    )
  }
}
