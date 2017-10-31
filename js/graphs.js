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