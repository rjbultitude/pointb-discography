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

define(function() {
		'use strict';

		var loadDataModule = {

			originalData: [],

			getData: function getDataFn() {
				$.getJSON('/data/discog-data.json',
					function(data) {
						loadDataModule.originalData = data;
						console.log('success');
					});
			},

			getDataAjax: function getDataAjaxFn() {
				$.ajax({
					type: 'POST',
					url: '/data/discog-data.json',
					dataType: 'json',
					success: function(jsonData) {
						console.log('this is the json', jsonData);
						loadDataModule.originalData = jsonData;
					},
				});
			},

			init: function initFn() {

				loadDataModule.getDataAjax();
				console.log('load loadDataModule.originalData', loadDataModule.originalData);
			}
		};

		return loadDataModule;

	});