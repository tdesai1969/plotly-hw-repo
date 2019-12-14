var url = "./samples.json";
let data = [];
d3.json(url).then(function(d) {
  data = d;
  console.log(data);
  init();
});
function optionChanged(newSample) {
  createChart(newSample);
  demoInfo(newSample);
}
function demoInfo(key) {
  var panel = d3.select("#sample-metadata");
  panel.html("");
  const metaData = data.metadata.filter(item => item.id == key)[0];
  Object.entries(metaData).forEach(([key, value]) => {
    panel
      .append("span")
      .html(`${key} : ${value}`)
      .append("br");
  });
}
function createChart(sample) {
  var samples = data.samples;
  var filterArrey = samples.filter(i => i.id == sample);
  var result = filterArrey[0];
  var otu_ids = result.otu_ids;
  var otu_labels = result.otu_labels;
  var sample_values = result.sample_values;
  var bartrace = {
    margin: { l: 150, t: 40 },
  };
  var y_bardata = otu_ids
    .slice(0, 10)
    .map(j => `OTU ${j}`)
    .reverse();
  var barChartdata = [
    {
      y: y_bardata,
      x: sample_values.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    },
  ];
  Plotly.newPlot("bar", barChartdata, bartrace);
  var bubleLayout = {
    margin: {
      t: 0,
    },
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
  };
  var bubleChartdata = [
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth",
      },
    },
  ];
  Plotly.newPlot("bubble", bubleChartdata, bubleLayout);
}
function init() {
  var dropDownselector = d3.select("#selDataset");
  var samples_name = data.names;
  var samples_indi = data.metadata;
  samples_name.forEach(sample => {
    dropDownselector
      .append("option")
      .text(sample)
      .property("value", sample);
  });
  var sample1 = samples_name[0];
  createChart(sample1);
  demoInfo(sample1);
}
