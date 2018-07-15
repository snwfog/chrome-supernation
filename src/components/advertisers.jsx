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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { ArrowBack } from '@material-ui/icons';

import { ADVERTISERS_FETCH, FAVORITES_ADD } from '../actions';

import SearchBar from './searchbar';
import Navbar from './navbar';
import Advertiser from './advertiser';

const styles = theme => ({
  root: {
    backgroundColor: grey["100"]
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
    advertisers: state.get('advertisers'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    advertisersFetch: () => dispatch(({
      type: ADVERTISERS_FETCH
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
    let counts          = this.props.advertisers.size;
    let itemHeight      = (realHeight - containerHeight) / counts;
    // Trigger reload at approx few items left to display
    let triggerPosition = realHeight - containerHeight - itemHeight * 0.2;
    if (topPosition > triggerPosition) {
      console.log('loading more data...');
      this.props.advertisersFetch();
    }
  };

  componentDidMount() {

  }

  // Using pure component implement this already using shallow comparison
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should update?');
  //   return true;
  // }

  render() {
    const { classes, dense, advertisers } = this.props;

    return (
      <Grid container
            className={classes.root}
            onWheel={this.handleScrollUp}>
        <Navbar navbarTitle={<SearchBar />} />
        <ScrollArea className={classes.scrollArea}
                    speed={0.2}
                    onScroll={this.handleScroll}
                    smoothScrolling={true}
                    horizontal={false}>
          <Fade in={true} timeout={760}>
            <List className={classes.root} dense={dense}>
              <Grid item>
                {advertisers.map((advertiser, index) => {
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
          </Fade>
        </ScrollArea>

        <Button className={classes.backToFavoriteButton}
                variant="fab"
                onClick={this.handleBackToFavorite}>
          <ArrowBack />
        </Button>
      </Grid>
    )
  }
}
