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

define(['debug', 'jquery', 'd3', 'structureData'], function(debug, $, d3, structureData) {
	'use strict';

	//do i need unique years?

	//Variables
	var discogData = [];
	var uniqueYearsData = [];
	var uniqueFormatsData = [];
	var allColours = ['#C16620', '#E8A54E', '#385559', '#202C38', '#A58576'];
	var maxReleases = null;
	var numberYears = null;
	var formatxAxis = null;
	var releaseSize = 0;
	var w = 800;
	var h = 400;
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
			uniqueYearsData = uniqueYears;
			uniqueFormatsData = uniqueFormats;
			createDrawGraph.setColorFormat();
			createDrawGraph.calcReleases();
			createDrawGraph.formatXAxis();
			createDrawGraph.getYears();
			createDrawGraph.setReleaseSize();
			createDrawGraph.createKey();

			debug.log('discogData', discogData);

			return uniqueFormats;
		},

		setColorFormat: function setColorFormat() {
			colorFormat = d3.scale.ordinal().domain(uniqueFormatsData).range(allColours);
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
			})]).rangeRound([0, w - (padding*4) + 25]);
			yscale = d3.scale.linear().domain([d3.min(maxReleases, function(d) {
				return d;
			}), d3.max(maxReleases, function(d) {
				return d;
			})]).rangeRound([(h) - padding, padding]);

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

			var yearRange = discogData.length;

			xaxis = d3.svg.axis().ticks(yearRange).scale(xscale).orient('bottom').tickFormat(formatxAxis);
			yaxis = d3.svg.axis().ticks(maxReleases).tickValues(maxReleases).scale(yscale).orient('left');

			svg.append('g').attr('class', 'axis').attr('transform', 'translate(30,' + (padding/2) + ')').call(xaxis);
			//svg.append('g').attr('class', 'axis').attr('transform', 'translate(' + padding + ', 0)').call(yaxis);

			//call function
			createDrawGraph.drawGraph(discogData);
		},

		createKey: function createKeyFn() {
			for (var i = 0; i < allColours.length; i++) {
				$('#key-list').append('<dt style="background-color:' +  allColours[i] + '">&nbsp</dt>');
				$('#key-list').append('<dd>' +  uniqueFormatsData[i] + '</dd>');
			}
		},

		drawGraph: function drawGraph(dataObject) {
			//remove any existing rectangles
			svg.selectAll('rect').remove();

			//create columns
			var yearColumn = svg.selectAll('.year')
			.data(dataObject)
			.enter().append('g')
			.attr('class', 'column')
			.attr('transform', function(d) { return 'translate(' + xscale(d.year) + ',10)'; });

			yearColumn.selectAll('rect')
			.data(function(d) { return d.releases; })
			.enter()
			.append('rect')
			.on('click', function(d, i) {
				var rect = d3.select(this);
				rect.transition().delay(0).duration(500);
				$('.release-title').text(d.Title);
				$('.release-label').text(d.Label);
				$('.release-cat').text(d["Catalogue number"]);
			})
			.attr('height', 0)
			.transition()
			.delay(0)
			.duration(3000)
			.attr('width', (w - padding*2) / numberYears)
			.attr('y', function(d, i){
				return releaseSize * i + padding;
			})
			.attr('height', function(d) {
				return releaseSize;
			})
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