const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/main.js',
    shop: './src/js/shop.js',
    exercises: './src/js/loadExercises.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true, // Limpia todo lo que no se use de la carpeta dist
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // {
      //   test: /\.html$/,
      //   use: ['html-loader'], // Recorre todo el html y si encuentra algún recurso como imágenes lo importa al output
      // },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/[hash][ext]',
      //   },
      // },
      // {
      //   test: /\.webp$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/[hash][ext]',
      //   },
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/landing.html',
      filename: 'landing.html',
      title: 'WorkoutWizard',
    }),
    new HtmlWebpackPlugin({
      template: './src/shop.html',
      filename: 'shop.html',
      title: 'Shop',
    }),
    new HtmlWebpackPlugin({
      template: './src/api_exercises.html',
      filename: 'exercises.html',
      title: 'Exercises',
    }),
  ],
};
