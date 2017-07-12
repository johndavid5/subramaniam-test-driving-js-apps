var validateTask = function(task){
	if(
		task && task.name
		&& task.month && !isNaN(task.month)
		&& task.day && !isNaN(task.day)
		&& task.year && !isNaN(task.year)
	){
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
