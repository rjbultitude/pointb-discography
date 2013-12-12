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

define(['debug', 'loadData'], function(debug, loadDataModule) {
	'use strict';

	var structureData = {

		init: function() {
			var newData = loadDataModule.originalData;

			var firstItem = newData[0];
		}
	};

	return structureData;

});