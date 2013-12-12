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

define(['createDrawGraph'], function(createDrawGraph) {
		'use strict';

		var loadDataModule = {

			getData: function getDataFn() {
				$.getJSON('/data/discog-data.json',
					function(data) {
						loadDataModule.originalData = data;
						console.log('success');
					});
			},

			getDataAjax: function getDataAjaxFn() {
				$.ajax({
					type: 'GET',
					url: '/data/discog-data.json',
					dataType: 'json',
					success: function(jsonData) {
						createDrawGraph.getData(jsonData);
					},
				});
			},

			init: function initFn() {
				loadDataModule.getDataAjax();
			}
		};



		return loadDataModule;

	});