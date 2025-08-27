# Student Transportation System

A modern web application (Frontend) for managing student transportation services built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Web-dev-ENT-302/Frontend
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 7.7.1
- **Icons**: Lucide React & React Icons
- **Maps**: React Leaflet 5.0.0 & Leaflet 1.9.4
- **Authentication**: JWT Decode & JS Cookie
- **Linting**: ESLint

## ✨ Features

### 🎯 Core Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Role-based Access**: Separate dashboards for students and drivers
- **Ride Management**: Request, accept, reject, and view
- **Distance & Duration Calculation**: Haversine formula for accurate estimates
- **Responsive Design**: Mobile-first, fully responsive UI

### 👨‍🎓 Student Features

- **Dashboard Overview**: View recent rides and quick destination access
- **Ride Booking**: Request rides with pickup and destination selection
- **Ride History**: View all previous rides with details
- **Ride Cancellation**: Cancel active ride requests
- **Profile Management**: Manage personal information and preferences

### 🚗 Driver Features

- **Driver Dashboard**: View incoming ride requests
- **Ride Request Management**: Accept or reject ride requests
- **Current Ride Tracking**: Monitor active rides and navigation
- **Earnings Dashboard**: Track daily, weekly earnings and statistics
- **Performance Metrics**: View ratings, total distance, and ride counts
- **Notification System**: Real-time updates and system notifications

### 🔧 Technical Features

- **Error Handling**: Comprehensive error states and fallbacks
- **Loading States**: Smooth loading animations and spinners
- **Toast Notifications**: User-friendly success/error messages
- **Modal Dialogs**: Confirmation dialogs and detailed views
- **API Integration**: RESTful API communication with proper error handling
- **Development Tools**: Hot reloading, ESLint, and development server

## 📁 Project Structure

```
student-transportion-system/
├── public/                              # Static assets
├── src/
│   ├── assets/                         # Images, icons, and other assets
│   │   ├── icons/                      # SVG icons
│   │   └── images/                     # Image assets
│   │       ├── profileImages/          # Profile pictures
│   │       │   └── defaultProfile.png
│   │       └── svg/                    # SVG graphics
│   │           ├── logo.svg
│   │           ├── map-image.svg
│   │           └── map-image2.svg
│   ├── components/                     # Reusable UI components
│   │   ├── button/                     # Button components
│   │   │   └── Button.jsx
│   │   ├── main-navbar/                # Main navigation
│   │   │   └── MainNavbar.jsx
│   │   ├── toast-notification/         # Toast notification system
│   │   │   └── ToastNotifcation.jsx
│   │   ├── LogoutConfirmationModal.jsx # Logout confirmation dialog
│   │   ├── MainLayout.jsx              # Main layout wrapper
│   │   └── Spinner.jsx                 # Loading spinner component
│   ├── contexts/                       # React Context providers
│   │   └── AuthContext.jsx            # Authentication context & state management
│   ├── hooks/                          # Custom React hooks
│   │   └── useScrollToTop.js          # Auto scroll to top hook
│   ├── pages/                          # Page components
│   │   ├── auths/                     # Authentication pages
│   │   │   ├── login/                 # Login page
│   │   │   │   └── Login.jsx
│   │   │   └── register/              # Registration page
│   │   │       └── Register.jsx
│   │   └── dashboard/                 # Dashboard pages
│   │       ├── components/            # Dashboard-specific components
│   │       │   ├── dashboard-navbar/  # Dashboard navigation
│   │       │   │   └── DashboardNavbar.jsx
│   │       │   ├── layout/            # Dashboard layouts
│   │       │   │   └── DashboardLayout.jsx
│   │       │   └── ui/                # Dashboard UI components
│   │       │       ├── QuickDestinationCard.jsx
│   │       │       ├── RecentRides.jsx
│   │       │       ├── RideConfirmationModal.jsx
│   │       │       ├── RideDetailsInfo.jsx
│   │       │       └── RideRequestCards.jsx
│   │       ├── driver/                # Driver-specific pages
│   │       │   ├── CurrentRide.jsx    # Active ride management
│   │       │   ├── DriverDashboard.jsx # Driver main dashboard
│   │       │   ├── DriverSidebar.jsx  # Driver navigation sidebar
│   │       │   └── Earnings.jsx       # Driver earnings & statistics
│   │       └── students/              # Student-specific pages
│   │           ├── ConfirmRide.jsx    # Ride confirmation page
│   │           └── StudentDashboard.jsx # Student main dashboard
│   ├── routes/                        # Route protection and configuration
│   │   └── ProtectedRoute.jsx        # Route authentication guard
│   ├── services/                      # API calls and external services
│   │   ├── getTime.js                # Time formatting utilities
│   │   └── location.js               # Location & coordinate services
│   ├── App.jsx                       # Main application component
│   ├── App.css                       # Global styles
│   ├── index.css                     # Base CSS with Tailwind imports
│   └── main.jsx                      # Application entry point
├── index.html                        # HTML template
├── package.json                      # Project dependencies & scripts
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.js                   # Vite build configuration
├── postcss.config.js                # PostCSS configuration
├── eslint.config.js                 # ESLint configuration
└── vercel.json                      # Vercel deployment configuration
```

## 🎨 Adding Your Own Design

### 1. Tailwind CSS Customization

The project uses Tailwind CSS for styling. You can customize the design by:

**Editing `tailwind.config.js`:**

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        primary: "#your-color",
        secondary: "#your-color"
      },
      fontFamily: {
        // Add custom fonts
        custom: ["Your Font", "sans-serif"]
      }
    }
  },
  plugins: []
};
```

### 2. Global Styles

**Edit `src/App.css` for global styles:**

```css
/* Add your global styles here */
.your-custom-class {
  /* Your styles */
}
```

### 3. Component Styling

Each component can be styled using Tailwind classes or custom CSS:

```jsx
<div className="bg-blue-500 hover:bg-blue-600 p-4 rounded-lg">Your content</div>
```

Learn More about Tailwind here: [Check TailwindCSS site](https://tailwindcss.com/docs/installation/using-vite)

## 🔧 Available Scripts

- `npm run dev` - Start development server with host access
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🚀 Development Workflow

### Setting up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` and accessible on your network.

### Building for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## 🤝 Contributing & Collaboration

### For Team Members

1. **Create a new branch for your feature**

   ```bash
   git checkout -b staging
   ```

2. **Make your changes**

   - Follow the existing code structure
   - Use Tailwind CSS for styling or Vanila CSS
   - Test your changes locally

3. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your branch**

   ```bash
   git push https://github.com/Web-dev-ENT-302/Frontend
   ```

5. **Create a Pull Request**
   - Go to the repository on GitHub
   - Switch to "Staging" branch
   - Click "Contribute"
   - Click "Open pull request"
   - Add a description
   - Click "Create pull request"

### Coding Standards

- Use **camelCase** for variables and functions
- Use **PascalCase** for component names
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing folder structure

### Git Workflow

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

## 📝 Common Commands

```bash
# Install new dependency
npm install package-name

# Install dev dependency
npm install -D package-name

# Remove dependency
npm uninstall package-name

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## 📞 Support

If you encounter any issues or have questions:

1. Check this README first
2. Look at existing issues in the repository
3. Contact the team lead
4. Create a new issue if needed

## 📄 License

This project is private and confidential. All rights reserved.

---

**Happy Coding! 🎉**
