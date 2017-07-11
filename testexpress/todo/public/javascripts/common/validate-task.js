var validateTask = function(task){
	if( task && task.name ){
		return true;
	}
	else {
		return false;
	}
};

// Only need module.exports for node,
// browser gets function through windows
// object... 
(typeof module !== 'undefined') &&
(module.exports = validateTask);
