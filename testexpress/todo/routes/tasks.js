var express = require('express');
var router = express.Router();
var task = require('../models/task'); 

/* GET home page. */
router.get('/', function(req, res, next){
	task.all(function(err, tasks){
		res.send(tasks);
	});
});

router.get('/:id', function(req, res, next){
	task.get( req.params.id, function(err, task){
		if( task ){
			res.send(task);
		}
		else{
			// Send back friendly empty object instead of null...
			res.send({});
		}
	});	
});

router.post('/', undefined ); 

module.exports = router;
