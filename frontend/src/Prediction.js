import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

class Prediction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pred: {
        rfPredProba: { 0: 0, 1: 0, 2: 0 },
        pdPredProba: { 0: 0, 1: 0, 2: 0 },
        goalForPredProbaHome: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
        },
        goalForPredProbaAway: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
        },
      },
      color: {
        home: null,
        away: null,
      },
    };
  }

  getColor() {
    const colorDict = {
      1: "#B71A3F",
      2: "#FEDF00",
      3: "#E6002C",
      4: "#026A38",
      5: "#003084",
      7: "#FF8708",
      8: "#D70D18",
      9: "#02589E",
      10: "#50308F",
      11: "#FFF100",
      12: "#61B324",
      13: "#7399D0",
      14: "#CA0403",
      18: "#980422",
      20: "#DA005C",
      21: "#23B6FE",
      22: "#052883",
      23: "#00205A",
      24: "#832178",
      27: "#ED6D00",
      28: "#035FB6",
      29: "#004197",
      31: "#150A8C",
      33: "#ED7FB4",
      34: "#00A5F9",
      36: "#09318F",
      46: "#037A48",
      47: "#F39800",
      54: "#FCC901",
      78: "#EA5303",
    };
    const selectedMatch = this.props.selectedMatch;
    const homeID = selectedMatch.HomeID;
    const awayID = selectedMatch.AwayID;

    this.setState({
      color: {
        home: colorDict[homeID],
        away: colorDict[awayID],
      },
    });
  }

  async fetchPred() {
    const selectedMatch = this.props.selectedMatch;
    const res = await fetch(`http://127.0.0.1:8888/${selectedMatch.ID}`);
    const pred = await res.json();

    this.setState({
      pred: {
        rfPredProba: pred["randomforest"],
        pdPredProba: pred["poisson"],
        goalForPredProbaHome: pred["goalfor"]["home"],
        goalForPredProbaAway: pred["goalfor"]["away"],
      },
    });
  }

  componentDidMount() {
    const selectedMatch = this.props.selectedMatch;
    if (selectedMatch !== null) {
      this.fetchPred();
      this.getColor();
    }
  }
  componentDidUpdate(prevProps) {
    const selectedMatch = this.props.selectedMatch;
    if (
      (selectedMatch !== null) &
      (selectedMatch !== prevProps.selectedMatch)
    ) {
      this.setState({
        pred: {
          rfPredProba: { 0: 0, 1: 0, 2: 0 },
          pdPredProba: { 0: 0, 1: 0, 2: 0 },
          goalForPredProbaHome: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
          },
          goalForPredProbaAway: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
          },
        },
      });
      this.fetchPred();
      this.getColor();
    }
  }

  render() {
    const selectedMatch = this.props.selectedMatch;
    if (selectedMatch !== null) {
      const rfPredProba = this.state.pred.rfPredProba;
      const pdPredProba = this.state.pred.pdPredProba;
      const goalForPredProbaHome = this.state.pred.goalForPredProbaHome;
      const goalForPredProbaAway = this.state.pred.goalForPredProbaAway;

      const homeColor = this.state.color.home;
      const awayColor = this.state.color.away;

      const wlPredChartData = {
        labels: ["ポアソン分布", "ランダムフォレスト"],
        datasets: [
          {
            label: `${selectedMatch.Home}の勝利`,
            data: [pdPredProba[1], rfPredProba[1]],
            backgroundColor: homeColor,
          },
          {
            label: "引き分け",
            data: [pdPredProba[0], rfPredProba[0]],
            backgroundColor: "rgb(200, 200, 200)",
          },
          {
            label: `${selectedMatch.Away}の勝利`,
            data: [pdPredProba[2], rfPredProba[2]],
            backgroundColor: awayColor,
          },
        ],
      };

      const wlPredChartOptions = {
        indexAxis: "y",
        scales: {
          y: {
            stacked: true,
            ticks: {
              beginAtZero: true,
              max: 0,
            },
          },
          x: {
            stacked: true,
          },
        },
      };

      const goalForPredData = {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            label: `${selectedMatch.Home}の得点数`,
            data: Object.keys(goalForPredProbaHome).map(function (key) {
              return goalForPredProbaHome[key];
            }),
            backgroundColor: homeColor,
          },
          {
            label: `${selectedMatch.Away}の得点数`,
            data: Object.keys(goalForPredProbaAway).map(function (key) {
              return goalForPredProbaAway[key];
            }),
            backgroundColor: awayColor,
          },
        ],
      };

      return (
        <div className="prediction">
          <h2>予測結果</h2>
          <p className="match-card">
            {new Date(selectedMatch.Date).getFullYear()}年{" "}
            {new Date(selectedMatch.Date).getMonth() + 1}月
            {new Date(selectedMatch.Date).getDate()}日 {selectedMatch.Sec}節{" "}
            {selectedMatch.Home} - {selectedMatch.Away}
          </p>
          <h3>勝敗予測</h3>

          <Bar data={wlPredChartData} options={wlPredChartOptions} />

          <h3>得点数予測</h3>
          <Bar data={goalForPredData} />
        </div>
      );
    } else {
      return (
        <div className="prediction">
          <h2>予測結果</h2>
          <p>対戦カードを選択してください!!</p>
        </div>
      );
    }
  }
}

export default Prediction;

// new Date(match.Date).getFullYear().toString()
