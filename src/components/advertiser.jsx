import React from 'react'

import PropTypes from 'prop-types';
import MomentPropTypes from 'react-moment-proptypes';

import classNames from 'classnames';

import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { SupervisorAccount, StarBorder, Star } from '@material-ui/icons';
import Grow from '@material-ui/core/Grow';

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

@withStyles(styles)
class Advertiser extends React.Component {
  constructor(props) {
    super(props);
    this._elapseUpdateInterval = 10; // ms
    this._elapseTickLimit      = props.elapseTimeLimit / this._elapseUpdateInterval;
  }

  static propTypes = {
    elapseTimeLimit: PropTypes.number,
    advertiser:      PropTypes.object,
    dense:           PropTypes.bool,
    favorite:        PropTypes.bool,
  };

  static defaultProps = {
    elapseTimeLimit: 800,
    advertiser:      null,
    dense:           false,
    favorite:        false,
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

  handleAdvertiserSecondaryAction = () => {
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
            favorite,
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
                    alt={advertiser.fullName}
                    src={advertiser.avatarUrl} />
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
                <Typography variant="title">
                  {advertiser.email}
                </Typography>
              </div> :

              <div>
                <Typography variant="title">
                  {advertiser.fullName}
                </Typography>
                <Typography variant="subheading">
                  {advertiser.email}
                </Typography>
                <Typography variant="subheading">
                  {`Last super: ${advertiser.lastSuperTime ?
                    moment(advertiser.lastSuperTime).fromNow() :
                    'Never'}`}
                </Typography>
              </div>
            }
          </Grid>
          <ListItemSecondaryAction
            onClick={this.handleAdvertiserSecondaryAction}>
            <IconButton>
              {favorite ?
                <Star style={{ color: '#43d3af' }} /> :
                <StarBorder style={{ color: '#43d3af' }} />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    )
  }
}

// style={{ color: 'linear-gradient(270deg,#3bf5c6,#3381ec)' }} />
export default Advertiser;
