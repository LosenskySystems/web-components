import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../index';

describe('Card Component', () => {
  test('renders with basic content', () => {
    render(
      <Card>
        <Card.Body>
          <p>Test content</p>
        </Card.Body>
      </Card>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Test content').closest('.web-card')).toHaveClass('web-card', 'web-card-default', 'web-card-md');
  });

  test('applies different variants', () => {
    const { rerender } = render(<Card variant="outlined">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-outlined');

    rerender(<Card variant="elevated">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-elevated');
  });

  test('applies different sizes', () => {
    const { rerender } = render(<Card size="sm">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-sm');

    rerender(<Card size="lg">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-lg');
  });

  test('renders compound components', () => {
    render(
      <Card>
        <Card.Header title="Test Title" subtitle="Test Subtitle">
          <p>Header content</p>
        </Card.Header>
        <Card.Body>
          <p>Body content</p>
        </Card.Body>
        <Card.Footer>
          <p>Footer content</p>
        </Card.Footer>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Header content')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  test('handles click events when clickable', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(
      <Card clickable onClick={handleClick}>
        <Card.Body>
          <p>Clickable card</p>
        </Card.Body>
      </Card>
    );
    
    await user.click(screen.getByText('Clickable card').closest('.web-card')!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies hover class when hover prop is true', () => {
    render(<Card hover>Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-hover');
  });

  test('applies custom className', () => {
    render(<Card className="custom-class">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('custom-class');
  });

  test('renders with different padding options', () => {
    const { rerender } = render(<Card padding="sm">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-padding-sm');

    rerender(<Card padding="lg">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-padding-lg');
  });

  test('renders with different rounded options', () => {
    const { rerender } = render(<Card rounded="sm">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-rounded-sm');

    rerender(<Card rounded="xl">Test</Card>);
    expect(screen.getByText('Test').closest('.web-card')).toHaveClass('web-card-rounded-xl');
  });

  test('renders Card.Actions with different alignments', () => {
    const { rerender } = render(
      <Card>
        <Card.Body>Test</Card.Body>
        <Card.Actions align="left">
          <button>Action</button>
        </Card.Actions>
      </Card>
    );
    expect(screen.getByText('Action').closest('.web-card-actions')).toHaveClass('web-card-actions-align-left');

    rerender(
      <Card>
        <Card.Body>Test</Card.Body>
        <Card.Actions align="center">
          <button>Action</button>
        </Card.Actions>
      </Card>
    );
    expect(screen.getByText('Action').closest('.web-card-actions')).toHaveClass('web-card-actions-align-center');
  });
});
