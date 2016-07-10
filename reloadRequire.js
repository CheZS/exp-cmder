
/**
 * @param {string} oldPath
 * @param {string} newPath
 * @return {Object} require(newPath)
 */
function reload(oldPath, newPath) {
	if (typeof(newPath) !== 'string') {
		throw new TypeError('newPath is not string.');
	}
	if (typeof(oldPath) !== 'string') {
		throw new TypeError('oldPath is not string.');
	}
	try {
		delete require.cache[require.resolve(oldPath)];
	} catch(err) {
		console.log(err);
	} finally {
		return require(newPath);
	}
}

exports.reload = reload;
