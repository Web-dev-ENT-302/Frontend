# Student Transportation System

A modern web application (Frontend)  for managing student transportation services built with React, Vite, and Tailwind CSS.

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
- **Linting**: ESLint

## 📁 Project Structure

```
student-transportion-system/
├── public/                     # Static assets
├── src/
│   ├── assets/                # Images, icons, and other assets
│   │   ├── icons/
│   │   └── images/
│   ├── components/            # Reusable UI components
│   │   └── toast-notification/
│   │       └── ToastNotifcation.jsx
│   ├── contexts/              # React Context providers
│   │   └── AuthContext.jsx
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   │   ├── auths/            # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── dashboard/        # Dashboard pages
│   ├── routes/               # Route protection and configuration
│   │   └── ProtectedRoute.jsx
│   ├── services/             # API calls and external services
│   ├── App.jsx               # Main application component
│   ├── App.css               # Global styles
│   ├── index.css             # Base CSS with Tailwind imports
│   └── main.jsx              # Application entry point
```

## 🎨 Adding Your Own Design

### 1. Tailwind CSS Customization

The project uses Tailwind CSS for styling. You can customize the design by:

**Editing `tailwind.config.js`:**
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        primary: '#your-color',
        secondary: '#your-color',
      },
      fontFamily: {
        // Add custom fonts
        'custom': ['Your Font', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
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
<div className="bg-blue-500 hover:bg-blue-600 p-4 rounded-lg">
  Your content
</div>
```
Learn More about Tailwind here: [Check TailwindCSS site](https://tailwindcss.com/docs/installation/using-vite)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality



## 🤝 Contributing & Collaboration

### For Team Members

1. **Create a new branch for your feature**
   ```bash
   git checkout -b feature/your-feature-name
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
   - Click "New Pull Request"
   - Select your branch and add a description
   - Request review from team members

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
