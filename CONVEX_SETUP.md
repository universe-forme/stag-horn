# 🚀 Convex Database Setup Guide

## What is Convex?

Convex is a modern backend-as-a-service that provides:
- **Real-time database** with automatic reactivity
- **Serverless functions** for backend logic
- **Built-in authentication** and user management
- **Real-time subscriptions** for live updates
- **TypeScript support** with automatic type generation
- **File storage** for images and documents

## ✅ What's Already Set Up

Your project now includes:

### 1. **Database Schema** (`convex/schema.ts`)
- **Users table**: Customer and admin user management
- **Categories table**: Product categories (Knives, Swords, Axes, etc.)
- **Products table**: Complete product catalog with images, pricing, stock
- **Orders table**: Order management and tracking
- **Reviews table**: Customer reviews and ratings
- **Cart table**: Shopping cart functionality
- **Wishlist table**: Customer wishlists
- **Contact Submissions table**: Order form submissions

### 2. **Convex Functions** 
- **User Management**: Create, update, query users
- **Product Management**: CRUD operations for products
- **Category Management**: Category operations
- **Contact Form**: Handle order form submissions

### 3. **Frontend Integration**
- **Convex Provider**: Wraps your entire app
- **Custom Hooks**: Easy-to-use hooks for database operations
- **Updated Contact Form**: Now saves to Convex database

## 🔧 How to Use

### Starting the Development Server

```bash
# Start Convex development server
npx convex dev

# In another terminal, start Next.js
npm run dev
```

### Using Convex Functions in Components

```jsx
import { useActiveProducts, useSubmitContactForm } from '../lib/hooks';

function MyComponent() {
  // Get all active products
  const products = useActiveProducts();
  
  // Submit contact form
  const submitForm = useSubmitContactForm();
  
  const handleSubmit = async (formData) => {
    await submitForm(formData);
  };
  
  return (
    <div>
      {products?.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Available Hooks

#### **Product Hooks**
- `useActiveProducts()` - Get all active products
- `useFeaturedProducts()` - Get featured products
- `useProductById(id)` - Get specific product
- `useProductsByCategory(categoryId)` - Get products by category
- `useSearchProducts(searchTerm)` - Search products
- `useTopRatedProducts(limit)` - Get top-rated products
- `useBestSellingProducts(limit)` - Get best-selling products

#### **Category Hooks**
- `useActiveCategories()` - Get all active categories
- `useAllCategories()` - Get all categories
- `useCategoryById(id)` - Get specific category
- `useCategoryBySlug(slug)` - Get category by slug
- `useCategoriesWithProductCounts()` - Categories with product counts

#### **User Hooks**
- `useUserByClerkId(clerkId)` - Get user by Clerk ID
- `useCreateUser()` - Create new user
- `useUpdateUser()` - Update user

#### **Contact Form Hooks**
- `useSubmitContactForm()` - Submit contact form
- `useAllContactSubmissions()` - Get all submissions (admin)
- `useContactSubmissionsByStatus(status)` - Get by status

## 📊 Database Structure

### Users Table
```typescript
{
  clerkId: string,           // Clerk authentication ID
  email: string,             // User email
  firstName: string,         // First name
  lastName: string,          // Last name
  phone?: string,            // Phone number
  companyName?: string,      // Company name
  companyEmail?: string,     // Company email
  country?: string,          // Country
  city?: string,             // City
  location?: string,         // Location
  shipmentAddress?: string,  // Shipping address
  emergencyContact?: string, // Emergency contact
  isAdmin?: boolean,         // Admin privileges
  createdAt: number,         // Creation timestamp
  updatedAt: number          // Last update timestamp
}
```

### Products Table
```typescript
{
  name: string,              // Product name
  description: string,       // Full description
  shortDescription?: string, // Short description
  price: number,             // Price
  comparePrice?: number,     // Compare at price
  categoryId: Id,            // Category reference
  images: string[],          // Image URLs
  mainImage: string,         // Main image URL
  isActive: boolean,         // Product active status
  isFeatured: boolean,       // Featured product
  isTopRated: boolean,       // Top rated flag
  isBestSelling: boolean,    // Best selling flag
  stockQuantity: number,     // Available stock
  sku: string,               // Stock keeping unit
  weight?: number,           // Product weight
  dimensions?: {              // Product dimensions
    length: number,
    width: number,
    height: number
  },
  tags: string[],            // Product tags
  rating?: number,           // Average rating
  reviewCount?: number,      // Number of reviews
  estimatedDelivery?: string, // Delivery estimate
  createdAt: number,         // Creation timestamp
  updatedAt: number          // Last update timestamp
}
```

## 🚀 Next Steps

### 1. **Add Authentication with Clerk**
```bash
npm install @clerk/nextjs
```

### 2. **Create Admin Dashboard**
- Use the admin hooks to manage products, categories, and orders
- Create admin-only routes and components

### 3. **Add Real-time Features**
- Live inventory updates
- Real-time order tracking
- Live chat support

### 4. **Implement Shopping Cart**
- Use the cart table and functions
- Add to cart functionality
- Cart persistence

### 5. **Add Product Reviews**
- Implement review system
- Rating calculations
- Review moderation

## 🔍 Monitoring & Debugging

### Convex Dashboard
- Visit: https://dashboard.convex.dev
- Monitor your database in real-time
- View function logs and performance

### Development Tools
```bash
# View database in development
npx convex dev

# Generate types
npx convex codegen

# Deploy to production
npx convex deploy
```

## 📝 Environment Variables

Your `.env.local` file should contain:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

## 🎯 Example Usage Scenarios

### 1. **Display Products on Homepage**
```jsx
function HomePage() {
  const featuredProducts = useFeaturedProducts();
  const topRatedProducts = useTopRatedProducts(4);
  
  return (
    <div>
      <h2>Featured Products</h2>
      {featuredProducts?.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
      
      <h2>Top Rated</h2>
      {topRatedProducts?.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
```

### 2. **Category Page with Products**
```jsx
function CategoryPage({ categorySlug }) {
  const category = useCategoryBySlug(categorySlug);
  const products = useProductsByCategory(category?._id);
  
  return (
    <div>
      <h1>{category?.name}</h1>
      <div className="products-grid">
        {products?.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### 3. **Admin Product Management**
```jsx
function AdminProducts() {
  const products = useActiveProducts();
  const createProduct = useCreateProduct();
  
  const handleCreate = async (productData) => {
    await createProduct(productData);
  };
  
  return (
    <div>
      <CreateProductForm onSubmit={handleCreate} />
      <ProductsList products={products} />
    </div>
  );
}
```

## 🆘 Troubleshooting

### Common Issues

1. **Types not generated**: Run `npx convex codegen`
2. **Functions not working**: Ensure Convex dev server is running
3. **Database connection**: Check `.env.local` file
4. **Schema errors**: Validate schema with `npx convex dev`

### Getting Help

- [Convex Documentation](https://docs.convex.dev/)
- [Convex Community](https://convex.dev/community)
- [GitHub Issues](https://github.com/get-convex/convex)

---

## 🎉 You're All Set!

Your Stag Horn Cutlery website now has a powerful, real-time database backend with:
- ✅ Complete database schema
- ✅ CRUD operations for all entities
- ✅ Real-time data synchronization
- ✅ Type-safe database operations
- ✅ Scalable serverless architecture

Start building amazing features for your customers! 🚀
