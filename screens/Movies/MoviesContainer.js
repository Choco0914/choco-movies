import React from "react";
import MoviesPresenter from "./MoviesPresenter";
import { movies } from "../../api";

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
    try {
      const upcoming = await movies.upcoming();
      const popular = await movies.popular();
      const nowPlaying = await movies.nowPlaying();
    } catch {
      this.setState({ error: "영화들을 가져올수 없습니다." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    return <MoviesPresenter loading={loading} />;
  }
}
