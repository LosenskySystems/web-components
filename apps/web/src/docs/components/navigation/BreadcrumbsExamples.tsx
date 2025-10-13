import { Breadcrumbs } from '@losensky-systems/web-components-core';

// Icons as React components
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ProductsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const ElectronicsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const LaptopIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export const BasicBreadcrumbsExample = () => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <Breadcrumbs>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products/electronics">Electronics</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Laptop</Breadcrumbs.Item>
    </Breadcrumbs>
  </div>
);

export const BreadcrumbsWithIconsExample = () => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <Breadcrumbs>
      <Breadcrumbs.Item href="/" icon={<HomeIcon />}>
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products" icon={<ProductsIcon />}>
        Products
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products/electronics" icon={<ElectronicsIcon />}>
        Electronics
      </Breadcrumbs.Item>
      <Breadcrumbs.Item active icon={<LaptopIcon />}>
        Laptop
      </Breadcrumbs.Item>
    </Breadcrumbs>
  </div>
);

export const BreadcrumbsSeparatorExample = () => {
  const greaterThan = '>';
  
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="text-sm text-gray-600 mb-2">Using &gt; separator</p>
        <Breadcrumbs separator={greaterThan}>
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products/electronics">Electronics</Breadcrumbs.Item>
          <Breadcrumbs.Item active>Laptop</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Using "•" separator</p>
        <Breadcrumbs separator="•">
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item active>Laptop</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Using custom icon separator</p>
        <Breadcrumbs separator={<ChevronRightIcon />}>
          <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
          <Breadcrumbs.Item active>Laptop</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  );
};

export const BreadcrumbsSizeExample = () => (
  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
    <div>
      <p className="text-sm text-gray-600 mb-2">Small size</p>
      <Breadcrumbs size="sm">
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
        <Breadcrumbs.Item active>Laptop</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
    <div>
      <p className="text-sm text-gray-600 mb-2">Medium size (default)</p>
      <Breadcrumbs size="md">
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
        <Breadcrumbs.Item active>Laptop</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
    <div>
      <p className="text-sm text-gray-600 mb-2">Large size</p>
      <Breadcrumbs size="lg">
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
        <Breadcrumbs.Item active>Laptop</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  </div>
);

export const BreadcrumbsMaxItemsExample = () => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <Breadcrumbs maxItems={3}>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products/electronics">Electronics</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products/electronics/laptops">Laptops</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products/electronics/laptops/gaming">Gaming</Breadcrumbs.Item>
      <Breadcrumbs.Item active>High-End Gaming Laptop</Breadcrumbs.Item>
    </Breadcrumbs>
  </div>
);

export const BreadcrumbsClickableExample = () => {
  const handleNavigate = (path: string) => {
    console.log('Navigate to:', path);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={() => handleNavigate('/')}>
          Home
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => handleNavigate('/products')}>
          Products
        </Breadcrumbs.Item>
        <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
};

export const BreadcrumbsDisabledExample = () => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <Breadcrumbs>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item disabled>Disabled Item</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>
  </div>
);
