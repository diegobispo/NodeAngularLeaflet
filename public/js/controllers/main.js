
angular.module('pointController', ["leaflet-directive"])

    // inject the Point service factory into our controller
    .controller('mainController', function($scope, $http, Points) {
	'use strict';
        $scope.formData = {};
	

	var addressPointsToMarkers = function(points) {		
		console.log(points);
		$scope.markers = [];
		points.map(function(data) {
			var mark = {				
				lat: data.latitude,
				lng: data.longitude,
			};
			$scope.markers.push(mark);

			return;
		});
	};


	// MAP ==================================================================
        // Configuration
	angular.extend($scope, {
                center: {
                    lat: 41.575330,
                    lng: 13.102411,
                    zoom: 1
                }                
           });


        // GET =====================================================================
        // when landing on the page, get all points and show them
        // use the service to get all the points
        Points.get()
            .success(function(data) {
		addressPointsToMarkers(data);
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createPoint = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            if ($scope.formData !== null) {

                // call the create function from our service (returns a promise object)
                Points.create($scope.formData)
                    // if successful creation, call our get function to get all the new points
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
			addressPointsToMarkers(data);
                    });
            }
        };

        // DELETE ==================================================================
        // delete a point after checking it
        $scope.deletePoint = function(id) {
            Points.delete(id)
                // if successful creation, call our get function to get all the new points
                .success(function(data) {
			addressPointsToMarkers(data);
                });
        };

    });
