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

define(['debug', 'd3', 'loadData'], function(debug, d3, loadDataModule) {
	'use strict';

	debug.log('debug is being used in the draw graph module');

	var createDrawGraph = {

		//Variables
		appVariables: {
			allFormats: [],
			allColours: ['#C16620', '#E8A54E', '#385559', '#202C38', '#A58576'],
			allYears: [],
			allReleasesTotal: null,
			numberYears: null,
			formatxAxis: null,
			w: 980,
			h: 800,
			padding: 100,
			colorFormat: null,
			xscale: null,
			yscale: null,
			xaxis: null,
			yaxis: null,
			svg: null
		},

		setColorFormat: function setColorFormat() {
			createDrawGraph.appVariables.colorFormat = d3.scale.ordinal().domain(createDrawGraph.appVariables.allFormats).range(createDrawGraph.appVariables.allColours);
		},

		calcReleases: function calcReleasesFn() {
			createDrawGraph.appVariables.allReleasesTotal = loadDataModule.originalData.length;
		},

		formatXAxis: function formatXAxisFn() {
			createDrawGraph.appVariables.formatxAxis = d3.format('.0f');
		},

		//Get unique years
		getYears: function getYearsFn(){
			for(var i = 0; i < loadDataModule.originalData.length; i++) {
				if (createDrawGraph.appVariables.allYears.indexOf( loadDataModule.originalData[i]['Year'] ) === -1) {
					createDrawGraph.appVariables.allYears.push(loadDataModule.originalData[i]['Year']);
				}
			}
			createDrawGraph.appVariables.numberYears = createDrawGraph.appVariables.allYears.length;
			console.log('number years', createDrawGraph.appVariables.numberYears);
			createDrawGraph.setScales();
		},

		setScales: function setScalesFn() {
			createDrawGraph.appVariables.xscale = d3.scale.linear().domain([d3.min(loadDataModule.originalData, function(d) {
				return d.Year;
			}), d3.max(loadDataModule.originalData, function(d) {
				return d.Year;
			})]).rangeRound([createDrawGraph.appVariables.padding, (createDrawGraph.appVariables.w) - createDrawGraph.appVariables.padding]);
			createDrawGraph.appVariables.yscale = d3.scale.linear().domain([d3.min(createDrawGraph.appVariables.allReleasesTotal, function(d) {
				return d;
			}), d3.max(createDrawGraph.appVariables.allReleasesTotal, function(d) {
				return d;
			})]).rangeRound([(createDrawGraph.appVariables.h) - createDrawGraph.appVariables.padding, createDrawGraph.appVariables.padding]);
			createDrawGraph.appVariables.xaxis = d3.svg.axis().ticks(createDrawGraph.appVariables.allYears.length - 1).scale(createDrawGraph.appVariables.xscale).orient('bottom').tickFormat(createDrawGraph.appVariables.formatxAxis);
			createDrawGraph.appVariables.yaxis = d3.svg.axis().tickValues(createDrawGraph.appVariables.allReleasesTotal).scale(createDrawGraph.appVariables.yscale).orient('left');

			//call function
			createDrawGraph.createSVG();
		},

		createSVG: function createSVGFn() {
			// create svg canvas
			createDrawGraph.appVariables.svg = d3.select('#data-output')
				.append('svg:svg')
				.attr('width', createDrawGraph.appVariables.w)
				.attr('height', createDrawGraph.appVariables.h);
			//call function
			createDrawGraph.createAxis();
		},

		createAxis: function createAxisFn() {
			createDrawGraph.appVariables.svg.append('g').attr('class', 'axis').attr('transform', 'translate(0,' + (createDrawGraph.appVariables.h - createDrawGraph.appVariables.padding) + ')').call(createDrawGraph.appVariables.xaxis);
			createDrawGraph.appVariables.svg.append('g').attr('class', 'axis').attr('transform', 'translate(' + createDrawGraph.appVariables.padding + ', 0)').call(createDrawGraph.appVariables.yaxis);
			// add axis labels
			createDrawGraph.appVariables.svg.append('text').attr('class', 'x-label').attr('text-anchor', 'middle').attr('x', (createDrawGraph.appVariables.w / 2) - 30).attr('y', (createDrawGraph.appVariables.h - createDrawGraph.appVariables.padding / 2) + 10).text('Year');
			createDrawGraph.appVariables.svg.append('text').attr('class', 'y-label').attr('text-anchor', 'middle').attr('y', (createDrawGraph.appVariables.padding / 2) - 10).attr('x', -createDrawGraph.appVariables.h / 2).attr('transform', 'rotate(-90)').text('Releases');

			//call function
			createDrawGraph.drawGraph(loadDataModule.originalData);
		},

		drawGraph: function drawGraph(dataObject) {

			//remove any existing rectangles
			createDrawGraph.appVariables.svg.selectAll('rect').remove();

			//bind data to blocks
			createDrawGraph.appVariables.svg.selectAll('rect')
				.data(dataObject)
				.enter()
				.append('rect')
				.transition()
				.delay(0)
				.duration(3000)
				.attr('x', function(d) {
					return createDrawGraph.appVariables.xscale(d.Year);
				})
				.attr('y', createDrawGraph.appVariables.padding)
				.attr('height', createDrawGraph.appVariables.allReleasesTotal)
				.attr('width', (createDrawGraph.appVariables.w - createDrawGraph.appVariables.padding * 4) / createDrawGraph.appVariables.numberYears)
				.attr('fill', function(d) {
					return createDrawGraph.appVariables.colorFormat(d.format);
				});

		},

		init: function initFn() {
			createDrawGraph.setColorFormat();
			createDrawGraph.calcReleases();
			createDrawGraph.formatXAxis();
			createDrawGraph.getYears();
		}
	};

	return createDrawGraph;

});