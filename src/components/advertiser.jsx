import React from 'react'

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import { Fab } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Star, StarBorder, SupervisorAccount } from '@material-ui/icons';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  advertiser: {
    borderTop: `1px solid ${grey['200']}`,
    width:     380,
    padding:   16,
  },

  fab: {
    disableRipple: true,
    marginRight:   40,
    width:         50,
    height:        50,
  },

  fabProgress: {
    disableRipple: true,
    color:         '#0061FF',
    position:      'absolute',
  },

  avatar: {
    disableRipple: true,
    position:      'absolute',
    width:         50,
    height:        50,
  },

  heading: {
    fontSize:     14,
    fontWeight:   500,
    margin:       0,
    marginBottom: -4,
  },

  subheading: {
    fontSize:     14,
    marginBottom: -3,
  },

  finerprint: {
    fontSize: 12,
  },

  paper: {
    margin: 10,
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

    // Number of ticks
    this.elapseIntervals = props.elapseTimeLimit / 100;
  }

  static propTypes = {
    elapseTimeLimit: PropTypes.number,
    advertiser:      PropTypes.object,
    // isFavorite:      PropTypes.bool,
    secondaryAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    elapseTimeLimit: 800,
    advertiser:      null,
    // isFavorite:      false,
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

  handleUpdateFavorite = () => {
    // this.props.secondaryAction();
    // console.log('updating advertiser');
    // this.forceUpdate();
    //
    // this.setState({ dialogFavoritesRemove: !this.state.dialogFavoritesRemove });
    //
    // chrome.storage.sync.set({ email: 'charles@stackadapt.com' }, () => {
    //   console.log('sync\'ed');
    // });
  };

  beginElapse = () => {
    this.setState({
      elapseInProgress: true,
      elapseProgress:   1
    }, () => {
      setTimeout(this.incrementElapse.bind(this), this.elapseIntervals);
    });
  };

  incrementElapse = () => {
    let { elapseInProgress, elapseProgress } = this.state;
    this.setState({
      elapseProgress: this.state.elapseProgress + 1
    }, () => {
      if (elapseInProgress && elapseProgress < 100) {
        setTimeout(this.incrementElapse.bind(this), this.elapseIntervals);
      } else if (elapseInProgress && elapseProgress >= 100) {
        this.handleSuper();
      } else {
        this.resetElapse();
      }
    });
  };

  handleSuper = () => {
    this.setState({ superInProgress: true });
    this.resetElapse();

    let { advertiser } = this.props;
    console.log("super into", advertiser);
    chrome.runtime.sendMessage({
        advertiser,
        action: "super",
      },
      function(createdWindow) {
        console.log(createdWindow);
      });

    // Clear out super
    setTimeout(() => {
      this.setState({ superInProgress: false });
    }, this.props.elapseTimeLimit);
  };

  resetElapse = () => {
    this.setState({ elapseProgress: 0, elapseInProgress: false });
  };

  render() {
    const {
            advertiser,
            classes,
          } = this.props;

    const {
            showPopoverIcon,
            superInProgress,
            elapseInProgress,
            elapseProgress,
          } = this.state;

    const {
            first_name,
            last_name,
            email,
            avatar,
            company_name,
            favorite,
          } = advertiser;

    return (
      <React.Fragment>
        <ListItem className={classes.advertiser}>

          <Fab className={classes.fab}
               disableTouchRipple
               disableRipple
               onMouseEnter={this.togglePopoverIcon}
               onMouseLeave={() => {
                 this.togglePopoverIcon();
                 this.resetElapse();
               }}
               onMouseDown={this.beginElapse}
               onMouseUp={this.resetElapse}>
            <Avatar className={classes.avatar}
                    alt={`${first_name} ${last_name}`}
                    src={avatar} />

            {elapseInProgress &&
            <CircularProgress
              className={classes.fabProgress}
              variant={"determinate"}
              thickness={3}
              size={52}
              value={elapseProgress}
            />}

            {superInProgress &&
            <CircularProgress
              className={classes.fabProgress}
              thickness={3}
              size={52}
            />}
          </Fab>

          <Grid container direction="column">
            <Typography gutterBottom className={classes.heading}>
              {`${first_name} ${last_name}`}
            </Typography>

            <Typography className={classes.subheading}>
              {email}
            </Typography>

            {
              <Typography className={classes.finerprint}>
                {`Last super: ${_.get(advertiser, 'lastSuperTime') ?
                  moment(_.get(advertiser, 'lastSuperTime')).fromNow() :
                  'Never'}`
                }
              </Typography>
            }
          </Grid>

          <ListItemSecondaryAction onClick={this.props.secondaryAction}>
            <IconButton>
              {favorite ?
                <Star style={{ color: '#0061FF' }} /> :
                <StarBorder style={{ color: '#0061FF' }} />}
            </IconButton>
          </ListItemSecondaryAction>

        </ListItem>

        {/*<Divider variant="inset" component="li" />*/}

      </React.Fragment>
    )
  }
}

