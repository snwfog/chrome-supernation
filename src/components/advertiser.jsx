import React from 'react'

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Star, StarBorder, SupervisorAccount } from '@material-ui/icons';
import Grow from '@material-ui/core/Grow';
import { FAVORITES_ADD } from "../actions";

const styles = theme => ({
  advertiser: {
    paddingLeft:  15,
    paddingRight: 15,
  },

  avatarButton: {
    marginRight: 15,
  },

  avatar: {
    position: 'absolute',
    width:    60,
    height:   60,
  },

  heading: {
    fontSize: 18
  },

  subheading: {
    fontSize: 15,
    color:    '#666'
  },

  superIconOverlay: {
    position: 'absolute',
    color:    '#eee',
    opacity:  0.3,
    width:    40,
    height:   40,
  },

  paper: {
    margin: 10,
  },

  fabProgress: {
    position: 'absolute',
  },

  // Dense version
  avatarDense: {
    position: 'absolute',
    width:    40,
    height:   40,
  },

  superIconOverlayDense: {
    position: 'absolute',
    color:    '#eee',
    opacity:  0.3,
    width:    24,
    height:   24,
  },
});

const mapDispatchToProps = dispatch => {
  return {}
};

// style={{ color: 'linear-gradient(270deg,#3bf5c6,#3381ec)' }} />
@connect(null, mapDispatchToProps)
@withStyles(styles)
export default class Advertiser extends React.PureComponent {
  constructor(props) {
    super(props);
    this._elapseUpdateInterval = 10; // ms
    this._elapseTickLimit      = props.elapseTimeLimit / this._elapseUpdateInterval;

    console.log(props);
  }

  static propTypes = {
    elapseTimeLimit: PropTypes.number,
    advertiser:      PropTypes.object,
    dense:           PropTypes.bool,
    isFavorite:      PropTypes.bool,
    secondaryAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    elapseTimeLimit: 800,
    advertiser:      null,
    dense:           false,
    isFavorite:      false,
    secondaryAction: null,
  };

  state = {
    showPopoverIcon:  false,
    superInProgress:  false,
    elapseInProgress: false,
    elapseProgress:   0,
  };

  togglePopoverIcon = () => {
    this.setState({ showPopoverIcon: !this.state.showPopoverIcon })
  };

  handleSecondaryAction = () => {
    // this.props.secondaryAction();
    // console.log('updating advertiser');
    // this.forceUpdate();

    // this.setState({ dialogFavoritesRemove: !this.state.dialogFavoritesRemove });

    // chrome.storage.sync.set({ email: 'charles@stackadapt.com' }, () => {
    //   console.log('sync\'ed');
    // });
  };

  handleSuper = () => {
    this.setState({ superInProgress: true });
    this.resetElapseConfirmation();

    setTimeout(() => {
      this.setState({ superInProgress: false });
      console.log('Super in');
    }, 2000);
  };

  beginElapseConfirmation = () => {
    this.setState({ elapseInProgress: true, elapseProgress: 1 }, () => {
      setTimeout(this.incrementElapseTime.bind(this), this._elapseUpdateInterval);
    });
  };

  incrementElapseTime = () => {
    let { elapseInProgress, elapseProgress } = this.state;
    this.setState({ elapseProgress: this.state.elapseProgress + 1 }, () => {
      if (elapseInProgress && elapseProgress < this._elapseTickLimit) {
        setTimeout(this.incrementElapseTime.bind(this), this._elapseUpdateInterval);
      } else if (elapseInProgress && elapseProgress >= this._elapseTickLimit) {
        this.handleSuper();
      } else {
        this.resetElapseConfirmation();
      }
    });
  };

  resetElapseConfirmation = () => {
    this.setState({ elapseProgress: 0, elapseInProgress: false });
  };

  render() {
    const {
            dense,
            isFavorite,
            advertiser,
            classes,
          } = this.props;

    const {
            showPopoverIcon,
            superInProgress,
            elapseInProgress,
            elapseProgress,
          } = this.state;

    return (
      <Paper className={classes.paper}>
        <ListItem className={classes.advertiser}>
          <Button className={classes.avatarButton}
                  mini={dense}
                  variant="fab"
                  onMouseEnter={this.togglePopoverIcon}
                  onMouseLeave={() => {
                    this.togglePopoverIcon();
                    this.resetElapseConfirmation();
                  }}
                  onMouseDown={this.beginElapseConfirmation}
                  onMouseUp={this.resetElapseConfirmation}>
            <Avatar className={
              dense ?
                classes.avatarDense :
                classes.avatar}
                    alt={advertiser.get('fullName')}
                    src={advertiser.get('avatarUrl')} />
            <Grow in={showPopoverIcon}>
              <SupervisorAccount className={
                dense ?
                  classes.superIconOverlayDense :
                  classes.superIconOverlay} />
            </Grow>
            {elapseInProgress &&
            <CircularProgress variant="determinate"
                              value={elapseProgress / this._elapseTickLimit * 100}
                              size={dense ? 42 : 62}
                              thickness={2}
                              className={classes.fabProgress} />}

            {superInProgress &&
            <CircularProgress size={dense ? 42 : 62}
                              thickness={2}
                              className={classes.fabProgress} />}
          </Button>
          <Grid container direction="column">
            {dense ?
              <div>
                <Typography variant="title" className={classes.heading}>
                  {advertiser.get('email')}
                </Typography>
              </div> :

              <div>
                <Typography gutterBottom className={classes.heading}
                            variant="title">
                  {advertiser.get('fullName')}
                </Typography>
                <Typography variant="subheading" className={classes.subheading}>
                  {advertiser.get('email')}
                </Typography>
                <Typography variant="subheading" className={classes.subheading}>
                  {`Last super: ${advertiser.get('lastSuperTime') ?
                    moment(advertiser.get('lastSuperTime')).fromNow() :
                    'Never'}`}
                </Typography>
              </div>
            }
          </Grid>
          <ListItemSecondaryAction onClick={this.props.secondaryAction}>
            <IconButton>
              {isFavorite ?
                <Star style={{ color: '#43d3af' }} /> :
                <StarBorder style={{ color: '#43d3af' }} />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    )
  }
}

