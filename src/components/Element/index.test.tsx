import { getByTestId, render, screen } from '@testing-library/react';
import Element from './index';
import React from 'react';

const defaultProps = {
	dataTestId: 'test-element',
};

describe('<Element />', () => {
	test('It should render component', () => {
		const { container } = render(<Element {...defaultProps} />);
		const component = getByTestId(container, 'test-element');

		expect(component).toBeInTheDocument();
	});

	test('It should render with text', () => {
		const text = 'Hello world, this is a dummy text.';

		const { rerender } = render(<Element {...defaultProps} />);
		const component = screen.getByTestId('test-element');

		rerender(<Element {...defaultProps}>{text}</Element>);

		expect(component).toHaveTextContent(text);
	});

	test('It should render with custom class', () => {
		const className = 'custom-class-101';

		const { container } = render(<Element {...defaultProps} className={className} />);
		const component = getByTestId(container, 'test-element');

		expect(component).toHaveClass(className);
	});
});
