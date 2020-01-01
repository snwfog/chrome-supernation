import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/FormControl';
import { Search as Magnifier } from '@material-ui/icons';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  adornment: {
    marginTop:   3,
    marginRight: 8
  }
});

const mapStateToProps    = state => ({});
const mapDispatchToProps = dispatch => ({});

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styles)
export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSearch: null,
  };

  // componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <FormControl fullWidth>
        <Input autoFocus
               id="search"
               type="text"
               autoComplete="off"
               placeholder="stackbot@stackadapt.com"
               onChange={(event) => this.props.onSearch(event.target.value)}
               disableUnderline={true}
               startAdornment={
                 <InputAdornment className={classes.adornment} position="start">
                   <Magnifier />
                 </InputAdornment>
               } />
      </FormControl>
    )
  }
}
