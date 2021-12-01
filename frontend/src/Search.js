import React from "react";
import Select from "react-select";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      selectedMonth: null,
      selectedMatch: null,
    };
  }

  handleYearChange = (selectedOption) => {
    this.setState({ selectedYear: selectedOption.value });
  };

  handleMonthChange = (selectedOption) => {
    this.setState({ selectedMonth: selectedOption.value });
  };


  handleMatchChange = (selectedOption) => {
    this.setState({ selectedMatch: selectedOption.value });
  };

  handleSetMatch = (selectedMatch) => {
    this.props.setMatch(this.state.selectedMatch);
  };

  render() {
    const yearOptions = [
      { value: 2013, label: "2013年" },
      { value: 2014, label: "2014年" },
      { value: 2015, label: "2015年" },
      { value: 2016, label: "2016年" },
      { value: 2017, label: "2017年" },
      { value: 2018, label: "2018年" },
      { value: 2019, label: "2019年" },
      { value: 2020, label: "2020年" },
    ];

    const monthOptions = [
      { value: 1, label: "1月" },
      { value: 2, label: "2月" },
      { value: 3, label: "3月" },
      { value: 4, label: "4月" },
      { value: 5, label: "5月" },
      { value: 6, label: "6月" },
      { value: 7, label: "7月" },
      { value: 8, label: "8月" },
      { value: 9, label: "9月" },
      { value: 10, label: "10月" },
      { value: 11, label: "11月" },
      { value: 12, label: "12月" },
    ];

    const matchOptions = [];
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"];
    this.props.matches
      .filter(
        (match) =>
          (new Date(match.Date).getFullYear() === this.state.selectedYear) &
          (new Date(match.Date).getMonth() + 1 === this.state.selectedMonth)
      )
      .map((match) => {
        const date = new Date(match.Date).getDate();
        const dayOfWeek = dayOfWeekStr[new Date(match.Date).getDay()];

        matchOptions.push({
          value: match,
          label: `${date}日(${dayOfWeek}) ${match.Sec}節 ${match.Home} - ${match.Away}`,
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
            className="month-select"
            options={monthOptions}
            onChange={this.handleMonthChange}
            placeholder="月"
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
