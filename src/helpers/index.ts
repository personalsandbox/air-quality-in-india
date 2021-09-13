import type {
	BreakpointsType,
	ClassNameType,
} from '@types';
import { MEASUREMENTS, REGEX } from '@constants';
import _isArray from 'lodash/isArray';
import _isBoolean from 'lodash/isBoolean';
import _isNil from 'lodash/isNil';
import _isString from 'lodash/isString';

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const splitCamelCaseString = (string: string, splitter: string): string => string?.replace(
	REGEX.CAMEL_CASE, `$1${splitter}`
).toLowerCase();

export const hyphenateCamelCaseString = (string: string): string => splitCamelCaseString(string, '-');

export const flattenDeepKeyValue = (arr: any[]) => {
	if (!_isNil(arr) && _isArray(arr) && arr.length) {
		return arr.reduce((accumulator, current) => {
			if (!_isNil(current) && _isArray(current) && current.length) {
				// TODO: THIS SHOULD MOVE TO ITS OWN FUNCTION
				// KEY/VALUE PAIR
				const [key, value] = current;
				if (!_isNil(key) && !_isNil(value) && _isBoolean(value)) {
					// IF VALUE IS TRUE
					if (value) {
						return accumulator.concat(key);
					}
					// IF VALUE IS FALSE
					return accumulator.concat([]);
				}
				return accumulator.concat(flattenDeepKeyValue(current));
			}
			return accumulator.concat(current);
		}, []);
	}
	return [];
};

export const joinClassNames = (arr: ClassNameType) => flattenDeepKeyValue(arr)
	.join(' ')
	.replace(REGEX.MULTIPLE_WHITESPACE, ' ')
	.trim();

// TO DETERMINE IF IT IS A CSR OR SSR
export const isClient = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const getBreakpoints = (breakpoints?: BreakpointsType) => {
	if (_isNil(breakpoints)) {
		const newBreakpoints = {};

		Object.entries(MEASUREMENTS.BREAKPOINTS).forEach(([key, value]) => {
			newBreakpoints[key.toLowerCase()] = value;
		});

		return newBreakpoints;
	}

	const newBreakpoints = {};

	Object.entries(MEASUREMENTS.BREAKPOINTS).forEach(([KEY, VALUE]) => {
		const customBreakpoint = breakpoints[KEY.toLowerCase()];

		newBreakpoints[KEY.toLowerCase()] = _isNil(customBreakpoint)
			? VALUE
			: customBreakpoint;
	});

	return newBreakpoints;
};

export const getViewport = (width: number, breakpoints: BreakpointsType) => {
	// NOTE: DO NOT CONVERT TO switch () SINCE ENGINE HAS TO COMPARE THE VALUE TWICE FOR EACH CASE
	if (width >= breakpoints?.xxl) {
		return MEASUREMENTS.SIZES.XXL;
	}
	if (width >= breakpoints?.xl) {
		return MEASUREMENTS.SIZES.XL;
	}
	if (width >= breakpoints?.lg) {
		return MEASUREMENTS.SIZES.LG;
	}
	if (width >= breakpoints?.md) {
		return MEASUREMENTS.SIZES.MD;
	}
	if (width >= breakpoints?.sm) {
		return MEASUREMENTS.SIZES.SM;
	}
	if (width >= breakpoints?.xs) {
		return MEASUREMENTS.SIZES.XS;
	}
	if (width < breakpoints?.xxs) {
		return MEASUREMENTS.SIZES.XXS;
	}
	return MEASUREMENTS.SIZES.XXS;
};

export const createClasses = ({
	children,
	modifiers,
	namespace,
}: {
	children?: Array<string>;
	modifiers?: Array<[string, boolean]>;
	namespace: string;
}): Record<string, any> => {
	if (_isNil(namespace)) {
		return null;
	}

	const namespaceClass = hyphenateCamelCaseString(namespace);

	const childSplitter = '__';
	const modifierSplitter = '--';

	const childPrefix = `${namespaceClass}${childSplitter}`;
	const modifierPrefix = `${namespaceClass}${modifierSplitter}`;

	const childrenClasses: {
		[key: string]: string;
	} = {};

	const modifiersClasses: {
		[key: string]: string;
	} = {};

	if (!_isNil(children) && _isArray(children)) {
		children.forEach((x) => {
			childrenClasses[x] = `${childPrefix}${hyphenateCamelCaseString(x)}`;
		});
	}

	if (!_isNil(modifiers) && _isArray(modifiers)) {
		modifiers.forEach((x) => {
			const [className, condition] = x;
			if (className && _isString(className) && condition) {
				modifiersClasses[className] = `${modifierPrefix}${hyphenateCamelCaseString(className)}`;
			}
		});
	}

	const modifiersListClasses: string[] = Object.values(modifiersClasses);

	return {
		modifiers: modifiersClasses,
		modifiersList: modifiersListClasses,
		namespace: namespaceClass,
		root: namespaceClass,
		...childrenClasses,
	};
};
