# React ShopView

A modern e-commerce product browsing application built with React, TypeScript, Redux Toolkit, and SCSS.

## Project Description

React ShopView is a single-page application that allows users to browse, filter, sort, and paginate through a product catalog. The application features:

- **Authentication**: Secure login system with protected routes
- **Product Catalog**: Browse products fetched from DummyJSON API
- **Advanced Filtering**: Search by name, filter by price range and availability
- **Sorting**: Sort products by price (ascending/descending) or name
- **Pagination**: Client-side pagination with 12 products per page
- **Responsive Design**: Fully responsive layout for mobile and desktop

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript (strict mode)
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **SCSS** - CSS preprocessor
- **Fetch API** - HTTP requests
- **Vite** - Build tool and dev server

## Login Credentials

- **Username**: `Admin`
- **Password**: `123456`

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm (v6 or higher)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000` (or the port shown in the terminal)

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
 ├── app/                    # Redux store configuration
 │    ├── store.ts          # Redux store setup
 │    ├── hooks.ts          # Typed Redux hooks
 │    └── rootReducer.ts    # Root reducer combining all slices
 ├── features/              # Feature-based modules
 │    ├── auth/            # Authentication feature
 │    │    ├── authSlice.ts
 │    │    └── Login.tsx
 │    ├── products/        # Products feature
 │    │    ├── productsSlice.ts
 │    │    ├── productsSelectors.ts
 │    │    └── Products.tsx
 │    └── filters/         # Filters feature
 │         └── filtersSlice.ts
 ├── components/           # Reusable components
 │    ├── Header/
 │    ├── Sidebar/
 │    ├── Layout/
 │    ├── Filters/
 │    ├── ProductCard/
 │    └── Pagination/
 ├── pages/                # Page components
 │    ├── Home.tsx
 │    └── ProtectedRoute.tsx
 ├── styles/               # SCSS stylesheets
 │    ├── _variables.scss
 │    ├── _mixins.scss
 │    ├── main.scss
 │    └── components/
 ├── types/                # TypeScript type definitions
 │    └── product.ts
 ├── App.tsx               # Main app component with routing
 └── main.tsx              # Application entry point
```

## Key Features

### Authentication

- Login page with hardcoded credentials
- Redux-managed authentication state
- Protected routes that redirect unauthenticated users
- Logout functionality

### Product Management

- Fetches 100 products from DummyJSON API
- Products sorted by price (descending) after initial fetch
- Memoized selectors for optimal performance
- Real-time filtering and sorting

### Filtering & Sorting

- **Search**: Filter by product name, description, brand, or category
- **Price Range**: Filter by minimum and maximum price
- **Availability**: Filter by in-stock or out-of-stock status
- **Sorting**: Sort by price (ascending/descending) or name (A-Z)

### Pagination

- Client-side pagination
- 12 products per page
- Smart page number display with ellipsis
- Automatic page reset when filters change

### Performance Optimizations

- Memoized Redux selectors prevent unnecessary recalculations
- Products sorted once after fetch (not in components)
- Efficient selector composition for filtering, sorting, and pagination

## Code Quality

- **TypeScript Strict Mode**: No `any` types, fully typed
- **Redux Best Practices**: Proper slice structure, typed hooks
- **Component Architecture**: Functional components with hooks only
- **Code Comments**: Comprehensive comments explaining key decisions
- **Responsive Design**: Mobile-first approach with SCSS mixins

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created as a technical assignment.
