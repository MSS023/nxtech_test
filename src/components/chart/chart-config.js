const data = {
  labels: [],
  datasets: [
    {
      label: "State Wise Distribution",
      data: [],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};
export const chartConfig = {
  type: "line",
  data: data,
  options: {
      responsive: true,
      scales: {
          y: {
              display: false,
              min: 0,
          }
      }
  }
};
