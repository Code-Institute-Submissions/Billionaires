queue()
    .defer(d3.csv, "data/billionaires.csv")
    .await(makeGraphs);


function makeGraphs(error, billionairesData) {
        var ndx = crossfilter(billionairesData);
        var industry_dim = ndx.dimension(dc.pluck('industry'));
        var count_by_industry = industry_dim.group();
        dc.barChart("#chart1")
            .height(500)
            .width(1000)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(industry_dim)
            .group(count_by_industry)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Industry")
            .yAxis().ticks(4);
        var citizenship_dim = ndx.dimension(dc.pluck('citizenship'));
        var count_by_citizenship = citizenship_dim.group();
        dc.barChart("#chart2")
            .height(300)
            .width(600)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(citizenship_dim)
            .group(count_by_citizenship)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Citizenship")
            .yAxis().ticks(4);
    dc.renderAll();
}