// load the Point model
var Point = require('./models/point');


// --------------------------------------------------------------------------------------------------------------------------------------------
// Resources
// --------------------------------------------------------------------------------------------------------------------------------------------

// expose the routes to our app with module.exports
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all points
	app.get('/api/points', function(req, res) {
		// use mongoose to get all points in the database
		Point.find(function(err, points) {

		    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		    if (err)
			res.send(err)

		    res.json(points); // return all points in JSON format
		});
	});

	// create a Point and send back all Points after creation
	app.post('/api/points', function(req, res) {
		 // Check if have more than 10 points delete all
		 Point.find(function(err, points) {
			if (err)
			    res.send(err);
			var size = points.length;
			console.log(size);
			if (points.length >= 9)
			{
				Point.remove({}, function(err) {
					if (err) {
						console.log(err)
					} 
				});
			}
			
		});
		
		// create a point, information comes from AJAX request from Angular
		Point.create({    
		    latitude : req.body.latitude,
		    longitude : req.body.longitude,
		}, function(err, point) {
		    if (err)
			res.send(err);

		    // get and return all the points after you create another
		    Point.find(function(err, points) {
			if (err)
			    res.send(err)			
			res.json(points);			
		    });
		});

	});

	// delete a point
	app.delete('/api/points/:point_id', function(req, res) {
		Point.remove({
		    _id : req.params.point_id
		}, function(err, point) {
		    if (err)
			res.send(err);

		    // get and return all the points after you create another
		    Point.find(function(err, points) {
			if (err)
			    res.send(err)
			res.json(points);
		    });
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

};
