import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { CartProvider } from '../context/CartContext';
import { useCartOperations } from '../hooks/useCartOperations';
import { useProductImage } from '../hooks/useProductImage';

// Image lookup is not what we are testing here.
vi.mock('../hooks/useProductImage', () => ({ useProductImage: vi.fn() }));

const product = { id: 1, name: 'Milk', price: 50, category: 'Dairy', stock: 10 };

// Tiny helper component so we can observe the real cart after clicking.
function CartCount() {
  const { itemCount } = useCartOperations();
  return <span data-testid="count">{itemCount}</span>;
}

function renderCard(p = product) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <ProductCard product={p} />
        <CartCount />
      </CartProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.mocked(useProductImage).mockReturnValue(null);
});

describe('ProductCard', () => {
  it('shows name, category and formatted price', () => {
    renderCard();
    expect(screen.getByText('Milk')).toBeInTheDocument();
    expect(screen.getByText('Dairy')).toBeInTheDocument();
    expect(screen.getByText('₹50.00')).toBeInTheDocument();
  });

  it('shows category initials when there is no image', () => {
    renderCard();
    expect(screen.getByText('DA')).toBeInTheDocument();
  });

  it('shows the image with alt text when one is available', () => {
    vi.mocked(useProductImage).mockReturnValue('/milk.jpg');
    renderCard();
    expect(screen.getByAltText('Milk')).toHaveAttribute('src', '/milk.jpg');
  });

  it('links to the product detail page', () => {
    renderCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/product/1');
  });

  it('adds the product to the cart when the button is clicked', async () => {
    renderCard();
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('disables the button when out of stock', () => {
    renderCard({ ...product, stock: 0 });
    const button = screen.getByRole('button', { name: /out of stock/i });
    expect(button).toBeDisabled();
  });
});
