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
import Divider from '@material-ui/core/Divider';

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

    // console.log(props);
  }

  static propTypes = {
    elapseTimeLimit: PropTypes.number,
    advertiser:      PropTypes.object,
    isFavorite:      PropTypes.bool,
    secondaryAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    elapseTimeLimit: 800,
    advertiser:      null,
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

    const { first_name, last_name, email, avatar, company_name } = advertiser;

    return (
      <React.Fragment>
        <ListItem className={classes.advertiser}>
          <Button className={classes.avatarButton}
                  onMouseEnter={this.togglePopoverIcon}
                  onMouseLeave={() => {
                    this.togglePopoverIcon();
                    this.resetElapseConfirmation();
                  }}
                  onMouseDown={this.beginElapseConfirmation}
                  onMouseUp={this.resetElapseConfirmation}>
            <Avatar className={classes.avatar}
                    alt={`${first_name} ${last_name}`}
                    src={avatar} />
            <Grow in={showPopoverIcon}>
              <SupervisorAccount className={classes.superIconOverlay} />
            </Grow>
            {elapseInProgress &&
            <CircularProgress
              value={elapseProgress / this._elapseTickLimit * 100}
              size={62}
              thickness={2}
              className={classes.fabProgress} />}

            {superInProgress &&
            <CircularProgress size={62}
                              thickness={2}
                              className={classes.fabProgress} />}
          </Button>
          <Grid container direction="column">
            <Typography gutterBottom className={classes.heading}>
              {`${first_name} ${last_name}`}
            </Typography>

            <Typography className={classes.subheading}>
              {email}
            </Typography>

            {
              <Typography className={classes.subheading}>
                {`Last super: ${_.get(advertiser, 'lastSuperTime') ?
                  moment(_.get(advertiser, 'lastSuperTime')).fromNow() :
                  'Never'}`}
              </Typography>
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
        <Divider variant="inset" component="li" />
      </React.Fragment>
    )
  }
}

