var numberFormat = d3.format(".2f");

queue()
    .defer(d3.csv, "data/billionaires.csv")
    .await(makeGraphs);

function makeGraphs(error, billionairesData) {
        
        var ndx = crossfilter(billionairesData);

        var gender_dim = ndx.dimension(dc.pluck('gender'));
        var count_by_gender = gender_dim.group();
        dc.pieChart('#gender_chart')
            .height(150)
            .radius(100)
            .transitionDuration(1500)
            .dimension(gender_dim)
            .group(count_by_gender);
            
        var citizenship_dim = ndx.dimension(dc.pluck('citizenship'));
        var count_by_citizenship = citizenship_dim.group();
        dc.pieChart('#citizenship_chart')
            .height(170)
            .radius(180)
            .transitionDuration(1500)
            .dimension(citizenship_dim)
            .group(count_by_citizenship);
            
        var category_dim = ndx.dimension(dc.pluck('category'));
        var count_by_category = category_dim.group();
        dc.rowChart("#category_chart")
            .height(300)
            .width(600)
            .dimension(category_dim)
            .group(count_by_category)
            .cap(4)
            .othersGrouper(false)
            .xAxis().ticks(4);
       
        var industry_dim = ndx.dimension(dc.pluck('industry'));
        var total_worth = industry_dim.group().reduceSum(dc.pluck('worth'));
        dc.rowChart("#industry_chart")
            .width(800)
            .height(300)
            .dimension(industry_dim)
            .group(total_worth)
            .cap(10)
            .othersGrouper(false)
            .xAxis().ticks(8);
            
        var name_dim = ndx.dimension(dc.pluck('name'));
        var worth_group = name_dim.group().reduceSum(dc.pluck('worth'));
        dc.rowChart("#name_chart")
            .width(600)
            .height(350)
            .dimension(name_dim)
            .group(worth_group)
            .cap(10)
            .othersGrouper(false)
            .xAxis().ticks(5);

        var sector_dim = ndx.dimension(dc.pluck('sector'));
        var count_by_sector = sector_dim.group();
        dc.rowChart("#sector_chart")
            .height(350)
            .width(600)
            .dimension(sector_dim)
            .group(count_by_sector)
            .cap(10)
            .othersGrouper(false)
            .xAxis().ticks(4); 
            
   dc.renderAll();
}
