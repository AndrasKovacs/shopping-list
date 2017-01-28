module.exports = {
   context: __dirname + "/src",
   entry: './main.jsx',
	
   output: {
      path: __dirname,
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },

   devtool: 'cheap-module-eval-source-map',
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
         }
      ]
   }
}
