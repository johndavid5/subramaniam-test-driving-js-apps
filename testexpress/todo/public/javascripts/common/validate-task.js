var validateTask = function(task){
	return true;
};

// Only need module.exports for node,
// browser gets function through windows
// object... 
(typeof module !== 'undefined') &&
(module.exports = validateTask);
