import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Empty } from "antd";

const TimeSeries = ({ graphData, assetName }) => {
  const options = {
    chart: {
      height: "240px",
      credits: false,
    },
    title: {
      text: "Asset Telemetry Data Chart",
      style: {
        "font-size": "2em",
        "font-weight": "700",
        "font-family": "Segoe UI",
      },
    },
    subtitle: {
      text: `Asset: ${assetName}`,
      style: {
        color: "#db073d",
        "font-size": "1.5em",
        "font-weight": "900",
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Input Value",
      },
    },
    data: {
      dateFormat: "YYY/mm/dd",
    },
    series: [
      {
        color: "#db073d",
        name: "Input Value",
        data: graphData,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
            yAxis: {
              labels: {
                align: "left",
                x: 0,
                y: -5,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  const displayTimeSeries = () => {
    if (graphData.length === 0) {
      return (
        <Empty
          description={
            <div>
              <h1>NO DATA</h1>No Telemetry Data Available for Analysis
            </div>
          }
        />
      );
    }
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  };

  return <>{displayTimeSeries()}</>;
};

export default TimeSeries;
