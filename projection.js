
function main(){

var w = 600,
h = 500;
    
var lambda = 183;
var pi = 224;
var gamma = 185; 

var svg = d3.select("#div2").append("svg").attr("width", w).attr("height", h);


function show() {
        
            d3.selectAll("svg > *").remove();
            
            var projection = d3.geo.satellite()
                .translate([w/2,60])
                .distance(1.1)
                .scale(800)
                .center([-10, 80])
                .rotate([lambda, pi, gamma])
                .tilt(10)
                .clipAngle(Math.acos(1 / 1.1) * 180 / Math.PI - 1e-6);
                
            var path = d3.geo.path()
                .projection(projection);
                
            var graticule = d3.geo.graticule()
                .step([5, 5]);

                
            svg.append("path")
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", path);
                
            var land = svg.append("g");
            d3.json('world-150m.topo.json', function(err, data) {
                land.append("path")
                    .datum(topojson.object(data, data.objects.countries))
                    .attr("class", "land")
                    .attr("d", path);
            });

};


d3.selectAll("input").attr("value", function() {
            if (d3.select(this).attr("id") == "l"){
            d3.select("#l-value").text(lambda);
            return lambda;
            }
            else if (d3.select(this).attr("id") == "p"){
            d3.select("#p-value").text(pi);
            return pi;
            }
            else if (d3.select(this).attr("id") == "g"){
            d3.select("#g-value").text(gamma);
            return gamma;
            }
                
            });
            
d3.selectAll("input")
    .on("click", function() {
        if (d3.select(this).attr("id") == "l") 
        {
            lambda = this.value;
            d3.select("#l-value").text(this.value);
          }
        else if (d3.select(this).attr("id") == "p")
        {
            pi = this.value;
            d3.select("#p-value").text(this.value);
          }
        else if (d3.select(this).attr("id") == "g")
        {
            gamma = this.value;
            d3.select("#g-value").text(this.value);
          }
          
     show(); 
        });
        

d3.selectAll("input")
    .on("keydown", function() {
        if (d3.select(this).attr("id") == "l") 
        {
            lambda = this.value;
            d3.select("#l-value").text(this.value);
          }
        else if (d3.select(this).attr("id") == "p")
        {
            pi = this.value;
            d3.select("#p-value").text(this.value);
          }
        else if (d3.select(this).attr("id") == "g")
        {
            gamma = this.value;
            d3.select("#g-value").text(this.value);
          }
     show(); 
        });        

        show();
 
}