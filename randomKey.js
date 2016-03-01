export default function (prefix) {
	if (typeof prefix !== 'string') {
		prefix = '@@EXTRACT_STATE_';
	}
	return prefix + Math.random().toString().substr(2, 6);
}