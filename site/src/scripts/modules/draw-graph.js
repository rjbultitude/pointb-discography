/**
 * Draw graph module
 *
 * $author       Richard Bultitude
 * $email        richard.bultitude@gmail.com
 * $url          http://www.point-b.co.uk
 * $copyright    Copyright (c) 2014, point-b.co.uk. All rights reserved.
 * $version      1.0
 *
 * $notes        Notes
 */

var requireLocalized = requireLocalized || {};

define(['debug', 'd3', 'structureData'], function(debug, d3, structureData) {
	'use strict';

	//Variables
	var discogData = [];
	var uniqueYears = [];
	var uniqueFormats = [];
	var allColours = ['#C16620', '#E8A54E', '#385559', '#202C38', '#A58576'];
	var maxReleases = null;
	var numberYears = null;
	var formatxAxis = null;
	var releaseSize = 0;
	var w = 800;
	var h = 600;
	var padding = 40;
	var colorFormat = null;
	var xscale = null;
	var yscale = null;
	var xaxis = null;
	var yaxis = null;
	var svg = null;

	var createDrawGraph = {

		getData: function getDataFn(data, uniqueYears, uniqueFormats) {
			discogData = data;
			uniqueYears = uniqueYears;
			uniqueFormats = uniqueFormats;
			createDrawGraph.setColorFormat();
			createDrawGraph.calcReleases();
			createDrawGraph.formatXAxis();
			createDrawGraph.getYears();
			createDrawGraph.setReleaseSize();

			debug.log('discogData', discogData);
		},

		setColorFormat: function setColorFormat() {
			colorFormat = d3.scale.ordinal().domain(uniqueFormats).range(allColours);
		},

		//Get max number of releases in year
		calcReleases: function calcReleasesFn() {
			for (var i = 0; i < discogData.length; i++) {
				if (discogData[i].releases.length <= maxReleases) {
					maxReleases = maxReleases;
				}
				else {
					maxReleases = discogData[i].releases.length;
				}
			}
			//debug.log('maxReleases', maxReleases);
		},

		formatXAxis: function formatXAxisFn() {
			formatxAxis = d3.format('.0f');
		},

		//Get unique years
		getYears: function getYearsFn(){
			numberYears = discogData.length;
		},

		setReleaseSize: function setReleaseSize() {
			releaseSize = (h - padding*2) / maxReleases;
			createDrawGraph.setScales();
		},

		setScales: function setScalesFn() {
			xscale = d3.scale.linear().domain([d3.min(discogData, function(d) {
				return d.year;
			}), d3.max(discogData, function(d) {
				return d.year;
			})]).rangeRound([padding, (w) - padding]);
			yscale = d3.scale.linear().domain([d3.min(maxReleases, function(d) {
				return d;
			}), d3.max(maxReleases, function(d) {
				return d;
			})]).rangeRound([(h) - padding, padding]);
			xaxis = d3.svg.axis().ticks(uniqueYears.length).scale(xscale).orient('bottom').tickFormat(formatxAxis);
			yaxis = d3.svg.axis().tickValues(maxReleases).scale(yscale).orient('left');

			//call function
			createDrawGraph.createSVG();
		},

		createSVG: function createSVGFn() {
			// create svg canvas
			svg = d3.select('#data-output')
				.append('svg:svg')
				.attr('width', w)
				.attr('height', h);
			//call function
			createDrawGraph.createAxis();
		},

		createAxis: function createAxisFn() {
			svg.append('g').attr('class', 'axis').attr('transform', 'translate(0,' + (h - padding) + ')').call(xaxis);
			svg.append('g').attr('class', 'axis').attr('transform', 'translate(' + padding + ', 0)').call(yaxis);
			// add axis labels
			svg.append('text').attr('class', 'x-label').attr('text-anchor', 'middle').attr('x', (w / 2) - 30).attr('y', (h - padding / 2) + 10).text('Year');
			svg.append('text').attr('class', 'y-label').attr('text-anchor', 'middle').attr('y', (padding / 2) - 10).attr('x', -h / 2).attr('transform', 'rotate(-90)').text('Releases');

			//call function
			createDrawGraph.drawGraph(discogData);
		},

		drawGraph: function drawGraph(dataObject) {
			//debug.log('format?', dataObject[0].releases[0].Format);
			//remove any existing rectangles
			svg.selectAll('rect').remove();

			//create columns
			var yearColumn = svg.selectAll('.year')
			.data(dataObject)
			.enter().append('g')
			.attr('class', 'g')
			.attr('transform', function(d) { return 'translate(' + xscale(d.year) + ',0)'; });

			yearColumn.selectAll('rect')
			.data(function(d) { return d.releases; })
			.enter()
			.append('rect')
			.attr('height', 0)
			.transition()
			.delay(0)
			.duration(3000)
			.attr('width', (w - padding*2) / numberYears)
			.attr('y', function(d, i){
				return releaseSize * i + i + padding;
			})
			.attr('height', releaseSize)
			.style('fill', function(d){
				return colorFormat(d.Format);
			});
		},

		init: function initFn() {
			createDrawGraph.getData();
		}
	};

	return createDrawGraph;

});