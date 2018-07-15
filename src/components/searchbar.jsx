import React from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/FormControl';
import { Search as Magnifier } from '@material-ui/icons';
import Input from '@material-ui/core/Input';

import { ADVERTISERS_SEARCH } from "../actions";

const styles = theme => ({
  adornment: {
    marginTop:   3,
    marginRight: 8
  }
});

const mapStateToProps    = ({ advertiserSearchName }) => ({ advertiserSearchName });
const mapDispatchToProps = dispatch => {
  return {
    handleAdvertiserSearch: (event) => dispatch({
      type:                 ADVERTISERS_SEARCH,
      advertiserSearchName: event.target.value
    })
  }
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styles)
export default class SearchBar extends React.Component {
  // componentDidMount() {}

  render() {
    const { classes, advertiserSearchName, } = this.props;
    return (
      <FormControl fullWidth>
        <Input autoFocus
               id="search"
               type="text"
               placeholder="stackbot@stackadapt.com"
               value={advertiserSearchName}
               onChange={this.props.handleAdvertiserSearch}
               startAdornment={
                 <InputAdornment className={classes.adornment} position="start">
                   <Magnifier />
                 </InputAdornment>
               } />
      </FormControl>
    )
  }
}
