var db = require('../db');
var ObjectId = require('mongodb').ObjectId;

var collectionName = 'tasks';

var validateTask = require('../public/javascripts/common/validate-task');

module.exports = {
	all: function(callback){
		db.get().collection(collectionName).find().toArray(callback);
	},

	get: function(taskId, callback){
		db.get().collection(collectionName).find({'_id': new ObjectId(taskId)}).limit(1).next(callback);
	},

	add: function(newTask, callback){

		var found = function(err, task){

			// 1943-05-28 BACK FROM THE FRONT,
			// featuring Moe, Larry and Curly
			// http://www.threestooges.net/filmography/episode/70
			//
			// MOE: "If we're discovered, we're lost!"
			// CURLY: "You're crazy... if we're discovered, we're FOUND!"/
			if(task){
				callback(new Error('duplicate task'));
			}
			else{
				db.get().collection(collectionName).insertOne(newTask, callback);
			}
		};/* found() */


		if( this.validate(newTask) ){
			db.get().collection(collectionName).find(newTask).limit(1)
			.next(found);
		}
		else{
			callback( new Error('D\'oh!  Unable to add task.') );
		}
	},

	delete: function(taskId, callback){
		var handleDelete = function(err, result){
			if( result.deletedCount != 1 ){
				callback(new Error("unable to delete task with id: " + taskId));
			}
			else {
				// null means success...
				callback(null);
			}
		};

		db.get().collection(collectionName)
		.deleteOne(
			{'_id': new ObjectId(taskId)},
			handleDelete
		 );
	},

	// Delegate validation to method common to client and server...
	validate: validateTask,
};
