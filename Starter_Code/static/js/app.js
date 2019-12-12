var url = "./samples.json";
d3.json(url).then(function (data) {
    console.log(data)});

    function demoInfo(demographics) {
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(demographics).forEach(([key, value]) => {
            panel.append("span")
                .html(`${key} : ${value}`)
                .append("br");
        })
    };

    function createChart(sample) {
        d3.json(url).then((data) => { 
            var samples = data.samples;
            var filterArrey = samples.filter(i => i.id == sample);
            var result = filterArrey[0];
            var otu_ids = result.otu_ids;
            var otu_labels = result.otu_labels;
            var sample_values = result.sample_values;

            var bartrace = { 
                margin: { l:150,
                    t:40
                }
            };  
            var y_bardata = otu_ids.slice(0,10).map(j => `OTU ${j}`).reverse();
            var barChartdata = [{ 
                y: y_bardata,
                x: sample_values.slice(0,10).reverse(),
                type: "bar",
                orientation: 'h'
            }];
            Plotly.newPlot("bar",barChartdata,bartrace);

            var bubleLayout = {
                margin: {
                    t:0,
                },
                hovermode: "closest",
                xaxis:{title:"OTU ID"
                }
            }
            var bubleChartdata = [{ 
                x:otu_ids,
                y:sample_values,
                text:otu_labels,
                mode: "markers",
                marker:{
                    size:sample_values,
                    color:otu_ids,
                    colorscale:"Earth"

                }
            }];
            Plotly.newPlot("bubble",bubleChartdata,bubleLayout);
        });
    }

    function init(){
        var dropDownselector = d3.select("#selDataset");
        var demoSelector = d3.select("#sample-metadata");
        d3.json(url).then((data) => { 
            var samples_name = data.names;
            var samples_indi = data.metadata;
            samples_name.forEach((sample)=>{
                dropDownselector.append("option").text(sample).property("value",sample);

            samples_indi.forEach((demographics)=>{
                demoSelector.append("option").text(demographics).property("value",demographics);
                });

            });
            var sample1 = samples_name[0];
            createChart(sample1);

            var sample2 = samples_indi[0];
            demoInfo(sample2);
        });
        }

        function optionChanged(newSample) 
        {
            createChart(newSample);
        }

        init();