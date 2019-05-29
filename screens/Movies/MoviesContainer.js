import React from "react";
import MoviesPresenter from "./MoviesPresenter";
import { moviesApi } from "../../api";

export default class extends React.Component {
  state = {
    loading: true,
    loading: true,
    upcoming: null,
    popular: null,
    nowPlaying: null,
    error: null
  };

  async componentDidMount() {
    let upcoming, popular, nowPlaying, error;
    try {
      ({
        data: { results: upcoming }
      } = await moviesApi.upcoming());
      ({
        data: { results: popular }
      } = await moviesApi.popular());
      ({
        data: { results: nowPlaying }
      } = await moviesApi.nowPlaying());
    } catch (error) {
      console.log(error);
      error = "영화정보를 가져올수 없습니다";
    } finally {
      this.setState({
        loading: false,
        error,
        upcoming,
        popular,
        nowPlaying
      });
    }
  }

  render() {
    const { loading, upcoming, popular, nowPlaying } = this.state;
    return (
      <MoviesPresenter
        loading={loading}
        upcoming={upcoming}
        popular={popular}
        nowPlaying={nowPlaying}
      />
    );
  }
}
