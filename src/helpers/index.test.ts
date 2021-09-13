import { capitalizeFirstLetter } from './index';

describe('capitalizeFirstLetter', () => {
	it('should capitalize the first letter', () => {
		expect(capitalizeFirstLetter('hello')).toBe('Hello');
	});
});
