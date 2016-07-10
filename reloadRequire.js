
/**
 * @param {string} path
 * @return {Object} require(path)
 */
function reload(path) {
	if (typeof(path) !== 'string') {
		throw new TypeError('path is not string.');
	}
	try {
		var absPath = require.resolve(path);
		var module = require.cache[absPath];
		if (module && module.parent) {
			module.parent.children.splice(module.parent.children.indexOf(module), 1);
		}
		delete require.cache[absPath];
	} catch(err) {
		console.log(err);
	} finally {
		return require(path);
	}
}

exports.reload = reload;
