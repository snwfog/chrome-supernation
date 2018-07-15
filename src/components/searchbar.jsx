import React from 'react';

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

@withStyles(styles)
export default class SearchBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <FormControl fullWidth>
        <Input fullWidth
               id="search"
               type="text"
               placeholder="stackbot@stackadapt.com"
               startAdornment={
                 <InputAdornment className={classes.adornment} position="start">
                   <Magnifier />
                 </InputAdornment>
               } />
      </FormControl>
    )
  }
}
