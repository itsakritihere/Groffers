# The Groffers— E-Commerce SPA

Groffers is a responsive e-commerce single-page application built with React.
The project focuses on a clean shopping flow, reusable components, client-side routing, and proper state management for products and cart operations.

## Live Demo

**Live Website:** https://groffers.vercel.app/

## Features

* Browse products by category
* View individual product details
* Dynamic product routes
* Add products to the cart
* Increase or decrease product quantity
* Remove products from the cart
* Cart state persists after page refresh
* Responsive layout for different screen sizes
* Reusable React components
* Product image handling
* Client-side routing with React Router
* Loading and error states for product fetching

## Tech Stack

* **React**
* **Vite**
* **JavaScript**
* **React Router**
* **Context API**
* **useReducer**
* **Custom React Hooks**
* **CSS**
* **Vitest**
* **React Testing Library**
* **Oxlint**

## Project Structure

```text
groffers/
├── .github/workflows/ci.yml
├── src/
│   ├── components/ProductCard.jsx + ProductCard.test.jsx + Footer.jsx + Navbar.jsx
│   ├── context/CartContext.jsx + CartContext.test.jsx
│   ├── hooks/ (ProductCard.test.jsx + useCartOperations.js + useCartOperations.test.jsx +    useProductFetcher.js + useProductFetcher.test.js + useProductImage.js)
    ├─ pages/ Catalog.jsx + Catalog.jsx + Home.jsx + ProductDetail.jsx
│   ├── config.js
│   └── setupTests.js
├── .dockerignore
├── .env            (not committed)
├── .env.example
├── .gitignore
├── Dockerfile
├── nginx.conf
├── vercel.json
├── index.html
├── README.md
├── package-lock.json
├── dockerignore
├── .oxlintrc.json
├── vite.config.js
└── package.json
```

## State Management

The cart is managed using React's Context API and `useReducer`.

The cart state and dispatch functions are separated into contexts so that components can access only the part of the state they need.

Cart operations such as:

* Adding an item
* Removing an item
* Updating quantity
* Clearing the cart

are handled through reducer actions.

Cart data is also stored in Local Storage so that the cart remains available after refreshing the page.

## Product Data

The application currently works with locally generated product data.

Products contain information such as:

* Product ID
* Name
* Category
* Material
* Price
* Stock
* Rating
* Description

This makes it possible to work with a larger product catalogue without requiring a backend service for the project.

## Routing

React Router is used for navigation between pages.

Example routes include:

```text
/
 /products
 /product/:id
 /cart
 /checkout
```

Product pages use dynamic routing so that each product can be accessed using its individual ID.

## Custom Hooks

Some application logic is separated into custom hooks to keep components easier to read and maintain.

Examples include:

```text
useProductFetcher
useProductImage
useCartOperations
```

This keeps fetching, image handling, and cart operations separate from the UI components.

## Testing

The project uses **Vitest** and **React Testing Library** for automated testing.

Current test suites cover:

* Product fetching
* Cart context
* Cart operations
* Product card behaviour

### Current Test Result

```text
Test Files: 4 passed
Tests:      29 passed
```

Run the tests with:

```bash
npm test
```

## Code Quality

Oxlint is used to check the codebase for common issues.

Run:

```bash
npm run lint
```

The current project completes linting with **0 errors**. There are a few non-blocking React/lint warnings that can be addressed during further refinement.

## Production Build

The project uses Vite for the production build.

To create a production build:

```bash
npm run build
```

The current production build completes successfully.

```text
✓ 51 modules transformed
✓ Production build completed
```

The generated production files are placed inside the `dist` directory.

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/itsakritihere/Groffers
```

### 2. Open the project

```bash
cd nexora
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL in the terminal.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run Oxlint
npm test         # Run automated tests
```

## Performance

Some basic performance optimizations have been applied during development, including:

* Optimized image assets
* Reusable components
* Client-side routing
* Local product data
* Avoiding unnecessary duplication of UI logic

Performance was also checked during development using browser developer tools and Lighthouse.

## Deployment

The application is deployed using Vercel.

Every production build is generated using:

```bash
npm run build
```

The application is a client-side React application, so SPA routing needs to be configured correctly when deploying.

## What I Learned

This project helped me understand how a React application can be structured beyond individual components.

Some of the main things I worked with were:

* React component architecture
* React Router and dynamic routes
* Context API and `useReducer`
* Custom hooks
* Local Storage
* Reusable product components
* Automated testing
* Handling loading and error states
* Production builds with Vite
* Deploying a React SPA

## Future Improvements

Some things that could be added later include:

* Backend API integration
* User authentication
* Real payment integration
* Server-side product management
* Product search and advanced filtering
* Order history
* A proper database

## Author

**Akriti Chauhan**

B.Tech — Electronics and Communication Engineering

---

This project was built as part of my hands-on learning and development work with React and modern frontend practices.
