import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  state = {
    loading: false,
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    searched: false
  };

  handleSearchUpdate = text => {
    this.setState({
      searchTerm: text
    });
  };

  onSubmitEditing = async () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      let movieResults, tvResults, error;
      this.setState({
        loading: true
      });
      try {
        ({
          data: { results: movieResults }
        } = await moviesApi.search(searchTerm));
        ({
          data: { results: tvResults }
        } = await tvApi.search(searchTerm));
      } catch {
        error = "검색할 수 없습니다.";
      } finally {
        this.setState({
          loading: false,
          movieResults,
          tvResults,
          error,
          searched: true
        });
      }
    }
    return;
  };

  render() {
    const { loading, movieResults, tvResults, searchTerm, error } = this.state;
    return (
      <SearchPresenter
        loading={loading}
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        onSubmitEditing={this.onSubmitEditing}
        handleSearchUpdate={this.handleSearchUpdate}
        error={error}
      />
    );
  }
}
