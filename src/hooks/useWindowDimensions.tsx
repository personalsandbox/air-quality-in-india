import {
	useLayoutEffect,
	useState,
} from 'react';
import { isClient } from '@helpers';

const useWindowDimensions = () => {
	if (!isClient()) {
		return {
			height: 0,
			width: 0,
		};
	}

	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	useLayoutEffect(() => {
		const handleResize = () => {
			if (window?.innerHeight !== dimensions.height || window?.innerWidth !== dimensions.width) {
				setDimensions({
					height: window.innerHeight,
					width: window.innerWidth,
				});
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return dimensions;
};

export default useWindowDimensions;
