module.exports = {
	entry: './src/index.js',
	output: {
		path: 'dist/',
		filename: 'main.js',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
		      test: /\.jsx?$/,
		      exclude: /(node_modules|bower_components)/,
		      loader: 'babel',
		      query: {
		        presets: ['es2015', 'stage-2']
		      }
		    }
		]
	}
}