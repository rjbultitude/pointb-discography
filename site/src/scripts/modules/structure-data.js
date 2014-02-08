/**
 * Example module module
 *
 * $author       Richard Bultitude
 * $email        richard.bultitude@gmail.com
 * $url          http://www.point-b.co.uk
 * $copyright    Copyright (c) 2014, www.point-b.co.uk. All rights reserved.
 * $version      1.1
 *
 * $notes        Notes
 */

var requireLocalized = requireLocalized || {};

define(['debug', 'loadData', 'createDrawGraph'], function(debug, loadDataModule, createDrawGraph) {
	'use strict';

	var structureData = {

		createNewData: function createNewDataFn(jsonData) {
			var oldData = jsonData;
			var newData = [];
			var uniqueYears = [];
			var uniqueFormats = [];

			//get unique years
			for (var i = 0; i < oldData.length; i++) {
				if (uniqueYears.indexOf(oldData[i].Year) === -1) {
					uniqueYears.push(oldData[i].Year);
				}
			}
			uniqueYears.sort();
			//debug.log('uniqueYears', uniqueYears);

			//Create object for each year and add to newData
			for (var j=0; j < uniqueYears.length; j++) {
				var yearObject = {
					year: uniqueYears[j],
					releases: []
				};
				newData.push(yearObject);
			}

			//add relevant releases to each year
			for (var k = 0; k < newData.length; k++) {
				for (var l = 0; l < oldData.length; l++) {
					if (newData[k].year === oldData[l].Year) {
						newData[k].releases.push(oldData[l]);
					}
				}
			}

			//get unique formats
			for (var i = 0; i < oldData.length; i++) {
				if (uniqueFormats.indexOf(oldData[i].Format) === -1) {
					uniqueFormats.push(oldData[i].Format);
				}
			}

			createDrawGraph.getData(newData, uniqueYears, uniqueFormats);
		}
	};

	return structureData;

});