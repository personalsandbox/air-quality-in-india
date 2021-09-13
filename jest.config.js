/* eslint-disable sort-keys */
module.exports = {
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
	],
	coverageDirectory: 'coverage',
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		}
	},
	moduleDirectories: [
		'<rootDir>/node_modules',
		'<rootDir>/src',
	],
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
	moduleNameMapper: {
		'^@components$': '<rootDir>/src/components',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@constants$': '<rootDir>/src/constants',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@helpers$': '<rootDir>/src/helpers',
		'^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^@hooks$': '<rootDir>/src/hooks',
		'^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^@store$': '<rootDir>/src/store',
		'^@store/(.*)$': '<rootDir>/src/store/$1',
		'^@templates$': '<rootDir>/src/templates',
		'^@templates/(.*)$': '<rootDir>/src/templates/$1',
		'^@types$': '<rootDir>/src/@types',
		'^@types/(.*)$': '<rootDir>/src/@types/$1',
		'^@views$': '<rootDir>/src/views',
		'^@views/(.*)$': '<rootDir>/src/views/$1',
		'^@src$': '<rootDir>/src',
		'^@src/(.*)$': '<rootDir>/src/$1',
		'^@$': '<rootDir>',
		'^@/(.*)$': '<rootDir>/$1',
		//
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy'
	},
	rootDir: './',
	setupFilesAfterEnv: [
		'<rootDir>/jest.setup.ts'
	],
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: [
		'<rootDir>/dist',
		'<rootDir>/node_modules',
		'<rootDir>/coverage',
		'<rootDir>/public',
	],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest',
	},
};
