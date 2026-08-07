# PuraTech Store - PWA 📱

Progressive Web App (PWA) for customer-facing e-commerce experience for PuraTech Store.

## 🚀 Live Demo

**Production:** https://puratech-pwa.pages.dev

## 📱 Install on Your Phone

Install PuraTech Store as a native app on your mobile device:

### iPhone / iPad
1. Open **Safari** and visit https://puratech-pwa.pages.dev
2. Tap the **Share button** (📤)
3. Scroll and tap **"Add to Home Screen"**
4. Tap **"Add"**

### Android
1. Open **Chrome** and visit https://puratech-pwa.pages.dev
2. Tap **"Install"** when prompted
3. Or tap menu (⋮) → **"Add to Home screen"**

**For detailed instructions:** See [INSTALL_MOBILE.md](./INSTALL_MOBILE.md)

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** Lucide React
- **PWA:** Vite PWA Plugin with Workbox
- **Deployment:** Cloudflare Pages
- **CI/CD:** GitHub Actions

## 📦 Features

- ✅ **Progressive Web App** - Install on mobile devices
- 🛍️ **Product Catalog** - Browse all products
- 🔍 **Search & Filters** - Find products by category, brand, or search
- 📱 **Responsive Design** - Mobile-first approach
- 🛒 **Shopping Cart** - Add products and manage cart
- 💾 **Offline Support** - Service worker caching
- 🎨 **Modern UI** - Clean and intuitive interface
- 🌐 **API Integration** - Connects to Cloudflare Workers backend

## 🏃 Quick Start

### Prerequisites

- Node.js 22+
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8787/api" > .env

# Start dev server
npm run dev
```

Visit: http://localhost:3001

### Build for Production

```bash
npm run build
```

Output: `dist/` directory

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   └── Layout.jsx     # Main layout with navigation
├── pages/             # Page components
│   ├── Home.jsx       # Homepage with featured products
│   ├── Products.jsx   # Product catalog with filters
│   ├── ProductDetail.jsx  # Individual product page
│   ├── Cart.jsx       # Shopping cart
│   └── Categories.jsx # Categories browser
├── contexts/          # React Context providers
│   └── CartContext.jsx # Shopping cart state management
├── services/          # API services
│   └── api.js         # Backend API client
├── App.jsx            # Main app component with routing
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## 🌐 Environment Variables

Create a `.env` file:

```bash
# Local development
VITE_API_URL=http://localhost:8787/api

# Production (set in GitHub Secrets)
VITE_API_URL=https://puratech-store-api.puratechtest01.workers.dev/api
```

## 🚀 Deployment

### Manual Deployment

```bash
npm run build
npx wrangler pages deploy dist --project-name=puratech-pwa
```

### Automatic Deployment (CI/CD)

Push to `main` branch triggers automatic deployment via GitHub Actions.

**Required GitHub Secrets:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_API_URL`

See [CICD_SETUP.md](../CICD_SETUP.md) for detailed setup.

## 🎨 Key Pages

### Home
- Hero section
- Featured products (first 6)
- Category browser
- Feature highlights

### Products
- Full product catalog
- Search by name/description
- Filter by category and brand
- Product grid with stock status

### Product Detail
- Product information
- Price and stock availability
- Quantity selector
- Add to cart functionality

### Cart
- Cart items management
- Quantity adjustment
- Remove items
- Total calculation
- Empty state

### Categories
- All categories grid
- Links to filtered product views

## 📱 PWA Features

### Installation

Users can install the PWA on their devices:

**Desktop:**
1. Click the install icon in the address bar
2. Click "Install" in the prompt

**Mobile (iOS):**
1. Tap the Share button
2. Scroll down and tap "Add to Home Screen"

**Mobile (Android):**
1. Tap the menu icon (⋮)
2. Tap "Add to Home Screen"

### Offline Support

- Service worker caches static assets
- API responses cached for 24 hours
- Works offline after first visit

### Manifest

The app includes a web app manifest with:
- App name and description
- Theme colors
- App icons (192x192, 512x512)
- Display mode: standalone
- Start URL configuration

## 🛒 Shopping Cart

The shopping cart is managed with React Context and persisted to localStorage:

- **Add to Cart:** Products can be added with quantity
- **Update Quantity:** Increase/decrease from cart
- **Remove Items:** Delete individual items
- **Clear Cart:** Empty entire cart
- **Persistence:** Cart survives page refresh

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start dev server (port 3001)
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Style

- ESLint for linting
- Prettier for formatting (recommended)
- Tailwind CSS for styling

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Push to GitHub
4. Create a Pull Request

## 📝 API Integration

This PWA connects to the PuraTech API backend:

**Repository:** https://github.com/paf02/puratech-api
**Live API:** https://puratech-store-api.puratechtest01.workers.dev

### API Endpoints Used

- `GET /api/productos` - Get all products
- `GET /api/productos/:id` - Get product details
- `GET /api/categorias` - Get categories
- `GET /api/marcas` - Get brands

## 🐛 Troubleshooting

### Build Errors
- Ensure Node.js 22+ is installed
- Delete `node_modules` and reinstall: `npm ci`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### API Connection Issues
- Check `VITE_API_URL` environment variable
- Verify backend is running
- Check browser console for CORS errors

### PWA Not Installing
- Must be served over HTTPS (or localhost)
- Check manifest.json is accessible
- Verify service worker is registered

## 📊 Performance

The PWA is optimized for performance:

- ⚡ Vite for fast builds
- 📦 Code splitting by route
- 🖼️ Lazy loading of components
- 💾 Service worker caching
- 🎯 Lighthouse score: 90+

## 📄 License

Private - PuraTech Store

## 👥 Authors

- Development Team: PuraTech

---

**For CI/CD setup and deployment guide, see:** [CICD_SETUP.md](../CICD_SETUP.md)
