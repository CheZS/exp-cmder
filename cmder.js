
/**
 * @param {Object} req express request object
 * @param {Function} targetFunc
 * @return {Object[]} args
 */
function argParser(req, targetFunc) {
	var args = getArgs(targetFunc);
	var res = [];
	for (var i = 0; i < args.length; i++) {
		var param = req.body[args[i]];
		if (param) {
			res.push(param);
		} else {
			res.push(undefined);
		}
	}
	return res;
}

/**
 * @param {Function} func
 * @return {string[]} args' name
 */
function getArgs(func) {
	// match function(args)
	var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

	return args.split(",").map(function(arg) {
		// replace /* comments */
		return arg.replace(/\/\*.*\*\//, "").trim();
	}).filter(function(arg) {
		// filter undefineds arg
		return arg;
	});
}

/**
 * @param {Object} req express request object
 * @param {Function} targetFunc
 * @return void
 */
function cmder(req, targetFunc) {
	if (typeof(targetFunc) !== 'function') {
		return;
	}
	var args = argParser(req, targetFunc);
	targetFunc.apply(this, args);
}

exports.cmder = cmder;
