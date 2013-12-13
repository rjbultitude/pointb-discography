/**
 * Example module module
 *
 * $author       Zone dev
 * $email        frontend@thisiszone.com
 * $url          http://www.thisiszone.com/
 * $copyright    Copyright (c) 2013, thisiszone.com. All rights reserved.
 * $version      1.0
 *
 * $notes        Notes
 */

var requireLocalized = requireLocalized || {};

define(['debug', 'd3', 'structureData'], function(debug, d3, structureData) {
	'use strict';

	//Variables
	var discogData = [];
	var allFormats = [];
	var allColours = ['#C16620', '#E8A54E', '#385559', '#202C38', '#A58576'];
	var allYears = [];
	var allReleasesTotal = null;
	var numberYears = null;
	var formatxAxis = null;
	var w = 980;
	var h = 800;
	var padding = 100;
	var colorFormat = null;
	var xscale = null;
	var yscale = null;
	var xaxis = null;
	var yaxis = null;
	var svg = null;

	var createDrawGraph = {

		getData: function getDataFn(data) {
			discogData = data;
			createDrawGraph.setColorFormat();
			createDrawGraph.calcReleases();
			createDrawGraph.formatXAxis();
			createDrawGraph.getYears();
		},

		setColorFormat: function setColorFormat() {
			colorFormat = d3.scale.ordinal().domain(allFormats).range(allColours);
		},

		calcReleases: function calcReleasesFn() {
			allReleasesTotal = discogData.length;
			debug.log('allReleasesTotal', allReleasesTotal);
		},

		formatXAxis: function formatXAxisFn() {
			formatxAxis = d3.format('.0f');
		},

		//Get unique years
		getYears: function getYearsFn(){
			for(var i = 0; i < discogData.length; i++) {
				var myIndex = discogData[i];
				if (allYears.indexOf( myIndex.Year ) === -1) {
					allYears.push(myIndex.Year);
				}
			}
			numberYears = allYears.length;
			console.log('number years', numberYears);
			createDrawGraph.setScales();
		},

		setScales: function setScalesFn() {
			xscale = d3.scale.linear().domain([d3.min(discogData, function(d) {
				return d.Year;
			}), d3.max(discogData, function(d) {
				return d.Year;
			})]).rangeRound([padding, (w) - padding]);
			yscale = d3.scale.linear().domain([d3.min(allReleasesTotal, function(d) {
				return d;
			}), d3.max(allReleasesTotal, function(d) {
				return d;
			})]).rangeRound([(h) - padding, padding]);
			xaxis = d3.svg.axis().ticks(allYears.length - 1).scale(xscale).orient('bottom').tickFormat(formatxAxis);
			yaxis = d3.svg.axis().tickValues(allReleasesTotal).scale(yscale).orient('left');

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

			debug.log('data for drawing', dataObject);

			//remove any existing rectangles
			svg.selectAll('rect').remove();

			//bind data to blocks
			svg.selectAll('rect')
				.data(dataObject)
				.enter()
				.append('rect')
				.transition()
				.delay(0)
				.duration(3000)
				.attr('x', function(d) {
					return xscale(d.Year);
				})
				.attr('y', padding)
				.attr('height', allReleasesTotal)
				.attr('width', (w - padding * 4) / numberYears)
				.attr('fill', function(d) {
					return colorFormat(d.format);
				});

		},

		init: function initFn() {
			createDrawGraph.getData();
		}
	};

	return createDrawGraph;

});