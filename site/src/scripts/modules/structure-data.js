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

define(['debug', 'loadData', 'createDrawGraph'], function(debug, loadDataModule, createDrawGraph) {
	'use strict';

	var structureData = {

		createNewData: function createNewDataFn(jsonData) {
			var oldData = jsonData;
			var newData = [];
			//var firstItem = newData[0];

			for (var i in oldData) {
				newData.push(i.year);
			}

			//swap this for newData when ready
			createDrawGraph.getData(oldData);
		}
	};

	return structureData;

});