import React from 'react';

import moment from 'moment';

import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import Advertiser from './advertiser';

const styles = theme => ({
});

class Favorites extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        {[1, 2, 3].map((id) => {
          return (
            <Advertiser key={id}
                        lastSuperTime={moment('2018-07-01')}
                        favorite={true} />
          )
        })}
      </List>
    )
  }
}

export default withStyles(styles)(Favorites);
