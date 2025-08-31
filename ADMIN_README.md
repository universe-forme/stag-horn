# Wazir Cutlery Admin Panel

A comprehensive admin dashboard built with Next.js and Tailwind CSS for managing your cutlery business.

## Features

### 🏠 Dashboard
- **Overview Statistics**: Revenue, products sold, active orders, and customer count
- **Revenue Chart**: Monthly revenue trends with interactive bar chart
- **Recent Sales**: Latest customer purchases with customer details

### 📦 Products Management
- **Product Catalog**: View all products with images, categories, prices, and stock levels
- **Search & Filter**: Find products quickly with search functionality
- **Product Actions**: Edit and delete products as needed
- **Stock Management**: Monitor inventory levels and status

### 🛒 Orders Management
- **Order Tracking**: View all customer orders with status tracking
- **Order Details**: Customer information, products, totals, and payment methods
- **Status Updates**: Track orders from pending to delivered
- **Order Search**: Find orders by ID, customer, or email

### 👥 Customer Management
- **Customer Database**: Complete customer information and contact details
- **Order History**: View customer purchase history and total spending
- **Customer Status**: Track active and inactive customers
- **Contact Information**: Email and phone number management

### 📊 Analytics
- **Revenue Analytics**: Detailed revenue breakdown and trends
- **Product Performance**: Top-performing products and growth metrics
- **Customer Demographics**: Age distribution and sales channel analysis
- **Sales Channels**: Performance across website, Amazon, Etsy, and direct sales

### 📋 Reports
- **Pre-built Reports**: Sales, customer, inventory, and financial reports
- **Custom Reports**: Build reports with specific metrics and date ranges
- **Export Options**: Download reports in PDF, Excel, or CSV formats
- **Report History**: Track generated reports and their status

### ⚙️ Settings
- **Store Information**: Update business details and contact information
- **Email Settings**: Configure notification preferences
- **Security Settings**: Manage access controls and authentication
- **Notification Preferences**: Customize admin notifications

## Getting Started

### Access the Admin Panel
1. Navigate to `/admin` in your browser
2. The admin panel is accessible from the main navigation menu

### Navigation
- **Sidebar**: Left-side navigation with all admin sections
- **Header**: Search functionality and user profile
- **Breadcrumbs**: Easy navigation between sections

### Key Components
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface using Tailwind CSS
- **Interactive Elements**: Hover effects, transitions, and smooth animations
- **Color Scheme**: Matches your brand colors (#D6AF66)

## Technical Details

### Built With
- **Next.js 15**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Recharts**: Chart library for data visualization
- **Custom UI Components**: Reusable component library

### File Structure
```
app/admin/
├── layout.js          # Admin layout wrapper
├── page.js            # Dashboard home
├── products/page.js   # Products management
├── orders/page.js     # Orders management
├── customers/page.js  # Customer management
├── analytics/page.js  # Analytics and insights
├── reports/page.js    # Report generation
└── settings/page.js   # Admin settings

components/admin/
├── AdminSidebar.jsx   # Navigation sidebar
├── AdminHeader.jsx    # Top header bar
├── DashboardStats.jsx # Statistics cards
├── Overview.jsx       # Revenue chart
└── RecentSales.jsx    # Recent sales list

components/ui/          # Reusable UI components
```

### Customization
- **Brand Colors**: Easily update colors in the UI components
- **Data Sources**: Connect to your actual database or API
- **Additional Features**: Extend with more admin functionality
- **Theming**: Customize the visual appearance

## Security Considerations

- **Admin Access**: Currently open access - implement authentication
- **User Roles**: Add role-based access control
- **API Protection**: Secure admin endpoints
- **Session Management**: Implement proper session handling

## Future Enhancements

- **Authentication System**: Login/logout functionality
- **Real-time Updates**: Live data updates and notifications
- **Advanced Analytics**: More detailed business insights
- **Mobile App**: Native mobile admin application
- **API Integration**: Connect with external services
- **Multi-language Support**: Internationalization
- **Dark Mode**: Theme switching capability

## Support

For questions or issues with the admin panel, refer to the main project documentation or contact the development team.

---

**Note**: This admin panel is designed to integrate seamlessly with your existing Wazir Cutlery website while providing powerful business management tools.
