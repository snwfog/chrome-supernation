import React from 'react';

import faker from 'faker';

import { withRouter } from 'react-router-dom';

import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Navbar from './navbar'
import Advertiser from './advertiser';

const styles = theme => ({
  root: {
    backgroundColor: grey["100"],
  },

  list: {
    // overflow:  'auto',
    // maxHeight: 400,
    width: '100%'
  }
});

@withRouter
@withStyles(styles)
export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    console.log('favorites constructed');
    this.state = {
      favorites:
        _.times(4, () => {
          return {
            id:            faker.random.uuid(),
            email:         faker.internet.email(),
            lastSuperTime: faker.date.recent(),
          }
        })
    }
  }

  handleScroll = (event) => {
    if (event.deltaY > 0) {
      this.props.history.push('/advertisers');
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} onWheel={this.handleScroll}>
        <Navbar navbarTitle={
          <Typography variant="title" style={{ flexGrow: 1 }}>
            Favorites
          </Typography>
        } />

        <List className={classes.list}>
          <Grid item>
            {_.map(this.state.favorites, (favorite) => {
              return (<Advertiser key={favorite.id}
                                  advertiser={favorite}
                                  favorite={true} />)
            })}
          </Grid>
        </List>
      </Grid>
    )
  }
}

