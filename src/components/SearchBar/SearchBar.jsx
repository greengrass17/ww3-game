import React from 'react';
import AutoComplete from '@material-ui/core/AutoComplete';

import { search } from 'services/countries';
import { selectCountry } from 'services/teams/countries';

const style = {
  searchBar: {
    marginRight: 220
  }
};

class SearchBar extends React.Component {
  state = {
    autoCompleteCountries: []
  }

  render () {
    const props = {
      style: style.searchBar,
      dataSource: this.state.autoCompleteCountries,
      hintText: "Search country",
      onUpdateInput: this.handleSearch,
      onNewRequest: this.handleCountrySelect,
      filter: this.countryFilter
    };

    return (
      <AutoComplete {...props} />
    );
  }

  countryFilter = (searchText) => {
    return searchText !== '' && searchText.length > 2;
  }

  handleSearch = (searchText) => {
    if (!searchText || searchText.length < 3) {
      return;
    }

    search(searchText).then(countries => {
      this.setState({
        autoCompleteCountries: countries.map(country => ({
          text: country.Name,
          value: country
        }))
      });
    });
  }

  handleCountrySelect = ({ value }) => {
    selectCountry(value);
  }
}

export default SearchBar;