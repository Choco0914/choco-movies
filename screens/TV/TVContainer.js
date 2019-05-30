import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default class extends React.Component {
  state = {
    loading: true,
    popular: null,
    airingThisWeek: null,
    airingToday: null
  };

  async componentDidMount() {
    let popular, airingThisWeek, airingToday, error;
    try {
      ({
        data: { results: popular }
      } = await tvApi.popular());
      ({
        data: { results: airingThisWeek }
      } = await tvApi.airingThisWeek());
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
        airingThisWeek,
        airingToday
      });
    }
  }
  render() {
    const { loading, popular, airingThisWeek, airingToday } = this.state;
    return (
      <TVPresenter
        loading={loading}
        popular={popular}
        airingThisWeek={airingThisWeek}
        airingToday={airingToday}
      />
    );
  }
}
