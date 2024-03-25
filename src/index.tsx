import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { initializeAPI } from "./api";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthContextProvider } from "./features/auth/AuthContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

const firebaseApp = initializeAPI();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider firebaseApp={firebaseApp}>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
