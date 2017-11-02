var numberFormat = d3.format(".2f");

queue()
    .defer(d3.csv, "data/billionaires.csv")
    .await(makeGraphs);

function makeGraphs(error, billionairesData) {
        
        var ndx = crossfilter(billionairesData);
        
        var gender_dim = ndx.dimension(dc.pluck('gender'));
        var count_by_gender = gender_dim.group();
        dc.pieChart('#gender_chart')
            .height(400)
            .radius(400)
            .transitionDuration(1500)
            .dimension(gender_dim)
            .group(count_by_gender);
       
        var category_dim = ndx.dimension(dc.pluck('category'));
        var total_worth = category_dim.group().reduceSum(dc.pluck('worth'));
        dc.barChart("#category_chart")
        .width(1100)
        .height(400)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(category_dim)
        .group(total_worth)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Category")
        .yAxis().ticks(4);       
        
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


        var sectorDim = ndx.dimension(function(d){
            return d.sector;
        });
        var statsBySector = sectorDim.group().reduce(
            function (p, v) {
                p.amount += +v["founded"];
                p.price += +v["worth_in_billions"];
                return p;
            },
            function (p, v) {
                p.amount -= +v["founded"];
                p.price -= +v["worth_in_billions"];
                return p;
            },
            function () {
                return {amount: 0, price: 0}
            }
        );
        var sector_chart = dc.bubbleChart("#chart5");
        sector_chart.width(990)
            .height(400)
            .margins({top: 10, right: 50, bottom: 30, left: 60})
            .dimension(sectorDim)
            .group(statsBySector)
            .colors(d3.scale.category20())
            .keyAccessor(function (p) {
                return p.value.founded;
            })
            .valueAccessor(function (p) {
                return p.value.worth_in_billions;
            })
            .radiusValueAccessor(function (p) {
                return p.value.amount;
            })
            .x(d3.scale.linear().domain([0, 70000]))
            .r(d3.scale.linear().domain([0, 70000]))
            .minRadiusWithLabel(15)
            .elasticY(true)
            .yAxisPadding(100)
            .elasticX(true)
            .xAxisPadding(10000)
            .maxBubbleRelativeSize(0.07)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .renderLabel(true)
            .renderTitle(true)
            .title(function (p) {
                return p.key
                    + "\n"
                    + "Founded : " + numberFormat(p.value.amount) + "\n"
                    + "Worth In Billions: " + numberFormat(p.value.price);
            });
        sector_chart.yAxis().tickFormat(function (s) {
            return s;
        });
        sector_chart.xAxis().tickFormat(function (s) {
            return s;
        });

   dc.renderAll();
}
