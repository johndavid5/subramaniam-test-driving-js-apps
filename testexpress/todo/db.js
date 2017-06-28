var MongoClient = require('mongodb').MongoClient;

module.exports = {

	debug: false,

	connection: null,

	connect: function(dbname, callback){
		var sWho = "db::connect";

		var self = this;

		var cacheConnection = function doCacheConnection(err, db){
			var sWho = "doCacheconnection";

			if( this.debug ){
				console.log(sWho + "(): err = ", err );
			    console.log(sWho + "(): db = ", db );
			}

			self.connection = db;
			callback(null);
		};

		if( this.debug ){
			console.log(sWho + "(): Calling MongoClient.connect(dbname=", dbname, "...");
		}

		try {
			MongoClient.connect(dbname, cacheConnection);
		}
		catch(ex){
			if( this.debug ){
				console.log(sWho + "(): Caught exception: ex.constructor.name = ", ex.constructor.name );
				//console.log(sWho + "(): Caught exception:", ex );
			}
			callback(ex)
		}
	},

	get: function(){
		return this.connection;
	},

	close: function(){
		if( this.connection ){
			this.connection.close();
			this.connection = null;
		}
	},
};
