import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    loading: false,
    movieResults: null,
    tvResults: null,
    searchTerm: ""
  };

  handleSearchUpdate = text => {
    this.setState({
      searchTerm: text
    });
  };

  onSubmitEditing = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      alert("검색중입니다");
      return;
    }
  };

  render() {
    const { loading, movieResults, tvResults, searchTerm } = this.state;
    return (
      <SearchPresenter
        loading={loading}
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        onSubmitEditing={this.onSubmitEditing}
        handleSearchUpdate={this.handleSearchUpdate}
      />
    );
  }
}
