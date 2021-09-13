import React, {
	MouseEventHandler,
	ReactChild,
	ReactNode,
	Ref,
	RefObject,
} from 'react';

export type ClassNameType = Array<string | [string, boolean]>;

export type ClickEventType = MouseEventHandler<HTMLButtonElement> | (() => void);

export type ChangeEventType = React.ChangeEvent<HTMLInputElement> | (() => void);

export type ScrollEventType = React.UIEvent<HTMLDivElement> | ((event?: any) => void);

export type ChildrenType = JSX.Element | ReactChild | ReactNode;

export type NodeType = ReactNode;

export type AdornmentsType = {
	start?: ChildrenType[];
	end?: ChildrenType[];
};

export type BreakpointsType = {
	xxs?: number;
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	xxl?: number;
};

export type SizeType = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ObjectType = {
	[key: string]: string;
};

export type RefType = Ref<any> | RefObject<any> | any | ObjectType;

export type StyleType = Record<string, number | string>;
