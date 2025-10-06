import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../index';

describe('Button Component', () => {
  test('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('applies default classes', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('web-btn', 'web-btn-primary', 'web-btn-md');
  });

  test('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders different variants', () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('web-btn-secondary');

    rerender(<Button variant="outline">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('web-btn-outline');
  });

  test('renders different sizes', () => {
    const { rerender } = render(<Button size="sm">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('web-btn-sm');

    rerender(<Button size="lg">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('web-btn-lg');
  });

  test('renders disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('web-btn-disabled');
  });

  test('renders loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('web-btn-loading');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders as link when href is provided', () => {
    render(<Button href="/test">Link Button</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('web-btn');
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  test('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not call onClick when loading', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick} loading>Loading</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
