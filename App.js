import React from "react";
import { AppLoading, Font } from "expo";
import { IconIcons } from "@expo/vector-icons";
import TabNavigation from "./navigation/TabNavigation";

export default class App extends React.Component {
  state = {
    loaded: false
  };

  handleError = () => console.log(error);

  handleLoaded = () => this.setState({ loaded: true });

  loadAssets = async () => {
    await Font.loadAsync({
      ...IconIcons
    });
  };

  render() {
    const { loaded } = this.state;
    if (loaded) {
      return <TabNavigation />;
    } else {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={this.handleLoaded}
          onError={this.handleError}
        />
      );
    }
  }
}
