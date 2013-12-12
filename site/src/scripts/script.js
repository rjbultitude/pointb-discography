//Global variables 

//Add new propeties to data
//Create variables for format
//Use ordinal scape to map colours to data

var allFormats = [];
var allColours = ['#C16620','#E8A54E','#385559','#202C38','#A58576'];
var allYears = [];
var allReleasesTotal = discogData.length;
var numberYears = null;

var formatxAxis = d3.format('.0f');
var w = 980,
    h = 800,
    padding = 100;
var keyWidth = 960,
    keyHeight = 100;
var colorFormat = d3.scale.ordinal().domain(allFormats).range(allColours);

var xscale = null;
var yscale = null;
var xaxis = null;
var yaxis = null;

function setScales() {
  'use strict';
  xscale = d3.scale.linear().domain([d3.min(discogData, function(d){return d.Year;}), d3.max(discogData, function(d){return d.Year;})]).rangeRound([padding,(w)-padding]);
  yscale = d3.scale.linear().domain([d3.min(allReleasesTotal, function(d){return d;}), d3.max(allReleasesTotal, function(d){return d;})]).rangeRound([(h)-padding,padding]);
  xaxis = d3.svg.axis().ticks(allYears.length -1).scale(xscale).orient('bottom').tickFormat(formatxAxis);
  yaxis = d3.svg.axis().tickValues(allReleasesTotal).scale(yscale).orient('left');

  createSVG();
}

var svg;

//get unique Format Names
function getFormatNames (){
  'use strict';
  for(var i = 0; i < discogData.length; i++) {
        if (allFormats.indexOf( discogData[i]['format'] ) === -1) {
         allFormats.push(discogData[i]['format']);
      }
  }
  getYears();
}

//Get unique years
function getYears(){
  for(var i = 0; i < discogData.length; i++) {
      if (allYears.indexOf( discogData[i]['Year'] ) === -1) {
         allYears.push(discogData[i]['Year']);
      }
  }
  numberYears = allYears.length;
  console.log(numberYears);
  setScales();
}

// wrapping function
var init = function() {
  getFormatNames();
  //createKey();
  //createSVG();
  initReset();
  hideNoResults();

  // set up search autocomplete
  // $('#category-search').autocomplete({source: allFormats});
  // $('#search-submit').on('click', function(event){
  //   event.preventDefault();
  //   var searchVal = $('#category-search').val();
  //   newData(searchVal);
  // });

}; // end init function


function hideNoResults() {
  $('.no-results').hide();
}

function initReset() {
  $('#search-reset').on("click", function(event){
    event.preventDefault();
    drawGraph(discogData);
    $('.no-results').hide();
  });
}

function createKey() {
  for (var i = 0; i < allColours.length; i++) {
  //for (var i = allColours.length - 1; i >= 0; i--) {
    $('#key-list').append('<dd style="background-color:' +  allColours[i] + '"">&nbsp</dd>');
    $('#key-list').append('<dt>' +  allFormats[i] + '</dt>');
  }
}


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
}

// create axis
function createAxis() {
 svg.append("g").attr("class","axis").attr("transform", "translate(0," + (h - padding) + ")").call(xaxis);
 svg.append("g").attr("class","axis").attr("transform", "translate(" + padding + ", 0)").call(yaxis);
// add axis labels
 svg.append("text").attr("class", "x-label").attr("text-anchor", "middle").attr("x", (w/2) - 30).attr("y", (h - padding/2) + 10).text("Year");
 svg.append("text").attr("class", "y-label").attr("text-anchor", "middle").attr("y", (padding/2) - 10).attr("x", -h/2).attr("transform", "rotate(-90)").text("Releases");

 drawGraph(discogData);
}

// pass in search field value to construct new data object
function newData(searchVal) {
  
  var newDataObject = [];
  
  for (var i = 0; i < discogData.length; i++) {
    if (discogData[i]['allFormats'] == searchVal) {
      newDataObject.push(discogData[i]);
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
 //    rectangle.transition().delay(0).duration(500).attr("y", function(d) {return (rscale(d.formatNumber)) * 2;});
 //    d3.select(".infobox").style("opacity", "10");
 //    d3.select("p").text(d['keyword lists']);
 // })
 // .on("mouseout", function(d){
 //    var rectangle = d3.select(this);
 //    rectangle.transition().delay(0).duration(500).attr("y", function(d) {return rscale(d.formatNumber);});
 //    d3.select(".infobox").style("opacity", "0");
 // })
 .transition()
 .delay(0)
 .duration(3000)
 .attr("x", function(d) {return xscale(d.Year);})
 .attr("y", padding)
 .attr("height", allReleasesTotal)
 .attr("width", (w - padding*4) / numberYears)
 .attr("fill", function(d) {return colorFormat(d.format);})


}; // end graph function

(function($) {
  $(function() {init();});
})(jQuery);