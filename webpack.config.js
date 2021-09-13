const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const getPath = (x) => path.resolve(__dirname, x);

// DIRECTORIES/PATHS
const PATHS = {
	DIST: {
		DIR: getPath('./dist/'),
	},
	NODE_MODULES: {
		DIR: getPath('./node_modules/'),
	},
	PUBLIC: {
		DIR: getPath('./public/'),
		FILE: getPath('./public/index.html'),
	},
	SRC: {
		ASSETS: {
			DIR: getPath('./src/assets'),
		},
		COMPONENTS: {
			DIR: getPath('./src/components'),
		},
		CONSTANTS: {
			DIR: getPath('./src/constants'),
		},
		CONTAINERS: {
			DIR: getPath('./src/containers'),
		},
		DATA: {
			DIR: getPath('./src/data'),
		},
		DIR: getPath('./src'),
		FILE: getPath('./src/index.tsx'),
		HELPERS: {
			DIR: getPath('./src/helpers'),
		},
		HOOKS: {
			DIR: getPath('./src/hooks'),
		},
		MODELS: {
			DIR: getPath('./src/models'),
		},
		SERVICES: {
			DIR: getPath('./src/services'),
		},
		STORE: {
			DIR: getPath('./src/store'),
		},
		TEMPLATES: {
			DIR: getPath('./src/templates'),
		},
		VIEWS: {
			DIR: getPath('./src/views'),
		},
	},
};

module.exports = {
	devServer: {
		compress: true,
		historyApiFallback: true,
		// host: '0.0.0.0',
		hot: true,
		port: 3000,
		static: {
			directory: path.join(__dirname, 'public'),
			publicPath: '/',
			serveIndex: true,
			watch: true,
		},
	},
	devtool: 'inline-source-map',
	entry: [
		require.resolve('core-js/stable'),
		require.resolve('regenerator-runtime/runtime'),
		PATHS.SRC.FILE,
	],
	module: {
		rules: [
			{
				exclude: PATHS.NODE_MODULES.DIR,
				include: PATHS.SRC.DIR,
				test: /\.(js|ts)x?$/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				exclude: [
					PATHS.NODE_MODULES.DIR,
					/\.(ts|tsx|js|jsx)$/,
					/\.html$/,
					/\.json$/,
				],
				include: PATHS.SRC.DIR,
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
				use: {
					loader: require.resolve('file-loader'),
					options: {
						limit: 10000,
						name: 'static/media/[name].[hash:8].[ext]',
					},
				},
			},
			{
				exclude: PATHS.NODE_MODULES.DIR,
				include: PATHS.SRC.DIR,
				test: /\.css$/,
				use: [
					// CONVERT CSS TO BE INJECTED AS <STYLE>
					require.resolve('style-loader'),
					{
						// RESOLVE PATHS IN CSS AND ADDS ASSETS AS DEPENDENCIES
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 1,
						},
					},
					{
						// APPLY AUTOPREFIXER TO CSS
						loader: require.resolve('postcss-loader'),
						options: {
							ident: 'postcss',
							map: true,
						},
					},
				],
			},
			{
				exclude: PATHS.NODE_MODULES.DIR,
				include: PATHS.SRC.DIR,
				test: /\.scss$/i,
				use: [
					// CREATES `STYLE` NODES FROM JS STRINGS
					{
						loader: require.resolve('style-loader'),
					},
					// TRANSLATES CSS INTO COMMONJS
					{
						loader: require.resolve('css-loader'),
					},
					// COMPILES SASS TO CSS
					{
						loader: require.resolve('sass-loader'),
					},
				],
			},
			{
				exclude: PATHS.NODE_MODULES.DIR,
				loader: 'html-loader',
				test: /\.html$/,
			},
		],
	},
	output: {
		filename: '[name].bundle.js',
		path: PATHS.DIST.DIR,
		publicPath: '/',
	},
	plugins: [
		new ESLintPlugin({
			cache: true,
			eslintPath: require.resolve('eslint'),
			failOnError: true,
			formatter: require.resolve('react-dev-utils/eslintFormatter'),
			resolvePluginsRelativeTo: __dirname,
			useEslintrc: true,
		}),
		new HtmlWebpackPlugin({
			hash: true,
			inject: true,
			template: PATHS.PUBLIC.FILE,
		}),
	],
	resolve: {
		alias: {
			'@assets': PATHS.SRC.ASSETS.DIR,
			'@components': PATHS.SRC.COMPONENTS.DIR,
			'@constants': PATHS.SRC.CONSTANTS.DIR,
			'@data': PATHS.SRC.DATA.DIR,
			'@helpers': PATHS.SRC.HELPERS.DIR,
			'@hooks': PATHS.SRC.HOOKS.DIR,
			'@views': PATHS.SRC.VIEWS.DIR,
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
};
