import './style.scss';
import type {
	ChildrenType,
	ClassNameType,
	ClickEventType,
	RefType
} from '@types';
import { createClasses, joinClassNames } from '@helpers';
import React, {
	createElement,
	forwardRef
} from 'react';
import { HTML } from '@constants';

type DefaultProps = {
	className?: ClassNameType;
	dataTestId?: string;
	isHidden?: boolean;
	isLoading?: boolean;
	isInvisible?: boolean;
};

type GenericProps = {
	type?:
	| 'abbr'
	| 'address'
	| 'area'
	| 'article'
	| 'aside'
	| 'audio'
	| 'b'
	| 'base'
	| 'bdi'
	| 'bdo'
	| 'blockquote'
	| 'body'
	| 'br'
	| 'canvas'
	| 'caption'
	| 'cite'
	| 'code'
	| 'col'
	| 'colgroup'
	| 'data'
	| 'datalist'
	| 'dd'
	| 'del'
	| 'details'
	| 'dfn'
	| 'dialog'
	| 'div'
	| 'dl'
	| 'dt'
	| 'em'
	| 'embed'
	| 'fieldset'
	| 'figcaption'
	| 'figure'
	| 'footer'
	| 'form'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'head'
	| 'header'
	| 'hr'
	| 'html'
	| 'i'
	| 'iframe'
	| 'img'
	| 'input'
	| 'ins'
	| 'kbd'
	| 'label'
	| 'legend'
	| 'li'
	| 'link'
	| 'main'
	| 'map'
	| 'mark'
	| 'meta'
	| 'meter'
	| 'nav'
	| 'noscript'
	| 'object'
	| 'ol'
	| 'optgroup'
	| 'option'
	| 'output'
	| 'p'
	| 'param'
	| 'picture'
	| 'pre'
	| 'progress'
	| 'q'
	| 'rp'
	| 'rt'
	| 'ruby'
	| 's'
	| 'samp'
	| 'script'
	| 'section'
	| 'select'
	| 'small'
	| 'source'
	| 'span'
	| 'strong'
	| 'style'
	| 'sub'
	| 'summary'
	| 'sup'
	| 'table'
	| 'tbody'
	| 'td'
	| 'template'
	| 'textarea'
	| 'tfoot'
	| 'th'
	| 'thead'
	| 'time'
	| 'title'
	| 'tr'
	| 'track'
	| 'u'
	| 'ul'
	| 'var'
	| 'video'
	| 'wbr';
};

type AnchorProps = {
	children: ChildrenType;
	onClick: ClickEventType;
	tag: 'a';
	url: string;
};

type ButtonProps = {
	children: ChildrenType;
	onClick: ClickEventType;
	tag: 'button';
};

type SvgProps = {
	height: string;
	tag: 'svg';
	viewBox: string;
	width: string;
};

type ImgProps = {
	alt: string;
	height?: string;
	src: string | ChildrenType;
	tag: 'img';
	width?: string;
};

type InputProps = {
	autoComplete?: | 'on' | 'off'
	name?: string;
	tag: 'input';
	type?:
	| 'text'
	| 'password'
	value: string;
};

type Props = DefaultProps & (
	| GenericProps
	| AnchorProps
	| ButtonProps
	| ImgProps
	| InputProps
	| SvgProps
) & React.ComponentPropsWithoutRef<any>;

const Element = forwardRef<RefType, Props>(({
	children,
	className,
	dataTestId,
	isHidden,
	isInvisible,
	tag,
	type,
	...other
}, ref?: RefType) => {
	if (isHidden) {
		return null;
	}

	const classes = createClasses({
		modifiers: [
			['invisible', isInvisible]
		],
		namespace: 'element',
	});

	const props = {
		className: joinClassNames([
			// classes.root,
			className,
			classes.modifiers.invisible,
		]),
		'data-testid': dataTestId,
		ref,
		type,
		...other,
	};

	if (tag === HTML.TAGS.IMG || tag === HTML.TAGS.INPUT) {
		return createElement(tag, props);
	}

	return createElement(
		tag,
		props,
		children,
	);
});

Element.defaultProps = {
	tag: HTML.TAGS.DIV,
};

Element.displayName = 'Element';

export default Element;
