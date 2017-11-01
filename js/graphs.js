queue()
    .defer(d3.csv, "data/billionaires.csv")
    .await(makeGraphs);


function makeGraphs(error, billionairesData) {
        var ndx = crossfilter(billionairesData);
        var industry_dim = ndx.dimension(dc.pluck('industry'));
        var count_by_industry = industry_dim.group();
        dc.barChart("#chart1")
            .height(400)
            .width(800)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(industry_dim)
            .group(count_by_industry)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxis().ticks(4);
        var citizenship_dim = ndx.dimension(dc.pluck('citizenship'));
        var count_by_citizenship = citizenship_dim.group();
        dc.barChart("#chart2")
            .height(400)
            .width(800)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(citizenship_dim)
            .group(count_by_citizenship)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxis().ticks(4);
        var gender_dim = ndx.dimension(dc.pluck('gender'));
        var count_by_gender = gender_dim.group();
        dc.pieChart('#chart3')
            .height(200)
            .radius(200)
            .transitionDuration(1500)
            .dimension(gender_dim)
            .group(count_by_gender);
    dc.renderAll();
}

function show_age_to_worth_correlation(ndx) {
    var genderColors = d3.scale.ordinal()
        .domain(["Female", "Male"])
        .range(["pink", "blue"]);
    var wDim = ndx.dimension(dc.pluck("age"));
    var ageDim = ndx.dimension(function(d){
        return [d.age, d.worth_in_billions, d.gender];
    });
    var worthGroup = ageDim.group();

    var minAge = wDim.bottom(1)[0].age;
    var maxAge = wDim.top(1)[0].age;

    dc.scatterPlot("#chart4")
        .width(1000)
        .height(500)
        .x(d3.scale.linear().domain([minAge,maxAge]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .yAxisLabel("Worth")
        .xAxisLabel("Age")
        .title(function (d) {
            return d.key[2] + " earned " + d.key[2];
        })
        .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(genderColors)
        .dimension(ageDim)
        .group(worthGroup)
        .margins({top: 10, right: 50, bottom: 75, left: 75});
}


var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var format = d3.format(",d");

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

d3.csv("billionaires.csv", function(d) {
  d.value = +d.value;
  if (d.value) return d;
}, function(error, sector) {
  if (error) throw error;

  var root = d3.hierarchy({children: sector})
      .sum(function(d) { return d.value; })
      .each(function(d) {
        if (id = d.data.id) {
          var id, i = id.lastIndexOf(".");
          d.id = id;
          d.package = id.slice(0, i);
          d.class = id.slice(i + 1);
        }
      });

  var node = svg.selectAll(".node")
    .data(pack(root).leaves())
    .enter().append("g")
      .attr("sector", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
      .attr("id", function(d) { return d.id; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.package); });

  node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
    .append("use")
      .attr("xlink:href", function(d) { return "#" + d.id; });

  node.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
    .selectAll("tspan")
    .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
      .text(function(d) { return d; });

  node.append("title")
      .text(function(d) { return d.id + "\n" + format(d.value); });
});