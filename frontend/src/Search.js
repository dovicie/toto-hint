import React from "react";
import Select from "react-select";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      selectedDate: null,
      selectedMatch: null,
    };
  }

  handleYearChange = (selectedOption) => {
    this.setState({ selectedYear: selectedOption.value });
  };

  handleDateChange = (selectedOption) => {
    this.setState({ selectedDate: selectedOption.value });
  };

  handleMatchChange = (selectedOption) => {
    this.setState({ selectedMatch: selectedOption.value });
  };

  handleSetMatch = (selectedMatch) => {
    this.props.setMatch(this.state.selectedMatch);
  };

  render() {
    const yearOptions = [
      { value: "2013", label: "2013" },
      { value: "2014", label: "2014" },
      { value: "2015", label: "2015" },
      { value: "2016", label: "2016" },
      { value: "2017", label: "2017" },
      { value: "2018", label: "2018" },
      { value: "2019", label: "2019" },
      { value: "2020", label: "2020" },
    ];

    const dateOptions = [];

    this.props.matches
      .filter(
        (match) =>
          new Date(match.Date).getFullYear().toString() ===
          this.state.selectedYear
      )
      .map((match) => {
        dateOptions.push({
          value: match.Date,
          label: `${new Date(match.Date).getMonth() + 1} / ${new Date(
            match.Date
          ).getDate()}`,
        });
      });

    const matchOptions = [];
    this.props.matches
      .filter((match) => match.Date === this.state.selectedDate)
      .map((match) => {
        matchOptions.push({
          value: match,
          label: `${match.Sec}節 ${match.Home} - ${match.Away}`,
        });
      });

    return (
      <div className="search">
        <h2>対戦カード選択</h2>
        <div className="match-select-container">
          <Select
            className="year-select"
            options={yearOptions}
            onChange={this.handleYearChange}
            placeholder="年度"
          />
          <Select
            className="date-select"
            options={dateOptions}
            onChange={this.handleDateChange}
            placeholder="開催日"
          />
          <Select
            className="match-select"
            options={matchOptions}
            onChange={this.handleMatchChange}
            placeholder="対戦カード"
          />
        </div>
        <div className="button-wrap">
          <button onClick={this.handleSetMatch}>予測</button>
        </div>
      </div>
    );
  }
}

export default Search;
