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
			var newData = jsonData;

			var firstItem = newData[0];

			createDrawGraph.getData(newData);
		}
	};

	return structureData;

});