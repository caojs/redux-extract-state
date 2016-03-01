module.exports = {
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