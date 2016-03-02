var path = require('path');
module.exports = {
	resolve: {
		alias: {
			'redux-extract-state$': path.resolve(__dirname, '../../src'),
			'redux-extract-state/randomKey': path.resolve(__dirname, '../../randomKey.js')
		}
	},
	module: {
		noParse: [/dist\/main.js$/],
		loaders: [
			{
	      test: /\.jsx?$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel', // 'babel-loader' is also a legal name to reference
	      query: {
	        presets: ['react', 'es2015', 'stage-2']
	      }
	    }
		]
	}
}
