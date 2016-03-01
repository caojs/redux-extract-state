module.exports = function randomKey (prefix) {
	if (!prefix || typeof prefix !== 'string') {
		prefix = '@@extractState/';
	}
	return prefix + Math.random().toString().substr(2, 6);
}