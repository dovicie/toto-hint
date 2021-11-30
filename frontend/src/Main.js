import React from "react";
import Title from "./Title";
import Search from "./Search";
import Prediction from "./Prediction";
import matchData2020 from "./match_data_2020.json";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: matchData2020,
      selectedMatch: null,
    };
    this.setMatch = this.setMatch.bind(this);
  }
  setMatch(e) {
    this.setState({ selectedMatch: e });
  }
  render() {
    return (
      <>
        <Search matches={this.state.matches} setMatch={this.setMatch} />
        <Prediction selectedMatch={this.state.selectedMatch} />
      </>
    );
  }
}

export default Main;
