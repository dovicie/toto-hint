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
    };
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
    }
  }

  render() {
    const selectedMatch = this.props.selectedMatch;
    if (selectedMatch !== null) {
      const rfPredProba = this.state.pred.rfPredProba;
      const pdPredProba = this.state.pred.pdPredProba;
      const goalForPredProbaHome = this.state.pred.goalForPredProbaHome;
      const goalForPredProbaAway = this.state.pred.goalForPredProbaAway;

      const barChartData = {
        labels: ["Poisson distribution", "Random Forest"],
        datasets: [
          {
            label: `"${selectedMatch.Home}" wins`,
            data: [pdPredProba[1], rfPredProba[1]],
            backgroundColor: "rgb(255, 99, 132)",
          },
          {
            label: "draw",
            data: [pdPredProba[0], rfPredProba[0]],
            backgroundColor: "rgb(200, 200, 200)",
          },
          {
            label: `"${selectedMatch.Away}" wins`,
            data: [pdPredProba[2], rfPredProba[2]],
            backgroundColor: "rgb(54, 162, 235)",
          },
        ],
      };

      const barChartOptions = {
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

      const data = {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            label: `${selectedMatch.Home}'s goals for`,
            data: Object.keys(goalForPredProbaHome).map(function (key) {
              return goalForPredProbaHome[key];
            }),
            backgroundColor: "rgb(255, 99, 132)",
          },
          {
            label: `${selectedMatch.Away}'s goals for`,
            data: Object.keys(goalForPredProbaAway).map(function (key) {
              return goalForPredProbaAway[key];
            }),
            backgroundColor: "rgb(54, 162, 235)",
          },
        ],
      };

      return (
        <div className="prediction">
          <h2>Prediction</h2>
          <p>
            {selectedMatch.Date} Sec.{selectedMatch.Sec}
          </p>
          <p>
            {selectedMatch.Home} vs {selectedMatch.Away}
          </p>
          <Bar data={barChartData} options={barChartOptions} />

          <h3>Score prediction</h3>
          <Bar data={data}  />
        </div>
      );
    } else {
      return <div> Select a match! </div>;
    }
  }
}

export default Prediction;
