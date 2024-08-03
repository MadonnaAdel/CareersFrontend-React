
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import store from "./store";
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import "fortawesome/fontawesome-free/css/all.min.css"; 
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import { ToastContainer } from "react-toastify";
// import "@fortawesome/fontawesome-free/css/all.min.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="87940203805-mcmv9q7a0vo5a4qgh2ql0f5naf39hdbv.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
