# 👩‍💻 Careers – User Frontend (React)

This is a **User Flow** built using React and Vite for the Careers platform. It allows users to browse jobs, apply, and manage their profiles.

📚 **Features**
- 👤 User registration & login
- 🔍 Job browsing & filtering
- 💾 Save jobs to favorites
- 📨 Apply to jobs
- 🌍 Multilingual support (i18next)
- 📬 Toast notifications
- 📊 Statistics with MUI X Charts
- ✅ Form validation with Formik & Yup
- 🧩 Modular project structure
- 📱 Responsive design

🧰 **Tech Stack & Libraries**

| Package                        | Description                                 |
| ------------------------------ | ------------------------------------------- |
| react + vite                   | Core frontend framework & bundler           |
| react-router-dom               | Routing                                     |
| @reduxjs/toolkit + react-redux | State management                            |
| axios                          | API handling                                |
| formik + yup                   | Forms & validation                          |
| i18next                        | Translations                                |
| @mui/material + icons          | UI components                               |
| fontawesome + react-icons      | Icon packs                                  |
| react-toastify                 | Toast notifications                         |
| react-spinners                 | Loaders                                     |
| fuse.js                        | Fuzzy job search                            |
| jwt-decode                     | JWT decoding                                |

🚀 **Getting Started**

1. Clone the repo

```bash
git clone https://github.com/YourUsername/careers-user-frontend.git
cd careers-user-frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The app will run on: [http://localhost:5173](http://localhost:5173)

🧪 **Scripts**

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Run app in development mode     |
| `npm run build` | Build the app for production    |
| `npm run preview` | Preview production build locally |
| `npm run lint`  | Run ESLint checks               |

🗂️ **Project Structure**
```
src/
├── assets/        # Static assets
├── components/    # Reusable UI components
├── features/      # Redux slices
├── hooks/         # Custom hooks
├── i18n/          # Translation setup
├── pages/         # Route pages
├── services/      # API calls
└── App.jsx        # App entry point
```

🌐 **Proxy**

The app is configured to use the backend on:

```
http://localhost:3001
```

Make sure the backend server is running.

🧭 **Deployment**

You can deploy the frontend on platforms like **Vercel**, **Netlify**, etc.

If using **Vercel**:
- Connect the repo
- Set environment variables (if needed)
- Use `npm run build` as the build command
- Set `dist` as the output directory (default for Vite)

---

🎯 **Backend Repo**  
👉 [Careers API GitHub Repo](https://github.com/MadonnaAdel/CareersApi)