import React from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';
import faker from 'faker';

import PropTypes from 'prop-types';

// import { List as VList } from 'react-virtualized/dist/commonjs'

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollArea from 'react-scrollbar';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ArrowBack } from '@material-ui/icons';

import store from '../store';

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
  return { advertisers: state.advertisers };
};

@connect(mapStateToProps)
@withStyles(styles)
export default class Advertisers extends React.Component {
  constructor(props) {
    super(props);

    console.log('advertisers constructed');
    this.state = {
      advertisers:
        _.times(20, () => {
          return {
            id:            faker.random.uuid(),
            email:         faker.internet.email(),
            lastSuperTime: faker.date.recent(),
          }
        })
    };
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

  handleScroll = ({ realHeight, containerHeight, topPosition }) => {
    console.log(realHeight, containerHeight, topPosition);
    let counts          = this.state.advertisers.length;
    let itemHeight      = (realHeight - containerHeight) / counts;
    // Trigger reload at approx few items left to display
    let triggerPosition = realHeight - containerHeight - itemHeight * 2;
    if (topPosition > triggerPosition) {
      console.log('loading more data...');

      this.setState({
        advertisers: [
          ...this.state.advertisers,
          ...(_.times(20, () => {
            return {
              id:            faker.random.uuid(),
              email:         faker.internet.email(),
              lastSuperTime: faker.date.recent(),
            }
          }))
        ]
      })
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should update?');
    return true;
  }

  render() {
    const { classes, dense } = this.props;

    return (
      <Grid container className={classes.root}>
        <Navbar navbarTitle={<SearchBar />} />
        <ScrollArea className={classes.scrollArea}
                    speed={0.1}
                    onScroll={this.handleScroll}
                    smoothScrolling={true}
                    horizontal={false}>
          <TransitionGroup>
            <CSSTransition appear
                           timeout={400}
                           classNames={{ appear: 'animated fadeIn' }}>
              <List className={classes.root} dense={dense}>
                <Grid item>
                  {_.map(this.state.advertisers, (advertiser) => {
                    return (
                      <Advertiser key={advertiser.id}
                                  dense={dense}
                                  advertiser={advertiser}
                                  favorite={false} />
                    )
                  })}
                </Grid>
              </List>
            </CSSTransition>
          </TransitionGroup>
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
