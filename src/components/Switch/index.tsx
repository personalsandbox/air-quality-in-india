import './style.scss';
import type { ClassNameType, ClickEventType } from '@types';
import { createClasses } from '@helpers';
import Element from '../Element';
import React from 'react';

type Props = {
	classNames?: {
		button?: ClassNameType;
		control?: ClassNameType;
		input?: ClassNameType;
		root?: ClassNameType;
		thumb?: ClassNameType;
	};
	isChecked: boolean;
	isDisabled?: boolean;
	onChange?: any;
};

const Switch:React.FC<Props> = ({
	classNames,
	isChecked,
	isDisabled,
	onChange,
}) => {
	const hasOnChange = onChange instanceof Function;

	const classes = createClasses({
		children: [
			'control',
			'thumb',
		],
		modifiers: [
			['checked', isChecked],
			['disabled', isDisabled],
		],
		namespace: 'switch',
	});

	const handleClick: ClickEventType = () => {
		if (hasOnChange) {
			onChange(!isChecked);
		}
	};

	return (
		<Element
			className={[
				classes.root,
				classes.modifiers.checked,
				classes.modifiers.disabled,
				classNames?.root,
			]}
			onClick={isDisabled ? undefined : handleClick}
		>
			<Element className={[classes.thumb]} />
		</Element>
	);
};

Switch.defaultProps = {};

Switch.displayName = 'Switch';

export default Switch;
