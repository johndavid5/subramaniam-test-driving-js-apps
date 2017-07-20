var express = require('express');
var router = express.Router();
var task = require('../models/task'); 

/* GET home page. */
router.get('/', function(req, res, next){
	task.all(function(err, tasks){
		res.send(tasks);
	});
});

router.get('/:id', undefined );

module.exports = router;
