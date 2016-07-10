
/**
 * @param {string} path
 * @return {Object} require(path)
 */
function reload(path) {
	if (typeof(path) !== 'string') {
		throw new TypeError('path is not string.');
	}
	try {
		delete require.cache[require.resolve(path)];
	} catch(err) {
		console.log(err);
	} finally {
		return require(path);
	}
}

exports.reload = reload;
