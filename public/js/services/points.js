angular.module('pointService', [])
    // super simple service
    // each function returns a promise object 
    .factory('Points', function($http) {
        return {
            get : function() {
                return $http.get('/api/points');
            },
            create : function(pointData) {
		console.log("Angular pointService - create");
                return $http.post('/api/points', pointData);
            },
            delete : function(id) {
		console.log("Angular pointService - delete");
                return $http.delete('/api/points/' + id);
            }
        }
    });
