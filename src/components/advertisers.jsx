import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';

import Advertiser from './advertiser';

const styles = theme => ({
});

class Advertisers extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    dense: PropTypes.bool,
  };

  static defaultProps = {
    dense: false,
  };

  render() {
    const { classes, dense } = this.props;

    return (
      <List className={classes.root} dense={dense}>
        {[1, 2, 3, 4, 5].map((id) => {
          return (<Advertiser key={id} dense={dense} favorite={false} />)
        })}
      </List>
    )
  }
}

export default withStyles(styles)(Advertisers);
