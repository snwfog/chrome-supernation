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

const mapStateToProps    = (state) => ({ advertiserSearchName: state.get('advertiserSearchName') });
const mapDispatchToProps = dispatch => {
  return {
    handleAdvertiserSearch: (advertiserSearchName) => dispatch({
      advertiserSearchName,
      type: ADVERTISERS_SEARCH,
    })
  }
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styles)
export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { advertiserSearchName: '' };
  }

  handleAdvertiserSearch = (event) => {
    console.log('searching for', event.target.value);
    let advertiserSearchName = event.target.value;
    this.setState({ advertiserSearchName },
      () => {
        this.props.handleAdvertiserSearch(advertiserSearchName)
      });
  };

  // componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <FormControl fullWidth>
        <Input autoFocus
               id="search"
               type="text"
               placeholder="stackbot@stackadapt.com"
               value={this.state.advertiserSearchName}
               onChange={this.handleAdvertiserSearch}
               startAdornment={
                 <InputAdornment className={classes.adornment} position="start">
                   <Magnifier />
                 </InputAdornment>
               } />
      </FormControl>
    )
  }
}
