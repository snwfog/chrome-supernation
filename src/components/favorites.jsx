import React from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import _ from 'lodash';
import moment from 'moment';
import faker from 'faker';

import KeyboardEventHandler from 'react-keyboard-event-handler';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { FAVORITES_REMOVE } from '../actions';

import Navbar from './navbar'
import Advertiser from './advertiser';

const styles = theme => ({
  root: {
    backgroundColor: grey["100"],
  },

  card: {
    margin: 10,
  },

  list: {
    // overflow:  'auto',
    // maxHeight: 400,
    width: '100%'
  }
});

const mapStateToProps = state => {
  console.log(state);
  return { favorites: state.get('favorites') };
};

const mapDispatchToProps = dispatch => {
  return {
    favoritesRemove: (favorite) => dispatch(({
      type:    FAVORITES_REMOVE,
      payload: {
        favorite
      }
    }))
  }
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@withStyles(styles)
export default class Favorites extends React.PureComponent {
  constructor(props) {
    super(props);
    // if (_.isEmpty(props.favorites)) {
    //   this.props.history.push('/advertisers');
    // }
    this.state = { showDialogFavoritesRemove: false };
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
          favorites.isEmpty() ?
            <Card className={classes.card}>
              <CardContent>
                <Typography gutterBottom variant="headline">
                  Tips:
                </Typography>
                <Typography component="p">
                  You do not have any favorites saved at the moment,
                  scroll down on your mouse wheel or on your track pad
                  will let you search advertisers that are visible to you.
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={() => {
                  this.props.history.push('/advertisers')
                }}>
                  Show Advertisers
                </Button>
              </CardActions>
            </Card> : <List className={classes.list}>
              <Grid item>
                {favorites.map((favorite) => {
                  return (
                    <div key={favorite.get('id')}>
                      <Advertiser advertiser={favorite}
                                  isFavorite={Boolean(favorite.get('isFavorite'))}
                                  secondaryAction={() => this.setState({ favoriteToRemove: favorite })} />

                      <Dialog open={this.state.favoriteToRemove === favorite}>
                        <DialogTitle>
                          Remove {favorite.get('fullName')} from favorites?
                        </DialogTitle>
                        <DialogActions>
                          <Button color="primary"
                                  onClick={() => this.setState({ favoriteToRemove: null })}>
                            Cancel
                          </Button>
                          <Button autoFocus color="primary"
                                  onClick={() => this.props.favoritesRemove(favorite)}>
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )
                })}
              </Grid>
            </List>
        }
      </Grid>
    )
  }
}

