import React from "react";
import { Bar } from "react-chartjs-2";
// import predictProba2020 from "./predict_proba_2020.json";
// import predictProbaPd2020 from "./predict_proba_poisson_distribution/json/2020.json";
// import goalForPredictProba2020 from "./goal_for_predict_proba_poisson_distribution/json/2020/20010509.json";

class Prediction extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { predProba: null };
  }

  render() {
    const selectedMatch = this.props.selectedMatch;
    if (selectedMatch !== null) {
      // let rfPredProba = predictProba2020.find(
      //   (pred) => pred.MatchID === selectedMatch.ID
      // );
      // rfPredProba = [
      //   Number.parseFloat(rfPredProba[0]),
      //   Number.parseFloat(rfPredProba[1]),
      //   Number.parseFloat(rfPredProba[2]),
      // ];
      // rfPredProba = [
      //   Math.floor(
      //     (rfPredProba[0] /
      //       (rfPredProba[0] + rfPredProba[1] + rfPredProba[2])) *
      //       1000
      //   ) / 1000,
      //   Math.floor(
      //     (rfPredProba[1] /
      //       (rfPredProba[0] + rfPredProba[1] + rfPredProba[2])) *
      //       1000
      //   ) / 1000,
      //   Math.floor(
      //     (rfPredProba[2] /
      //       (rfPredProba[0] + rfPredProba[1] + rfPredProba[2])) *
      //       1000
      //   ) / 1000,
      // ];

      const rfPredProba = [0.2, 0.5, 0.3];

      // var pdPredProba
      // console.log(selectedMatch.ID)
      // fetch(`http://127.0.0.1:8888/${selectedMatch.ID}`)
      //   .then((res) => res.json())
      //   .then(
      //     (result) => {
      //       // console.log(result);
      //       pdPredProba = result
      //       console.log(pdPredProba)
      //     },
      //     // 補足：コンポーネント内のバグによる例外を隠蔽しないためにも
      //     // catch()ブロックの代わりにここでエラーハンドリングすることが重要です
      //     (error) => {
      //       console.log(error);
      //     }
      //   );

      // const pdPredProba = predictProbaPd2020[selectedMatch.ID];
      const pdPredProba = [0.2, 0.4, 0.4];

      // const goalForPredProbaHome = goalForPredictProba2020["gamba-osaka"];
      const goalForPredProbaHome = [0.3, 0.2, 0.2, 0.1, 0.05, 0.05, 0, 0, 0, 0];
      // const goalForPredProbaAway =
      // goalForPredictProba2020["yokohama-fa-marinos"];
      const goalForPredProbaAway = [0.2, 0.3, 0.2, 0.1, 0.05, 0.05, 0, 0, 0, 0];

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
        labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
        datasets: [
          {
            label: `${selectedMatch.Home}'s goals for`,
            // data: [0.2, 0.3, 0.2, 0.1, 0.05, 0.03, 0.02, 0],
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

      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
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
          <Bar data={data} options={options} />
        </div>
      );
    } else {
      return <div> Select a match! </div>;
    }
  }
}

export default Prediction;
