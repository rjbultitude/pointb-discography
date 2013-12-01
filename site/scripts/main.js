//main functions

define(['kinetic'], function() {
    'use strict';


    var main = {

        init: function mainFunctionInitFn() {
            this.circlesAnim();
        },

        circlesAnim: function circlesAnimFn() {
            //------------
            //Set stage
            //------------

            var stage = new Kinetic.Stage({
                container: 'container',
                width: 578,
                height: 300
            });

            //------------
            //Create layer
            //------------

            var circleLayer = new Kinetic.Layer();

            //------------
            //Create image
            //------------

            var imageLayer = new Kinetic.Layer();

            var imageObj = new Image();
            var circleImage;
            imageObj.onload = function() {
                circleImage = new Kinetic.Image({
                    x: 100,
                    y: 100,
                    image: imageObj,
                    filter: Kinetic.Filters.Blur,
                    filterRadius: 8
                });
                
                imageLayer.add(circleImage);
                stage.add(imageLayer);
                // imageLayer2.add(circleImage);
                // stage.add(imageLayer2);

                var amplitude = 150;
                var period = 2000;
                // in ms
                var centerX = stage.getWidth() / 2;
                
                var imageAnim = new Kinetic.Animation(function(frame) {
                    circleImage.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
                }, imageLayer);

                imageAnim.start();
            };

            imageObj.src = 'images/circle-white.png';

        }
    };//end main

    return main;
});