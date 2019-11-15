import React from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import _ from 'lodash';

import PropTypes from 'prop-types';

// import { List as VList } from 'react-virtualized/dist/commonjs'

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollArea from 'react-scrollbar';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
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
  root: {
    backgroundColor: grey["100"]
  },

  card: {
    margin: 10,
  },

  scrollArea: {
    width:     '100%',
    // height:    400,
    maxHeight: 400,
    // overflow:  'auto',
  },

  backToFavoriteButton: {
    position:        'absolute',
    top:             380,
    left:            370,
    color:           '#fff',
    backgroundColor: '#43d3af',
  }
});


const mapStateToProps = state => {
  return {
    advertisersFiltered: state.get('advertisersFiltered'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

let mockApi = 'http://www.mocky.io/v2/5dcdc4752e0000e17b72a06b';
let options = {
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  mode:    'no-cors',
};

let fetchAdvertisers = () => {
  fetch(mockApi, options)
    .then(r => r.json())
    .then(data => console.log(data))
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@withStyles(styles)
export default class Advertisers extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('advertisers constructed');
  }

  static propTypes = {
    dense: PropTypes.bool,
  };

  static defaultProps = {
    dense: true,
  };

  componentWillMount() {
    console.log("mounted");
    fetchAdvertisers();
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
    const { classes, dense } = this.props;
    return (
      <Grid container
            className={classes.root}
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
              <Card className={classes.card}>
                <CardContent>
                  <Typography gutterBottom>
                    Tips:
                  </Typography>
                  <Typography component="p">
                    No advertisers found.
                  </Typography>
                </CardContent>
              </Card> :
              <List className={classes.root} dense={dense}>
                <Grid item>
                  {this.props.advertisersFiltered
                    .map((advertiser, index) => {
                      return (
                        <Advertiser key={advertiser.get('id')}
                                    dense={dense}
                                    advertiser={advertiser}
                                    isFavorite={Boolean(advertiser.get('isFavorite'))}
                                    secondaryAction={() => this.props.favoritesAdd(advertiser, index)}
                        />
                      )
                    })}
                </Grid>
              </List>
            }
          </Fade>
        </ScrollArea>

        <Button className={classes.backToFavoriteButton}
                onClick={this.handleBackToFavorite}>
          <ArrowBack />
        </Button>
      </Grid>
    )
  }
}
