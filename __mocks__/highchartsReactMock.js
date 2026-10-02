import React from "react";

const MockChart = React.forwardRef(({ options, children }, ref) => {
  const chartTitle = options?.title?.text ?? null;

  return React.createElement("div", { ref }, chartTitle, children);
});

//Trenger displayName for lint regler/debugging
MockChart.displayName = "MockChart";

module.exports = {
  Chart: MockChart,
};
