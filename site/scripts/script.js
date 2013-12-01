//Global variables 

//Add new propeties to data
//Create variables for format
//Use ordinal scape to map colours to data
discog_data["allFormats"] = [];
discog_data["formatNumbers"] = [];
discog_data["allColours"] = ["#cf6314","#3f9ada","#96c434","#79bec0","#de92ba","#4167de","#d6dc1c","#d2ae41","#8764a8"];
discog_data["allYears"] = [];

var formatxAxis = d3.format('.0f');
var w = 1200,
    h = 800,
    padding = 70;
var keyWidth = 960,
    keyHeight = 100;
var color_format = d3.scale.ordinal().domain(discog_data.allFormats).range(discog_data.allColours);

var xscale = null;
var yscale = null;
var xaxis = null;
var yaxis = null;

function set_scales() {
  xscale = d3.scale.linear().domain([d3.min(discog_data, function(d){return d.Year}), d3.max(discog_data, function(d){return d.Year})]).rangeRound([padding,(w)-padding]);
  yscale = d3.scale.linear().domain([d3.min(discog_data.formatNumbers, function(d){return d}), d3.max(discog_data.formatNumbers, function(d){return d})]).rangeRound([(h)-padding,padding]);
  xaxis = d3.svg.axis().scale(xscale).orient("bottom").tickFormat(formatxAxis).ticks(discog_data.allYears.length);
  yaxis = d3.svg.axis().scale(yscale).orient("left").tickFormat(formatxAxis).ticks(discog_data.allFormats.length);
  console.log(discog_data.formatNumbers);

  createSVG();
}

var svg;

//get unique Format Names
function get_format_names (){
  for(var i = 0; i < discog_data.length; i++) {
        if (discog_data.allFormats.indexOf( discog_data[i]['format'] ) === -1) {
         discog_data.allFormats.push(discog_data[i]['format']);
      }
  }
  console.log(discog_data.allFormats);
  format_number();
}

//Give formats a number using the index
function format_number () {
  for(var i = 0; i < discog_data.allFormats.length; i++) {
    discog_data.formatNumbers.push(i + 1);
  }
  console.log(discog_data.formatNumbers);
  get_years();
}

//Get unique years
function get_years(){
  for(var i = 0; i < discog_data.length; i++) {
        if (discog_data.allYears.indexOf( discog_data[i]['Year'] ) === -1) {
         discog_data.allYears.push(discog_data[i]['Year']);
      }
  }
  console.log(discog_data.allYears.length);
  console.log(discog_data);
  set_scales();
}

// wrapping function
var init = function() {
  get_format_names();
  //createKey();
  //createSVG();
  initReset();
  hideNoResults();

  // set up search autocomplete
 $("#category-search").autocomplete({source: discog_data.allFormats});
 $('#search-submit').on("click", function(event){
    event.preventDefault();
    var searchVal = $("#category-search").val();
    newData(searchVal);
 });

}; // end init function


function hideNoResults() {
  $('.no-results').hide();
};

function initReset() {
  $('#search-reset').on("click", function(event){
    event.preventDefault();
    drawGraph(discog_data);
    $('.no-results').hide();
 });
};

function createKey() {
  for (var i = 0; i < discog_data.allColours.length; i++) {
  //for (var i = allColours.length - 1; i >= 0; i--) {
    $('#key-list').append('<dd style="background-color:' +  discog_data.allColours[i] + '"">&nbsp</dd>');
    $('#key-list').append('<dt>' +  discog_data.allFormats[i] + '</dt>');
  };
};


function createSVG() {
  // create svg canvas
  svg = d3.select("#data-output")
  .append("svg:svg")
  .attr("width",w)
  .attr("height",h);
  // .on("mousemove", function(){
  //   var infobox = d3.select(".infobox");
  //   var coord = d3.svg.mouse(this);
  //   infobox.style("left", coord[0] + 15  + "px" );
  //   infobox.style("top", coord[1] + "px");
  //});
createAxis();
};

// create axis
function createAxis() {
 svg.append("g").attr("class","axis").attr("transform", "translate(0," + (h - padding) + ")").call(xaxis);
 svg.append("g").attr("class","axis").attr("transform", "translate(" + padding + ", 0)").call(yaxis);
// add axis labels
 svg.append("text").attr("class", "x-label").attr("text-anchor", "middle").attr("x", (w/2) - 30).attr("y", (h - padding/2) + 10).text("Year");
 svg.append("text").attr("class", "y-label").attr("text-anchor", "middle").attr("y", (padding/2) - 10).attr("x", -h/2).attr("dy", ".75em").attr("transform", "rotate(-90)").text("Formats");

 drawGraph(discog_data);
};

// pass in search field value to construct new data object
function newData(searchVal) {
  
  var newDataObject = [];
  
  for (var i = 0; i < discog_data.length; i++) {
    if (discog_data[i]['allFormats'] == searchVal) {
      newDataObject.push(discog_data[i]);
    }
  };
  // console.log(newDataObject.length);
  if (newDataObject.length === 0) {
    $('.no-results').show();
  }
  else {
    $('.no-results').hide();
  }
  
  drawGraph(newDataObject);
};

var drawGraph = function(dataObject) {

//remove any existing rectangles
svg.selectAll("rect").remove();

//bind data to blocks
 svg.selectAll("rect")
 .data(dataObject)
 .enter()
 .append("rect")
 // .on("mouseover", function(d) {
 //    var rectangle = d3.select(this);
 //    rectangle.transition().delay(0).duration(500).attr("y", function(d) {return (rscale(d.format_number)) * 2;});
 //    d3.select(".infobox").style("opacity", "10");
 //    d3.select("p").text(d['keyword lists']);
 // })
 // .on("mouseout", function(d){
 //    var rectangle = d3.select(this);
 //    rectangle.transition().delay(0).duration(500).attr("y", function(d) {return rscale(d.format_number);});
 //    d3.select(".infobox").style("opacity", "0");
 // })
 .transition()
 .delay(0)
 .duration(3000)
 .attr("x", function(d) {return xscale(d.Year);})
 .attr("y", function(d) {return yscale(d.format_number);})
 .attr("height", function(d) {return xscale(d.Year);})
 .attr("width", 50)
 .attr("fill", function(d) {return color_format(d.format);})


}; // end graph function

(function($) {
  $(function() {init();});
})(jQuery);