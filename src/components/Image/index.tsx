import './style.scss';
import { ChildrenType, ClassNameType } from '@types';
import _isNil from 'lodash/isNil';
import { createClasses } from '@helpers';
import Element from '../Element';
import { HTML } from '@constants';
import React from 'react';

type Props = {
	alt: string;
	className?: ClassNameType;
	classNames?: {
		image?: ClassNameType;
		root?: ClassNameType;
	};
	height?: number;
	overlayOpacity?: number;
	size?: string;
	src: string | ChildrenType;
	width?: number;
	withOverlay?: boolean;
};

const Image: React.FC<Props> = ({
	alt,
	className,
	classNames,
	height,
	overlayOpacity,
	size,
	src,
	width,
	withOverlay,
}) => {
	const classes = createClasses({
		children: [
			'image',
			'overlay',
		],
		modifiers: [
			[size, !_isNil(size)],
			['autoHeight', !_isNil(width) && _isNil(height)],
			['autoWidth', !_isNil(height) && _isNil(width)],
		],
		namespace: 'image',
	});

	return (
		<Element
			className={[
				classes.root,
				classes.modifiersList,
				className,
				classNames?.root
			]}
			style={{
				height,
				width,
			}}
		>
			{
				withOverlay && (
					<Element
						className={[classes.overlay]}
						style={{
							opacity: overlayOpacity,
						}}
					/>
				)

			}
			<Element
				alt={alt}
				className={[
					classes.image,
					classNames?.image,
				]}
				src={src}
				tag={HTML.TAGS.IMG}
			/>
		</Element>
	);
};

Image.defaultProps = {};

Image.displayName = 'Image';

export default Image;
