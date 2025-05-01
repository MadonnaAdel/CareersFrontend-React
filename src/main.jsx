
import ReactDOM from 'react-dom/client'
import store from "./store";
import { Provider } from 'react-redux';
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import { ToastContainer } from "react-toastify";
console.warn = (warning) => {
  if (warning.includes("Support for defaultProps will be removed")) {
    return;
  }
  console.error(warning);
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="87940203805-mcmv9q7a0vo5a4qgh2ql0f5naf39hdbv.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </GoogleOAuthProvider>
);
