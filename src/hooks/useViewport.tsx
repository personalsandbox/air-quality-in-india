import { getBreakpoints, getViewport } from '@helpers';
import { useEffect, useMemo, useState } from 'react';
import { BreakpointsType } from '@types';
import useWindowDimensions from './useWindowDimensions';

type Parameters = {
	breakpoints?: BreakpointsType;
};

const useViewport = (parameters?: Parameters) => {
	const breakpoints = useMemo(() => getBreakpoints(parameters?.breakpoints), [parameters?.breakpoints]);

	const { width } = useWindowDimensions();

	const viewport = useMemo(() => getViewport(width, breakpoints), [width, breakpoints]);

	const [viewportState, setViewportState] = useState(viewport);

	useEffect(() => {
		if (viewport !== viewportState) {
			setViewportState(viewport);
		}
	}, [width]);

	return viewportState;
};

export default useViewport;
