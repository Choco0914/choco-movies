import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default class extends React.Component {
  state = {
    loading: true,
    popular: null,
    topRated: null,
    airingToday: null
  };

  async componentDidMount() {
    let popular, topRated, airingToday, error;
    try {
      ({
        data: { results: popular }
      } = await tvApi.popular());
      ({
        data: { results: topRated }
      } = await tvApi.topRated());
      ({
        data: { results: airingToday }
      } = await tvApi.airingToday());
    } catch (error) {
      console.log(error);
      error = "TV 정보를 가져올수 없습니다.";
    } finally {
      this.setState({
        loading: false,
        error,
        popular,
        topRated,
        airingToday
      });
    }
  }
  render() {
    const { loading } = this.state;
    return <TVPresenter loading={loading} />;
  }
}
